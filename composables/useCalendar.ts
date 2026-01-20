export interface Application {
    id: string;
    university: string;
    program: string;
    status: string;
    priority: number;
    app_deadline?: string;
    scholarship_deadline?: string;
    country: string;
    portal_apply_url?: string;
    portal_status_url?: string;
    notes?: string;
    progress: number;
    checklist?: any[]; // Simplified
}

export const useCalendar = () => {

    // Format date for ICS (YYYYMMDD)
    const formatIcsDate = (dateString: string): string => {
        if (!dateString) return '';
        return dateString.replace(/-/g, '');
    };

    const generateIcs = (applications: Application[]) => {
        const events: string[] = [];
        const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

        applications.forEach(app => {
            if (!app.app_deadline) return;

            // Application Deadline Event
            const deadline = formatIcsDate(app.app_deadline);
            events.push([
                'BEGIN:VEVENT',
                `UID:${app.id}-deadline@msc-tracker`,
                `DTSTAMP:${now}`,
                `DTSTART;VALUE=DATE:${deadline}`,
                `SUMMARY:Deadline: ${app.university} - ${app.program}`,
                `DESCRIPTION:Application deadline for ${app.program} at ${app.university}. Status: ${app.status}`,
                'END:VEVENT'
            ].join('\r\n'));

            // Scholarship Deadline Event
            if (app.scholarship_deadline) {
                const scholarshipDate = formatIcsDate(app.scholarship_deadline);
                events.push([
                    'BEGIN:VEVENT',
                    `UID:${app.id}-scholarship@msc-tracker`,
                    `DTSTAMP:${now}`,
                    `DTSTART;VALUE=DATE:${scholarshipDate}`,
                    `SUMMARY:Scholarship Deadline: ${app.university}`,
                    `DESCRIPTION:Scholarship deadline for ${app.program} at ${app.university}.`,
                    'END:VEVENT'
                ].join('\r\n'));
            }
        });

        const calendarContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//MSc Application Tracker//EN',
            'CALSCALE:GREGORIAN',
            ...events,
            'END:VCALENDAR'
        ].join('\r\n');

        return calendarContent;
    };

    const downloadCalendar = (applications: Application[]) => {
        const content = generateIcs(applications);
        const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'msc_deadlines.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return {
        downloadCalendar,
        generateIcs
    };
};
