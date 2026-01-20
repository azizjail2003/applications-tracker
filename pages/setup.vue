<template>
  <div class="min-h-screen bg-brand-light dark:bg-brand-dark font-sans text-brand-dark dark:text-brand-light transition-colors duration-300">
    <div class="container mx-auto px-6 py-12 max-w-4xl">
      <!-- Header -->
      <div class="text-center mb-16 space-y-4">
        <div class="inline-block px-4 py-1.5 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-bold uppercase tracking-widest mb-2 border border-brand-teal/20">
          {{ t('setup.title') }}
        </div>
        <h1 class="text-5xl font-extrabold tracking-tight text-brand-dark dark:text-brand-light">
          Welcome to <span class="text-brand-teal uppercase">MSc</span> Tracker
        </h1>
        <p class="text-lg text-brand-dark/60 dark:text-brand-light/60 max-w-2xl mx-auto leading-relaxed">
          {{ t('setup.subtitle') }}
        </p>
      </div>

      <!-- Invite Landing Card -->
      <div v-if="showInvite" class="glass p-10 rounded-[2.5rem] shadow-2xl border border-brand-dark/10 dark:border-brand-light/10 mb-12 relative overflow-hidden text-center">
         <div class="absolute inset-0 bg-gradient-to-br from-brand-teal/10 to-transparent pointer-events-none"></div>
         
         <div class="relative z-10 flex flex-col items-center">
            <div class="w-20 h-20 rounded-full bg-brand-teal/20 flex items-center justify-center mb-6 text-4xl shadow-inner">
               👋
            </div>
            
            <h2 class="text-3xl md:text-4xl font-bold mb-4 text-brand-dark dark:text-brand-light">
               {{ inviteName ? t('setup.invite_title_name', { name: inviteName }) : t('setup.invite_title') }}
            </h2>
            <p class="text-lg text-brand-dark/60 dark:text-brand-light/60 max-w-xl mx-auto mb-10 leading-relaxed">
               {{ t('setup.invite_desc') }}
            </p>

            <!-- Features Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mb-12 text-left">
               <div class="p-4 rounded-2xl bg-brand-dark/5 dark:bg-brand-light/5 border border-brand-dark/5 dark:border-brand-light/5">
                  <div class="text-2xl mb-2">📅</div>
                  <h3 class="font-bold text-brand-dark dark:text-brand-light mb-1">{{ t('setup.feature_1_title') }}</h3>
                  <p class="text-xs text-brand-dark/60 dark:text-brand-light/60">{{ t('setup.feature_1_desc') }}</p>
               </div>
               <div class="p-4 rounded-2xl bg-brand-dark/5 dark:bg-brand-light/5 border border-brand-dark/5 dark:border-brand-light/5">
                  <div class="text-2xl mb-2">✅</div>
                  <h3 class="font-bold text-brand-dark dark:text-brand-light mb-1">{{ t('setup.feature_2_title') }}</h3>
                  <p class="text-xs text-brand-dark/60 dark:text-brand-light/60">{{ t('setup.feature_2_desc') }}</p>
               </div>
               <div class="p-4 rounded-2xl bg-brand-dark/5 dark:bg-brand-light/5 border border-brand-dark/5 dark:border-brand-light/5">
                  <div class="text-2xl mb-2">🚀</div>
                  <h3 class="font-bold text-brand-dark dark:text-brand-light mb-1">{{ t('setup.feature_3_title') }}</h3>
                  <p class="text-xs text-brand-dark/60 dark:text-brand-light/60">{{ t('setup.feature_3_desc') }}</p>
               </div>
            </div>

            <button 
               @click="acceptInvite" 
               class="px-10 py-4 bg-brand-teal text-white font-bold rounded-2xl shadow-xl shadow-brand-teal/20 hover:bg-brand-dark dark:hover:bg-brand-light dark:hover:text-brand-dark transition-all transform hover:-translate-y-1 active:translate-y-0 text-lg flex items-center gap-3"
            >
               <span>{{ t('setup.accept_invite') }}</span>
               <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>
         </div>
      </div>

      <!-- Main Config Glass Card (Hidden if Invite) -->
      <div v-else class="glass p-10 rounded-[2.5rem] shadow-2xl border border-brand-dark/10 dark:border-brand-light/10 mb-12 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-brand-teal/5 to-transparent pointer-events-none"></div>
        
        <div class="relative z-10">
          <h2 class="text-2xl font-bold mb-8 flex items-center gap-4">
            <span class="w-10 h-10 rounded-2xl bg-brand-dark dark:bg-brand-teal flex items-center justify-center text-brand-light text-xl shadow-lg ring-4 ring-brand-teal/10">1</span>
            {{ t('setup.connect_db') }}
          </h2>
          
          <div class="space-y-6 text-brand-dark/70 dark:text-brand-light/70 leading-relaxed mb-10">
            <p>{{ t('setup.desc') }}</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <!-- Step A -->
              <div class="group p-6 rounded-3xl bg-brand-dark/5 dark:bg-brand-light/5 border border-brand-dark/5 dark:border-brand-light/5 hover:border-brand-teal/30 transition-all duration-300">
                <div class="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center mb-4 text-brand-teal group-hover:scale-110 transition-transform font-bold">A</div>
                <h3 class="font-bold text-brand-dark dark:text-brand-light mb-3 tracking-tight">{{ t('setup.step_a') }}</h3>
                <ol class="text-xs space-y-2 opacity-80 list-decimal list-inside pl-1">
                  <li>Go to <a href="https://sheets.new" target="_blank" class="text-brand-teal font-bold underline">sheets.new</a></li>
                  <li>Create 3 tabs: 
                     <code class="bg-brand-teal/10 px-1 rounded text-brand-teal font-mono">applications</code>, 
                     <code class="bg-brand-teal/10 px-1 rounded text-brand-teal font-mono">checklist</code>, 
                     <code class="bg-brand-teal/10 px-1 rounded text-brand-teal font-mono">recommenders</code>
                  </li>
                  <li>
                     <strong>Copy these exact headers into Row 1 of each sheet:</strong>
                     <ul class="mt-2 space-y-4 pl-2 border-l-2 border-brand-teal/20">
                        <li>
                           <span class="font-bold text-brand-teal">applications</span>:
                           <div class="relative group">
                              <pre class="font-mono text-[10px] select-all bg-brand-dark/5 dark:bg-brand-light/10 p-2 rounded mt-0.5 overflow-x-auto whitespace-pre cursor-pointer hover:bg-brand-dark/10 transition-colors" title="Click to select all">id	university	program	country	status	deadline_app	deadline_scholarship	portal_apply_url	portal_status_url	progress	priority	notes	updated_at</pre>
                              <div class="text-[9px] text-brand-dark/40 dark:text-brand-light/40 mt-1">Tip: Triple-click to select row, then Copy & Paste into Sheet A1</div>
                           </div>
                        </li>
                        <li>
                           <span class="font-bold text-brand-teal">checklist</span>:
                           <pre class="font-mono text-[10px] select-all bg-brand-dark/5 dark:bg-brand-light/10 p-2 rounded mt-0.5 overflow-x-auto whitespace-pre cursor-pointer hover:bg-brand-dark/10 transition-colors">id	application_id	item	state	link	updated_at</pre>
                        </li>
                        <li>
                           <span class="font-bold text-brand-teal">recommenders</span>:
                           <pre class="font-mono text-[10px] select-all bg-brand-dark/5 dark:bg-brand-light/10 p-2 rounded mt-0.5 overflow-x-auto whitespace-pre cursor-pointer hover:bg-brand-dark/10 transition-colors">id	application_id	name	email	state	last_nudge_date	updated_at</pre>
                        </li>
                     </ul>
                  </li>
                </ol>
              </div>

              <!-- Step B -->
              <div class="group p-6 rounded-3xl bg-brand-dark/5 dark:bg-brand-light/5 border border-brand-dark/5 dark:border-brand-light/5 hover:border-brand-teal/30 transition-all duration-300">
                <div class="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center mb-4 text-brand-teal group-hover:scale-110 transition-transform font-bold">B</div>
                <h3 class="font-bold text-brand-dark dark:text-brand-light mb-3 tracking-tight">{{ t('setup.step_b') }}</h3>
                <ol class="text-xs space-y-2 opacity-80 list-decimal list-inside pl-1">
                  <li>Open <strong>Extensions > Apps Script</strong></li>
                  <li>Paste the code, Replace your <strong>SHEET_ID</strong></li>
                  <li>Click <strong>Deploy > New deployment</strong> (Web App)</li>
                  <li>Set access to <strong>Anyone</strong> and copy URL</li>
                </ol>
              </div>
            </div>
          </div>

          <!-- Code Box -->
          <div class="bg-brand-dark/95 dark:bg-brand-dark rounded-3xl p-6 border border-white/10 relative group mb-12 shadow-inner overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-tr from-brand-teal/10 to-transparent opacity-50"></div>
            <button @click="copyCode" class="absolute top-4 right-4 z-20 flex items-center gap-2 bg-brand-teal hover:bg-white hover:text-brand-dark text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xl active:scale-95 group-hover:ring-4 ring-brand-teal/20">
               <svg v-if="!copied" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
               <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
               {{ copied ? 'Copied!' : 'Copy Code' }}
            </button>
            <pre class="relative z-10 text-[10px] text-brand-light/60 font-mono overflow-x-auto h-48 scrollbar-thin scrollbar-thumb-brand-teal/50 scrollbar-track-transparent pr-4">{{ backendCode }}</pre>
          </div>

          <!-- Final Step: URL Input -->
          <div class="border-t border-brand-dark/10 dark:border-brand-light/10 pt-10">
            <h2 class="text-2xl font-bold mb-6 flex items-center gap-4">
              <span class="w-10 h-10 rounded-2xl bg-brand-dark dark:bg-brand-teal flex items-center justify-center text-brand-light text-xl shadow-lg ring-4 ring-brand-teal/10">2</span>
              {{ t('setup.enter_url') }}
            </h2>
            <div class="flex flex-col md:flex-row gap-4 items-stretch">
              <input 
                v-model="apiUrl" 
                placeholder="https://script.google.com/macros/s/..../exec" 
                class="flex-1 bg-brand-dark/5 dark:bg-brand-light/5 border border-brand-dark/10 dark:border-brand-light/10 rounded-2xl px-6 py-4 text-brand-dark dark:text-brand-light placeholder-brand-dark/30 dark:placeholder-brand-light/30 focus:ring-4 focus:ring-brand-teal/20 focus:border-brand-teal transition-all outline-none text-sm font-mono shadow-inner"
              />
              <button 
                @click="saveAndStart" 
                :disabled="!isValidUrl"
                class="px-10 py-4 bg-brand-teal text-white font-bold rounded-2xl shadow-xl shadow-brand-teal/20 hover:bg-brand-dark dark:hover:bg-brand-light dark:hover:text-brand-dark transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-3"
              >
                <span>{{ t('setup.launch') }}</span>
              </button>
            </div>
            <p v-if="error" class="text-rose-500 text-xs mt-4 pl-2 flex items-center gap-1">
               <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               {{ error }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Success Overlay -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="importSuccess" class="fixed inset-0 z-[100] bg-brand-dark/90 backdrop-blur-xl flex flex-col items-center justify-center text-center p-6">
           <div class="w-24 h-24 bg-brand-teal rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(45,212,191,0.3)] animate-bounce">
              <svg class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
           </div>
           
           <h2 class="text-4xl font-bold text-white mb-4 tracking-tight">
             {{ successMessage }}
           </h2>
           <p class="text-brand-light/60 text-lg">Connecting to your personal database...</p>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const { t } = useTranslation();
const config = useRuntimeConfig();
const apiUrl = ref('');
const copied = ref(false);
const error = ref('');
const importSuccess = ref(false);
const successMessage = ref('');
const showInvite = ref(false);
const inviteName = ref('');
const pendingImportUrl = ref('');
const route = useRoute();
const router = useRouter();

onMounted(() => {
   // Check for magic link import
   const importUrl = route.query.import as string;
   if (importUrl && importUrl.startsWith('https://script.google.com/') && importUrl.endsWith('/exec')) {
       // Pause and show invite screen
       pendingImportUrl.value = importUrl;
       inviteName.value = (route.query.name as string) || '';
       showInvite.value = true;
   } else {
       // Normal flow: Try to pre-fill from localStorage if available, or fallback to config
       apiUrl.value = localStorage.getItem('msc_tracker_api_url') || config.public.apiBase || '';
   }
});

const acceptInvite = () => {
    // Proceed with import
    apiUrl.value = pendingImportUrl.value;
    localStorage.setItem('msc_tracker_api_url', pendingImportUrl.value);
    
    // Set ReadOnly if present
    const isReadOnly = route.query.readonly === 'true';
    useReadOnly().setReadOnly(isReadOnly);
            
    // Show premium success overlay
    importSuccess.value = true;
    successMessage.value = inviteName.value 
        ? t('setup.config_loaded_from', { name: inviteName.value }) 
        : t('setup.config_loaded');
    
    setTimeout(() => {
        router.push('/');
    }, 2500);
};

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
