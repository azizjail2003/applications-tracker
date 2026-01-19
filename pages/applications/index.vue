<template>
  <div>
    <AppHeader />
    <div class="container mx-auto px-6 py-8 max-w-6xl">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 class="text-3xl font-bold dark:text-white text-gray-900 mb-1">{{ t('applications.title') }}</h1>
          <p class="dark:text-indigo-200 text-gray-600 text-sm font-light">{{ filteredApps.length }} programs being tracked</p>
        </div>
        <div class="flex gap-2">
          <div class="relative group">
             <button class="px-4 py-2 glass rounded-xl dark:text-indigo-100 text-indigo-600 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-2 transition-all border dark:border-white/10 border-indigo-100 bg-white/50 dark:bg-transparent">
                <span>Data Tools</span>
             </button>
             <div class="absolute right-0 mt-2 w-48 glass rounded-xl shadow-xl p-2 hidden group-hover:block z-20 backdrop-blur-xl dark:bg-slate-900/90 bg-white/90 border dark:border-slate-700 border-gray-200">
                <button @click="exportData" class="w-full text-left px-3 py-2 text-sm dark:text-gray-300 text-gray-700 hover:bg-black/5 dark:hover:bg-white/10 dark:hover:text-white rounded-lg transition-colors">{{ t('applications.export') }}</button>
                <button @click="$refs.fileInput.click()" class="w-full text-left px-3 py-2 text-sm dark:text-gray-300 text-gray-700 hover:bg-black/5 dark:hover:bg-white/10 dark:hover:text-white rounded-lg transition-colors">{{ t('applications.import') }}</button>
             </div>
          </div>
          <button @click="createNew" class="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <span>+ {{ t('applications.new_app') }}</span>
          </button>
        </div>
        <input type="file" ref="fileInput" class="hidden" accept=".json" @change="importData" />
      </div>

      <!-- Filters -->
      <div class="glass p-4 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 dark:bg-white/5 bg-white border border-gray-100 dark:border-white/10">
         <div class="flex-1">
           <input 
             v-model="search" 
             type="text" 
             :placeholder="t('applications.search_placeholder')" 
             class="w-full transition-all bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 dark:text-white text-gray-900 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
           >
         </div>
         
         <select v-model="filterStatus" class="transition-all bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 dark:text-white text-gray-700 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer">
           <option value="">{{ t('applications.filter_all') }}</option>
           <option value="Draft">Draft</option>
           <option value="In progress">In Progress</option>
           <option value="Submitted">Submitted</option>
           <option value="Interview">Interview</option>
           <option value="Accepted">Accepted</option>
           <option value="Rejected">Rejected</option>
         </select>
         
         <select v-model="sortBy" class="transition-all bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 dark:text-white text-gray-700 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer">
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
          class="glass-card p-6 rounded-2xl hover:-translate-y-2 hover:shadow-xl dark:bg-white/5 bg-white border border-gray-100 dark:border-white/10 transition-all duration-300 group relative overflow-hidden"
        >
           <!-- Hover Glow -->
           <div class="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

           <div class="flex justify-between items-start mb-4 relative z-10">
             <div class="w-12 h-12 dark:bg-white/5 bg-gray-50 border dark:border-white/10 border-gray-100 rounded-xl flex items-center justify-center text-xl font-bold text-gray-400 group-hover:text-white group-hover:bg-indigo-500 transition-all duration-300 shadow-sm">
               {{ app.university.charAt(0) }}
             </div>
             <StatusBadge :status="app.status" />
           </div>
           
           <h3 class="font-bold dark:text-white text-gray-900 text-lg truncate mb-1 relative z-10">{{ app.university }}</h3>
           <p class="text-sm text-indigo-600 dark:text-indigo-200 mb-6 truncate relative z-10">{{ app.program }}</p>
           
           <div class="space-y-3 relative z-10">
             <div class="flex justify-between text-xs">
                <span class="text-gray-500 dark:text-gray-400">Deadline</span>
                <span class="font-medium dark:text-gray-200 text-gray-700">{{ app.deadline_app || 'N/A' }}</span>
             </div>
             <div class="flex justify-between text-xs">
                <span class="text-gray-500 dark:text-gray-400">{{ t('detail.country') }}</span>
                <span class="font-medium dark:text-gray-200 text-gray-700">{{ app.country || 'N/A' }}</span>
             </div>
           </div>
           
           <div class="mt-6 pt-4 border-t dark:border-white/10 border-gray-100 flex items-center gap-3 relative z-10">
             <div class="flex-1">
               <ProgressBar :percent="app.progress" />
             </div>
             <span class="text-[10px] text-gray-400 font-mono w-8 text-right">{{ app.progress }}%</span>
           </div>
        </NuxtLink>
      </div>
      
      <div v-if="filteredApps.length === 0" class="text-center py-20">
         <div class="text-6xl mb-4">🔭</div>
         <p class="text-gray-400 text-lg">{{ t('applications.empty_state') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Application } from '~/types';

const { applications, checklistItems, recommenders, fetchAll, upsertApplication } = useApplications();
const { t } = useTranslation();
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
