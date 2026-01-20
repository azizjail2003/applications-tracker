// Google Apps Script Code
// Deploy this as a Web App with access set to "Anyone"

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your Sheet ID

function doGet(e) {
    return handleRequest(e);
}

function doPost(e) {
    return handleRequest(e);
}

function handleRequest(e) {
    const lock = LockService.getScriptLock();
    lock.tryLock(30000);

    try {
        const params = e.parameter;
        const action = params.action;
        let data = null;

        // Parse POST data if available
        let postData = null;
        if (e.postData && e.postData.contents) {
            try {
                postData = JSON.parse(e.postData.contents);
            } catch (err) {
                // ignore
            }
        }

        // For POST requests, action might be in the body
        const reqAction = action || (postData ? postData.action : null);
        const reqData = postData ? postData.data : null;
        const reqId = postData ? postData.id : null;

        const ss = SpreadsheetApp.openById(SHEET_ID);

        switch (reqAction) {
            case 'listApplications':
                data = getSheetData(ss, 'applications');
                break;
            case 'getApplication':
                data = getRowById(ss, 'applications', params.id);
                break;
            case 'upsertApplication':
                data = upsertRow(ss, 'applications', reqData);
                break;
            case 'deleteApplication':
                data = deleteRow(ss, 'applications', reqId);
                break;

            case 'listChecklist':
                const allChecklistItems = getSheetData(ss, 'checklist');
                if (params && params.application_id) {
                    data = allChecklistItems.filter(item => item.application_id === params.application_id);
                } else {
                    data = allChecklistItems;
                }
                break;
            case 'upsertChecklistItem':
                data = upsertRow(ss, 'checklist', reqData);
                break;
            case 'deleteChecklistItem':
                data = deleteRow(ss, 'checklist', reqId);
                break;

            case 'listRecommenders':
                data = getSheetData(ss, 'recommenders').filter(item => item.application_id === params.application_id);
                break;
            case 'upsertRecommender':
                data = upsertRow(ss, 'recommenders', reqData);
                break;
            case 'deleteRecommender':
                data = deleteRow(ss, 'recommenders', reqId);
                break;

            case 'bulkUpsert':
                // Simplified bulk import
                if (reqData && reqData.applications) bulkImport(ss, 'applications', reqData.applications);
                if (reqData && reqData.checklist) bulkImport(ss, 'checklist', reqData.checklist);
                if (reqData && reqData.recommenders) bulkImport(ss, 'recommenders', reqData.recommenders);
                data = { success: true };
                break;

            case 'enableReminders':
                data = setupReminders(true);
                break;

            case 'disableReminders':
                data = setupReminders(false);
                break;

            case 'checkReminderStatus':
                data = { enabled: hasTrigger() };
                break;

            case 'testEmail':
                data = sendTestEmail();
                break;

            default:
                throw new Error('Unknown action: ' + reqAction);
        }

        return ContentService.createTextOutput(JSON.stringify({ ok: true, data: data }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (err) {
        return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    } finally {
        lock.releaseLock();
    }
}


function setupReminders(enable) {
    if (SHEET_ID === 'YOUR_GOOGLE_SHEET_ID_HERE') {
        throw new Error('Please set your SHEET_ID in the script first.');
    }
    const triggers = ScriptApp.getProjectTriggers();

    triggers.forEach(t => {
        if (t.getHandlerFunction() === 'checkDeadlines') {
            ScriptApp.deleteTrigger(t);
        }
    });

    if (enable) {
        ScriptApp.newTrigger('checkDeadlines')
            .timeBased()
            .everyDays(1)
            .atHour(8)
            .create();
        return { success: true, enabled: true, message: 'Daily reminder trigger created for 8:00 AM.' };
    }
    return { success: true, enabled: false, message: 'All reminder triggers removed.' };
}

function hasTrigger() {
    try {
        const triggers = ScriptApp.getProjectTriggers();
        return triggers.some(t => t.getHandlerFunction() === 'checkDeadlines');
    } catch (e) {
        return false;
    }
}

function sendTestEmail() {
    const recipient = Session.getActiveUser().getEmail();
    const subject = `🧪 Test Email - MSc Tracker Ready!`;
    const body = `Success! Your reminder system is connected.\n\nYou will receive real alerts when deadlines are exactly 7, 3, or 1 day away.\n\n--\nMSc Application Tracker`;

    MailApp.sendEmail(recipient, subject, body);
    return { success: true, message: 'Sent to ' + recipient };
}

function checkDeadlines() {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const applications = getSheetData(ss, 'applications');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const alerts = [];

    applications.forEach(app => {
        if (!app.deadline_app) return;

        const deadline = new Date(app.deadline_app);
        deadline.setHours(0, 0, 0, 0);

        const diffTime = deadline.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)); // Use ceil to be safer with timezones

        if (diffDays === 7 || diffDays === 3 || diffDays === 1) {
            alerts.push(`📅 ${diffDays} days left: ${app.university} - ${app.program} (Due: ${new Date(app.deadline_app).toLocaleDateString()})`);
        }
    });

    if (alerts.length > 0) {
        const recipient = Session.getActiveUser().getEmail();
        const subject = `⚠️ ${alerts.length} Upcoming Deadlines - MSc Tracker`;
        const body = `You have upcoming deadlines:\n\n${alerts.join('\n')}\n\nGood luck!\n\n--\nMSc Application Tracker`;

        MailApp.sendEmail(recipient, subject, body);
    }
}


// Helpers

function getSheetData(ss, sheetName) {
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return [];
    const rows = sheet.getDataRange().getValues();
    if (rows.length < 2) return [];
    const headers = rows[0];
    const data = [];
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = row[j];
        }
        data.push(obj);
    }
    return data;
}

function getRowById(ss, sheetName, id) {
    const data = getSheetData(ss, sheetName);
    return data.find(r => r.id === id);
}

function upsertRow(ss, sheetName, data) {
    const sheet = ss.getSheetByName(sheetName);
    const rows = sheet.getDataRange().getValues();
    const headers = rows[0];

    // Ensure headers exist or create them (basic check)
    // We assume headers match the data keys provided or exist in sheet

    let rowIndex = -1;
    if (data.id) {
        for (let i = 1; i < rows.length; i++) {
            if (rows[i][headers.indexOf('id')] === data.id) {
                rowIndex = i + 1; // 1-based index
                break;
            }
        }
    }

    const rowData = headers.map(h => {
        if (h === 'updated_at') return new Date().toISOString();
        return data[h] !== undefined ? data[h] : (rowIndex > 0 ? rows[rowIndex - 1][headers.indexOf(h)] : '');
    });

    if (rowIndex > 0) {
        sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
    } else {
        sheet.appendRow(rowData);
    }

    return { ...data, updated_at: new Date().toISOString() };
}

function deleteRow(ss, sheetName, id) {
    const sheet = ss.getSheetByName(sheetName);
    const rows = sheet.getDataRange().getValues();
    const idIndex = rows[0].indexOf('id');

    for (let i = 1; i < rows.length; i++) {
        if (rows[i][idIndex] === id) {
            sheet.deleteRow(i + 1);
            return { id: id, deleted: true };
        }
    }
    return { id: id, deleted: false };
}

function bulkImport(ss, sheetName, items) {
    // Warning: This is slow if loop. Better to batch.
    // For now, simple loop is safer for logic correctness
    items.forEach(item => upsertRow(ss, sheetName, item));
}
