<template>
  <div class="min-h-screen bg-slate-900 text-white font-sans selection:bg-indigo-500 selection:text-white pb-20">
     <div class="container mx-auto px-6 py-12 max-w-4xl">
        <div class="text-center mb-12 animate-float">
           <h1 class="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Welcome to MSc Tracker</h1>
           <p class="text-xl text-indigo-200">Your personal command center for grad school applications.</p>
        </div>

        <div class="glass p-8 rounded-3xl shadow-2xl border border-white/10 mb-12">
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
               <span class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm">1</span>
               Connect Your Database
            </h2>
            
            <p class="text-gray-300 mb-6">
               This app runs entirely in your browser but acts as a frontend for your own Google Sheet. 
               To get started, you need to create a sheet and a backend script.
            </p>

            <div class="space-y-4 mb-8">
               <div class="bg-white/5 rounded-xl p-4 border border-white/5">
                  <h3 class="font-bold text-indigo-300 mb-2">Step A: Create the Sheet</h3>
                  <ol class="list-decimal list-inside text-sm text-gray-300 space-y-2 ml-2">
                     <li>Go to <a href="https://sheets.new" target="_blank" class="text-indigo-400 underline hover:text-white">sheets.new</a> to create a new Google Sheet.</li>
                     <li>Create 3 tabs named exactly: <code class="bg-black/30 px-1 py-0.5 rounded text-yellow-300">applications</code>, <code class="bg-black/30 px-1 py-0.5 rounded text-yellow-300">checklist</code>, <code class="bg-black/30 px-1 py-0.5 rounded text-yellow-300">recommenders</code>.</li>
                     <li>
                        Copy these headers into row 1 of each sheet:
                        <ul class="list-disc list-inside mt-2 ml-4 space-y-1 text-xs text-gray-400 font-mono">
                           <li><strong>applications</strong>: id, university, program, country, status, deadline_app, deadline_scholarship, portal_apply_url, portal_status_url, progress, priority, notes, updated_at</li>
                           <li><strong>checklist</strong>: id, application_id, item, state, link, updated_at</li>
                           <li><strong>recommenders</strong>: id, application_id, name, email, state, last_nudge_date, updated_at</li>
                        </ul>
                     </li>
                  </ol>
               </div>

               <div class="bg-white/5 rounded-xl p-4 border border-white/5">
                  <h3 class="font-bold text-indigo-300 mb-2">Step B: Deploy the Script</h3>
                  <ol class="list-decimal list-inside text-sm text-gray-300 space-y-2 ml-2">
                     <li>In your Google Sheet, click <strong>Extensions > Apps Script</strong>.</li>
                     <li>Delete any code in the editor and paste the code below.</li>
                     <li>
                        <strong>CRITICAL:</strong> Replace <code class="text-rose-400">const SHEET_ID = '...';</code> at the top of the script with your actual Sheet ID (found in the URL: docs.google.com/spreadsheets/d/<strong>YOUR_ID</strong>/edit).
                     </li>
                     <li>Click <strong>Deploy > New deployment</strong>.</li>
                     <li>Select type: <strong>Web app</strong>.</li>
                     <li>Set <strong>Who has access</strong> to <strong>Anyone</strong> (this allows the app to talk to your sheet).</li>
                     <li>Click <strong>Deploy</strong> and copy the <strong>Web App URL</strong> (ends in <code>/exec</code>).</li>
                  </ol>
               </div>
               
               <div class="bg-black/40 rounded-xl p-4 border border-white/10 relative group">
                  <button @click="copyCode" class="absolute top-4 right-4 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded transition-colors shadow-lg">
                     {{ copied ? 'Copied!' : 'Copy Code' }}
                  </button>
                  <pre class="text-xs text-gray-300 font-mono overflow-x-auto h-48 scrollbar-thin scrollbar-thumb-indigo-500/50 scrollbar-track-transparent p-2">{{ backendCode }}</pre>
               </div>
            </div>

            <div class="border-t border-white/10 pt-8">
               <h2 class="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span class="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-sm">2</span>
                  Enter Web App URL
               </h2>
               <div class="flex flex-col md:flex-row gap-4">
                  <input 
                     v-model="apiUrl" 
                     placeholder="https://script.google.com/macros/s/..../exec" 
                     class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <button 
                     @click="saveAndStart" 
                     :disabled="!isValidUrl"
                     class="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                     Launch App 🚀
                  </button>
               </div>
               <p v-if="error" class="text-rose-400 text-sm mt-2">{{ error }}</p>
            </div>
        </div>
     </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const apiUrl = ref(config.public.apiBase || '');
const copied = ref(false);
const error = ref('');
const router = useRouter();

// Validate URL format simply
const isValidUrl = computed(() => {
   return apiUrl.value.startsWith('https://script.google.com/') && apiUrl.value.endsWith('/exec');
});

const saveAndStart = () => {
   if (!isValidUrl.value) {
      error.value = 'Please enter a valid Google Apps Script Web App URL.';
      return;
   }
   
   localStorage.setItem('msc_tracker_api_url', apiUrl.value);
   router.push('/');
};

const backendCode = `// PASTE THIS INTO YOUR APPS SCRIPT EDITOR
const SHEET_ID = 'REPLACE_WITH_YOUR_SHEET_ID'; // <--- IMPORTANT

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    const action = e.parameter.action || (e.postData && JSON.parse(e.postData.contents).action);
    const payload = e.postData ? JSON.parse(e.postData.contents) : e.parameter;
    
    let result = {};
    
    switch(action) {
      case 'listApplications': result = getSheetData('applications'); break;
      case 'getApplication': result = getRowById('applications', payload.id); break;
      case 'upsertApplication': result = upsertRow('applications', payload.data || payload); break;
      case 'deleteApplication': result = deleteRow('applications', payload.id); break;
      
      case 'listChecklist': result = getSheetData('checklist'); break;
      case 'upsertChecklistItem': result = upsertRow('checklist', payload.data || payload); break;
      case 'deleteChecklistItem': result = deleteRow('checklist', payload.id); break;
      
      case 'listRecommenders': result = getSheetData('recommenders'); break;
      case 'upsertRecommender': result = upsertRow('recommenders', payload.data || payload); break;
      case 'deleteRecommender': result = deleteRow('recommenders', payload.id); break;
      
      case 'bulkUpsert': result = bulkImport(payload); break;
      
      default: result = { error: 'Invalid action' };
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Helpers
function getSheetData(sheetName) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  return rows.map(row => {
    let obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

function getRowById(sheetName, id) {
  const list = getSheetData(sheetName);
  return list.find(r => r.id === id);
}

function upsertRow(sheetName, data) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(sheetName);
  const allData = sheet.getDataRange().getValues();
  const headers = allData[0];
  
  // Align data to headers
  const rowData = headers.map(h => data[h] || '');
  
  // Find if exists
  const idColIdx = headers.indexOf('id');
  const existingRowIdx = allData.slice(1).findIndex(r => r[idColIdx] === data.id);
  
  if (existingRowIdx >= 0) {
    // Update (row index + 2 because 1-based + header row)
    sheet.getRange(existingRowIdx + 2, 1, 1, rowData.length).setValues([rowData]);
  } else {
    // Insert
    sheet.appendRow(rowData);
  }
  return data;
}

function deleteRow(sheetName, id) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const idColIdx = headers.indexOf('id');
  
  // Loop backwards to delete safely
  for (let i = data.length - 1; i >= 1; i--) {
     if (data[i][idColIdx] === id) {
       sheet.deleteRow(i + 1);
       return { success: true };
     }
  }
  return { error: 'Not found' };
}

function bulkImport(payload) {
   if (payload.applications) payload.applications.forEach(a => upsertRow('applications', a));
   if (payload.checklist) payload.checklist.forEach(c => upsertRow('checklist', c));
   if (payload.recommenders) payload.recommenders.forEach(r => upsertRow('recommenders', r));
   return { success: true };
}
`;

const copyCode = () => {
   navigator.clipboard.writeText(backendCode);
   copied.value = true;
   setTimeout(() => copied.value = false, 2000);
};
</script>
