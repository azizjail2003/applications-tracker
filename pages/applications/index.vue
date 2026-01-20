<template>
  <div>

    <div class="container mx-auto px-6 py-8 max-w-6xl">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 class="text-3xl font-bold dark:text-brand-light text-brand-dark mb-1">{{ t('applications.title') }}</h1>
          <p class="dark:text-brand-light/60 text-brand-dark/60 text-sm font-light">{{ filteredApps.length }} programs being tracked</p>
        </div>
        <div class="flex gap-2">
          <div class="relative group">
             <button class="px-4 py-2 glass rounded-xl dark:text-brand-light text-brand-dark text-sm font-medium hover:bg-brand-dark/5 dark:hover:bg-brand-light/10 flex items-center gap-2 transition-all border dark:border-brand-light/10 border-brand-dark/10 bg-brand-light/50 dark:bg-transparent">
                <span>Data Tools</span>
             </button>
             <div class="absolute right-0 mt-2 w-48 glass rounded-xl shadow-xl p-2 hidden group-hover:block z-20 backdrop-blur-xl dark:bg-brand-dark/95 bg-brand-light/95 border dark:border-brand-light/10 border-brand-dark/10">
                <button @click="exportData" class="w-full text-left px-3 py-2 text-sm dark:text-brand-light text-brand-dark hover:bg-brand-dark/5 dark:hover:bg-brand-light/10 rounded-lg transition-colors">{{ t('applications.export') }}</button>
                <button @click="$refs.fileInput.click()" class="w-full text-left px-3 py-2 text-sm dark:text-brand-light text-brand-dark hover:bg-brand-dark/5 dark:hover:bg-brand-light/10 rounded-lg transition-colors">{{ t('applications.import') }}</button>
             </div>
          </div>
          <button @click="createNew" class="px-5 py-2 bg-brand-teal text-white rounded-xl font-bold hover:bg-brand-dark transition-all flex items-center gap-2 shadow-lg hover:shadow-xl">
            <span>+ {{ t('applications.new_app') }}</span>
          </button>
        </div>
        <input type="file" ref="fileInput" class="hidden" accept=".json" @change="importData" />
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

const { applications, checklistItems, recommenders, fetchAll, upsertApplication } = useApplications();
const { t } = useTranslation();
const { formatDate } = useDate();
const router = useRouter();
const api = useApi();

const search = ref('');
const filterStatus = ref('');
const sortBy = ref('deadline');
// @ts-ignore
const fileInput = ref(null);

onMounted(() => {
  fetchAll();
});

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
         if (confirm(`Import ${json.applications?.length || 0} applications, ${json.checklist?.length || 0} items? This puts them in the database.`)) {
             await api.post('bulkUpsert', json);
             alert('Import started. It may take a moment to sync. Please refresh shortly.');
             await fetchAll();
         }
      } catch (err) {
         alert('Invalid JSON file');
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
