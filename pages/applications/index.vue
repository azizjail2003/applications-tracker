<template>
  <div>

    <div class="container mx-auto px-6 py-8 max-w-6xl">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 class="text-3xl font-bold dark:text-brand-light text-brand-dark mb-1">{{ t('applications.title') }}</h1>
          <p class="dark:text-brand-light/60 text-brand-dark/60 text-sm font-light">{{ filteredApps.length }} programs being tracked</p>
        </div>
        <div class="flex gap-2">
          <div class="relative" v-if="!isReadOnly">
             <button 
                @click="showTools = !showTools"
                class="px-4 py-2 glass rounded-xl dark:text-brand-light text-brand-dark text-sm font-medium hover:bg-brand-dark/5 dark:hover:bg-brand-light/10 flex items-center gap-2 transition-all border dark:border-brand-light/10 border-brand-dark/10 bg-brand-light/50 dark:bg-transparent"
             >
                <span>Data Tools</span>
                <svg :class="{'rotate-180': showTools}" class="w-4 h-4 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
             </button>
             
             <!-- Dropdown Backdrop to close on click outside -->
             <div v-if="showTools" @click="showTools = false" class="fixed inset-0 z-10"></div>

             <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-2"
             >
                <div v-if="showTools" class="absolute right-0 mt-2 w-56 glass rounded-xl shadow-xl p-2 z-20 backdrop-blur-xl dark:bg-brand-dark/95 bg-brand-light/95 border dark:border-brand-light/10 border-brand-dark/10">
                    <button 
                        @click="toggleReminders" 
                        :disabled="isReminderLoading"
                        class="w-full text-left px-3 py-3 text-sm dark:text-brand-light text-brand-dark hover:bg-brand-dark/5 dark:hover:bg-brand-light/10 rounded-lg transition-colors border-b border-brand-dark/5 dark:border-brand-light/5 mb-1 flex items-center justify-between group disabled:opacity-50"
                    >
                        <div class="flex items-center gap-2">
                            <span v-if="isReminderLoading" class="w-3 h-3 border-2 border-brand-teal border-t-transparent rounded-full animate-spin"></span>
                            <span>{{ remindersEnabled ? 'Turn Off Reminders' : 'Turn On Reminders' }}</span>
                        </div>
                        <span :class="remindersEnabled ? 'bg-rose-500/10 text-rose-500' : 'bg-brand-teal/10 text-brand-teal'" class="text-[10px] font-bold px-1.5 py-0.5 rounded transition-colors uppercase">
                            {{ remindersEnabled ? 'Live' : 'Off' }}
                        </span>
                    </button>
                    <button v-if="remindersEnabled" @click="testReminders" class="w-full text-left px-3 py-2 text-sm text-brand-teal hover:bg-brand-teal/5 rounded-lg transition-colors flex items-center gap-2 mb-1">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Send Test Email
                    </button>
                    <button @click="exportData" class="w-full text-left px-3 py-2 text-sm dark:text-brand-light text-brand-dark hover:bg-brand-dark/5 dark:hover:bg-brand-light/10 rounded-lg transition-colors flex items-center gap-2">
                        <svg class="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        {{ t('applications.export') }}
                    </button>
                    <button @click="fileInput?.click()" class="w-full text-left px-3 py-2 text-sm dark:text-brand-light text-brand-dark hover:bg-brand-dark/5 dark:hover:bg-brand-light/10 rounded-lg transition-colors flex items-center gap-2">
                        <svg class="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        {{ t('applications.import') }}
                    </button>
                </div>
             </Transition>
          </div>
          <button v-if="!isReadOnly" @click="createNew" class="px-5 py-2 bg-brand-teal text-white rounded-xl font-bold hover:bg-brand-dark transition-all flex items-center gap-2 shadow-lg hover:shadow-xl">
            <span>+ {{ t('applications.new_app') }}</span>
          </button>
        </div>
        <input v-if="!isReadOnly" type="file" ref="fileInput" class="hidden" accept=".json" @change="importData" />
      </div>

      <!-- Filters -->
      <div class="glass p-4 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 dark:bg-brand-light/5 bg-white border border-brand-dark/10 dark:border-brand-light/10">
         <div class="flex-1">
           <input 
             v-model="search" 
             type="text" 
             :placeholder="t('applications.search_placeholder')" 
             class="w-full transition-all bg-brand-light/50 dark:bg-brand-dark/50 border border-brand-dark/10 dark:border-brand-light/10 dark:text-brand-light text-brand-dark rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-brand-teal focus:border-transparent placeholder-brand-dark/40 dark:placeholder-brand-light/40"
           >
         </div>
         
         <select v-model="filterStatus" class="transition-all bg-brand-light/50 dark:bg-brand-dark/50 border border-brand-dark/10 dark:border-brand-light/10 dark:text-brand-light text-brand-dark rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-brand-teal focus:border-transparent cursor-pointer">
           <option value="">{{ t('applications.filter_all') }}</option>
           <option value="Draft">Draft</option>
           <option value="In progress">In Progress</option>
           <option value="Submitted">Submitted</option>
           <option value="Interview">Interview</option>
           <option value="Accepted">Accepted</option>
           <option value="Rejected">Rejected</option>
         </select>
         
         <select v-model="filterMissing" class="transition-all bg-brand-light/50 dark:bg-brand-dark/50 border border-brand-dark/10 dark:border-brand-light/10 dark:text-brand-light text-brand-dark rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-brand-teal focus:border-transparent cursor-pointer">
           <option value="">Everything OK</option>
           <option v-for="item in uniqueMissingItems" :key="item" :value="item">Missing: {{ item }}</option>
         </select>
         
         <select v-model="sortBy" class="transition-all bg-brand-light/50 dark:bg-brand-dark/50 border border-brand-dark/10 dark:border-brand-light/10 dark:text-brand-light text-brand-dark rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-brand-teal focus:border-transparent cursor-pointer">
           <option value="deadline">{{ t('applications.sort_deadline') }}</option>
           <option value="priority">{{ t('applications.sort_priority') }}</option>
           <option value="updated">Recently Updated</option>
           <option value="progress">{{ t('applications.sort_progress') }}</option>
         </select>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink 
          v-for="app in filteredApps" 
          :key="app.id"
          :to="`/applications/${app.id}`"
          class="glass-card p-6 rounded-2xl hover:-translate-y-2 hover:shadow-xl dark:bg-brand-light/5 bg-white border border-brand-dark/10 dark:border-brand-light/10 transition-all duration-300 group relative overflow-hidden"
        >
           <!-- Hover Glow -->
           <div class="absolute inset-0 bg-brand-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

           <div class="flex justify-between items-start mb-4 relative z-10">
             <div class="w-12 h-12 dark:bg-brand-light/10 bg-brand-dark/5 border dark:border-brand-light/10 border-brand-dark/10 rounded-xl flex items-center justify-center text-xl font-bold text-brand-dark/40 dark:text-brand-light/40 group-hover:text-brand-light group-hover:bg-brand-dark dark:group-hover:bg-brand-light dark:group-hover:text-brand-dark transition-all duration-300 shadow-sm">
               {{ app.university.charAt(0) }}
             </div>
             <StatusBadge :status="app.status" />
           </div>
           
           <h3 class="font-bold dark:text-brand-light text-brand-dark text-lg truncate mb-1 relative z-10">{{ app.university }}</h3>
           <p class="text-sm text-brand-teal dark:text-brand-light/80 mb-6 truncate relative z-10">{{ app.program }}</p>
           
           <div class="space-y-3 relative z-10">
             <div class="flex justify-between text-xs">
                <span class="text-brand-dark/60 dark:text-brand-light/60">Deadline</span>
                <span class="font-medium dark:text-brand-light text-brand-dark">{{ formatDate(app.deadline_app) }}</span>
             </div>
             <div class="flex justify-between text-xs">
                <span class="text-brand-dark/60 dark:text-brand-light/60">{{ t('detail.country') }}</span>
                <span class="font-medium dark:text-brand-light text-brand-dark">{{ app.country || 'N/A' }}</span>
             </div>
             <!-- Missing Items Warning -->
             <div v-if="getMissingForApp(app.id).length > 0" class="pt-2 flex flex-wrap gap-1">
                <span v-for="(m, i) in getMissingForApp(app.id).slice(0, 3)" :key="i" class="text-[10px] font-bold bg-rose-500/10 text-rose-500 px-1.5 py-0.5 rounded border border-rose-500/20">
                    ! {{ m }}
                </span>
                <span v-if="getMissingForApp(app.id).length > 3" class="text-[10px] text-rose-500 pt-0.5">+{{ getMissingForApp(app.id).length - 3 }}</span>
             </div>
           </div>
           
           <div class="mt-6 pt-4 border-t dark:border-brand-light/10 border-brand-dark/10 flex items-center gap-3 relative z-10">
             <div class="flex-1">
               <ProgressBar :percent="app.progress" />
             </div>
             <span class="text-[10px] text-brand-dark/40 dark:text-brand-light/40 font-mono w-8 text-right">{{ app.progress }}%</span>
           </div>
        </NuxtLink>
      </div>
      
      <div v-if="filteredApps.length === 0" class="text-center py-20">
         <div class="text-6xl mb-4 opacity-50">🔭</div>
         <p class="text-brand-dark/50 dark:text-brand-light/50 text-lg">{{ t('applications.empty_state') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Application } from '~/types';

const { applications, checklistItems, recommenders, fetchAll, fetchAllData, upsertApplication } = useApplications();
const { t } = useTranslation();
const { formatDate } = useDate();
const { isReadOnly } = useReadOnly();
const { ask, notify } = useConfirm();
const router = useRouter();
const api = useApi();

const search = ref('');
const filterStatus = ref('');
const filterMissing = ref('');
const sortBy = ref('deadline');
const fileInput = ref<HTMLInputElement | null>(null);
const showTools = ref(false);
const remindersEnabled = ref(false);
const isReminderLoading = ref(false);

const checkReminders = async () => {
    try {
        const data = await api.get<{ enabled: boolean }>('checkReminderStatus', {});
        if (data && typeof data.enabled !== 'undefined') {
            remindersEnabled.value = data.enabled;
        }
    } catch (e) {
        console.error('Failed to check reminders');
    }
};

onMounted(async () => {
  fetchAllData(); // Fetch full data for filters
  checkReminders(); // Check reminder status
});

// Compute missing items per app
const appsWithMissing = computed(() => {
   const map = new Map<string, string[]>();
   
   applications.value.forEach(app => {
       const missing: string[] = [];
       const items = checklistItems.value.filter(i => i.application_id === app.id);
       
       if (items.length === 0) {
           // If no items, assume basic ones are missing
       } else {
           items.forEach(i => {
               if (i.state === 'missing') missing.push(i.item);
           });
       }
       map.set(app.id, missing);
   });
   return map;
});

// Get unique missing items for filter
const uniqueMissingItems = computed(() => {
    const set = new Set<string>();
    checklistItems.value.forEach(i => {
        if (i.state === 'missing') set.add(i.item);
    });
    return Array.from(set).sort();
});

const toggleReminders = async () => {
    const action = remindersEnabled.value ? 'disableReminders' : 'enableReminders';
    const msg = remindersEnabled.value 
        ? 'Disable daily email reminders?' 
        : 'Enable daily 8AM email reminders?\n\nNOTE: If this is your first time, Google will ask you to "Authorize" the script. You must accept to allow the script to send emails to you.';
        
    if (await ask(msg, remindersEnabled.value ? 'Disable Reminders' : 'Enable Reminders')) {
        isReminderLoading.value = true;
        showTools.value = false;
        try {
            await api.post(action, {});
            // Wait for 1.2s to ensure Google Trigger propagates
            await new Promise(r => setTimeout(r, 1200));
            await checkReminders();
            
            if (remindersEnabled.value === (action === 'enableReminders')) {
                notify(
                    remindersEnabled.value ? 'Daily reminders are now active!' : 'Daily reminders have been disabled.',
                    remindersEnabled.value ? 'Reminders Live' : 'Reminders Stopped',
                    remindersEnabled.value ? 'success' : 'info'
                );
            } else {
                // Should not happen, but if synchronization fails
                notify('Setting updated but check returned inconsistent result. Please refresh.', 'Sync Warning', 'error');
            }
        } finally {
            isReminderLoading.value = false;
        }
    }
};

const testReminders = async () => {
    await api.post('testEmail', {});
    notify('Test email sent! Check your inbox (and spam folder).', 'Test Successful', 'success');
};

const getMissingForApp = (appId: string) => {
    return appsWithMissing.value.get(appId) || [];
};

const exportData = () => {
   const data = {
      applications: applications.value,
      checklist: checklistItems.value,
      recommenders: recommenders.value
   };
   const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
   const url = URL.createObjectURL(blob);
   const a = document.createElement('a');
   a.href = url;
   a.download = `msc-applications-${new Date().toISOString().split('T')[0]}.json`;
   a.click();
   URL.revokeObjectURL(url);
};

const importData = async (event: Event) => {
   const file = (event.target as HTMLInputElement).files?.[0];
   if (!file) return;
   
   const reader = new FileReader();
   reader.onload = async (e) => {
      try {
         const json = JSON.parse(e.target?.result as string);
         if (await ask(`Import ${json.applications?.length || 0} applications, ${json.checklist?.length || 0} items?\n\nThis will merge them into your current database.`)) {
             await api.post('bulkUpsert', json);
             notify('Import started. It may take a moment to sync. Please refresh shortly.', 'Importing Data', 'success');
             await fetchAllData();
         }
      } catch (err) {
         notify('Invalid JSON file format. Please check your export file.', 'Import Error', 'error');
      }
   };
   reader.readAsText(file);
};

const createNew = async () => {
   const newId = crypto.randomUUID();
   const newApp: Application = {
      id: newId,
      university: 'New University',
      program: 'MSc Program',
      country: '',
      status: 'Draft',
      deadline_app: '',
      progress: 0,
      priority: 3
   };
   await upsertApplication(newApp);
   router.push(`/applications/${newId}`);
};

const filteredApps = computed(() => {
  let res = [...applications.value];
  
  if (search.value) {
    const q = search.value.toLowerCase();
    res = res.filter(a => 
      a.university.toLowerCase().includes(q) || 
      a.program.toLowerCase().includes(q)
    );
  }
  
  if (filterStatus.value) {
    res = res.filter(a => a.status === filterStatus.value);
  }

  if (filterMissing.value) {
      res = res.filter(a => {
          const missing = appsWithMissing.value.get(a.id);
          return missing?.includes(filterMissing.value);
      });
  }
  
  res.sort((a, b) => {
    switch(sortBy.value) {
      case 'deadline':
        if (!a.deadline_app) return 1;
        if (!b.deadline_app) return -1;
        return new Date(a.deadline_app).getTime() - new Date(b.deadline_app).getTime();
      case 'priority': return b.priority - a.priority;
      case 'updated': return new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime();
      case 'progress': return b.progress - a.progress;
      default: return 0;
    }
  });
  
  return res;
});
</script>
