<template>
  <div>
    <AppHeader />
    <div class="container mx-auto px-6 py-8 max-w-5xl" v-if="app">
      <!-- Top Action Bar -->
      <div class="flex justify-between items-center mb-8">
         <NuxtLink to="/applications" class="text-sm text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-white flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
           <span class="group-hover:-translate-x-1 transition-transform">&larr;</span> {{ t('detail.back') }}
         </NuxtLink>
         <div class="flex gap-3">
            <button @click="handleDelete" class="text-sm text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 px-4 py-2 hover:bg-rose-500/10 rounded-lg transition-colors border border-transparent hover:border-rose-500/30">{{ t('detail.delete') }}</button>
            <button @click="save" class="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all">{{ t('detail.save') }}</button>
         </div>
      </div>

      <!-- Main Card -->
      <div class="glass p-8 rounded-3xl mb-8 relative overflow-hidden dark:bg-white/5 bg-white border border-gray-100 dark:border-white/10">
         <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
         
         <div class="relative z-10 space-y-8">
            <!-- Header Inputs -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div class="space-y-6">
                  <div>
                    <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{{ t('detail.university') }}</label>
                    <input v-model="app.university" @blur="save" class="block w-full text-3xl font-bold bg-transparent border-0 border-b border-gray-200 dark:border-white/10 px-0 py-2 focus:ring-0 focus:border-indigo-500 placeholder-gray-300 dark:placeholder-white/20 text-gray-900 dark:text-white transition-colors" placeholder="University Name" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{{ t('detail.program') }}</label>
                    <input v-model="app.program" @blur="save" class="block w-full text-xl bg-transparent border-0 border-b border-gray-200 dark:border-white/10 px-0 py-2 focus:ring-0 focus:border-indigo-500 placeholder-gray-300 dark:placeholder-white/20 text-indigo-600 dark:text-indigo-200 transition-colors" placeholder="Program Name" />
                  </div>
               </div>
               
               <div class="space-y-6 md:text-right">
                  <div class="flex flex-col md:items-end">
                    <label class="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">{{ t('detail.status') }}</label>
                    <select v-model="app.status" @change="save" class="block w-full md:w-48 bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer shadow-sm dark:shadow-lg">
                      <option value="Draft">Draft</option>
                      <option value="In progress">In Progress</option>
                      <option value="Submitted">Submitted</option>
                      <option value="Interview">Interview</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  
                  <div class="flex flex-col md:items-end">
                     <label class="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">{{ t('detail.progress') }} ({{ app.progress }}%)</label>
                     <div class="flex items-center gap-3 w-full md:w-48 dark:bg-white/5 bg-gray-50 p-2 rounded-xl border border-gray-200 dark:border-white/5">
                        <input type="range" :value="app.progress" disabled min="0" max="100" class="w-full accent-indigo-500 h-1 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-not-allowed opacity-50">
                        <span class="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold whitespace-nowrap px-1.5 py-0.5 bg-indigo-500/10 rounded">{{ t('detail.auto') }}</span>
                     </div>
                  </div>
               </div>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-100 dark:border-white/10">
               <div>
                 <label class="block text-[10px] font-bold text-gray-400 uppercase mb-2">{{ t('detail.country') }}</label>
                 <input v-model="app.country" @blur="save" class="w-full text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="e.g. UK" />
               </div>
               <div>
                 <label class="block text-[10px] font-bold text-gray-400 uppercase mb-2">{{ t('detail.priority') }} (1-5)</label>
                 <input type="number" v-model.number="app.priority" @blur="save" min="1" max="5" class="w-full text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" />
               </div>
               <div>
                  <label class="block text-[10px] font-bold text-gray-400 uppercase mb-2">{{ t('detail.app_deadline') }}</label>
                  <input type="date" v-model="app.deadline_app" @blur="save" class="w-full text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white/80 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:[color-scheme:dark]" />
               </div>
               <div>
                  <label class="block text-[10px] font-bold text-gray-400 uppercase mb-2">{{ t('detail.scholarship_deadline') }}</label>
                  <input type="date" v-model="app.deadline_scholarship" @blur="save" class="w-full text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white/80 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:[color-scheme:dark]" />
               </div>
            </div>
            
            <!-- Portals -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label class="block text-[10px] font-bold text-gray-400 uppercase mb-2">{{ t('detail.app_portal') }}</label>
                  <div class="flex">
                    <input v-model="app.portal_apply_url" @blur="save" class="flex-1 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-l-lg px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="https://..." />
                    <a v-if="app.portal_apply_url" :href="app.portal_apply_url" target="_blank" class="bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 px-3 py-2 rounded-r-lg flex items-center justify-center transition-colors text-white">
                       <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </div>
               </div>
               <div>
                  <label class="block text-[10px] font-bold text-gray-400 uppercase mb-2">{{ t('detail.status_portal') }}</label>
                  <div class="flex">
                    <input v-model="app.portal_status_url" @blur="save" class="flex-1 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-l-lg px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" placeholder="https://..." />
                    <a v-if="app.portal_status_url" :href="app.portal_status_url" target="_blank" class="bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 px-3 py-2 rounded-r-lg flex items-center justify-center transition-colors text-white">
                       <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </div>
               </div>
            </div>
         </div>
      </div>
      
      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <!-- Left: Checklists -->
         <div class="space-y-8">
            <div class="glass p-6 rounded-2xl dark:bg-white/5 bg-white border border-gray-100 dark:border-white/10">
               <div class="flex justify-between items-center mb-6 border-b dark:border-white/10 border-gray-100 pb-4">
                  <h3 class="font-bold dark:text-white text-gray-900 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span>
                    {{ t('detail.checklist') }}
                  </h3>
                  <button @click="seed" class="text-xs bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 px-3 py-1.5 rounded-lg hover:bg-indigo-500/20 transition-colors">{{ t('detail.seed_items') }}</button>
               </div>
               <ChecklistEditor :appId="app.id" />
            </div>
            
            <div class="glass p-6 rounded-2xl dark:bg-white/5 bg-white border border-gray-100 dark:border-white/10">
               <RecommendersEditor :appId="app.id" />
            </div>
         </div>
         
         <!-- Right: Notes -->
         <div class="glass p-6 rounded-2xl flex flex-col h-fit dark:bg-white/5 bg-white border border-gray-100 dark:border-white/10">
            <h3 class="font-bold dark:text-white text-gray-900 mb-6 border-b dark:border-white/10 border-gray-100 pb-4 flex items-center gap-2">
               <span class="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span>
               {{ t('detail.notes') }}
            </h3>
            <textarea 
               v-model="app.notes" 
               @blur="save" 
               class="flex-1 min-h-[400px] w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent p-4 placeholder-gray-400 dark:placeholder-gray-600 leading-relaxed transition-colors"
               :placeholder="t('detail.notes_placeholder')"
            ></textarea>
            <div class="mt-4 text-xs text-gray-500 text-right font-mono">
               {{ t('detail.last_updated') }}: {{ app.updated_at ? new Date(app.updated_at).toLocaleString() : 'Never' }}
            </div>
         </div>
      </div>
    </div>
    
    <div v-if="loading && !app" class="flex justify-center items-center h-screen">
       <div class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent shadow-lg shadow-indigo-500/50"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Application } from '~/types';

const route = useRoute();
const router = useRouter();
const { t } = useTranslation();
const { applications, fetchDetails, upsertApplication, deleteApplication, seedTemplate, recalculateProgress, loading } = useApplications();

const appId = route.params.id as string;

// Initialize
onMounted(async () => {
   if (!applications.value.find(a => a.id === appId)) {
      await fetchDetails(appId); // This fetches details AND ensures app is in list if not found
   } else {
      fetchDetails(appId); // Fetch details in background if app exists in list
   }
});

const app = computed(() => applications.value.find(a => a.id === appId));

const save = async () => {
    if (app.value) {
        // Auto-calculate progress
        recalculateProgress(appId);
        // Save
        await upsertApplication(app.value);
        // Redirect
        router.push('/applications');
    }
};

const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this entire application?')) {
        await deleteApplication(appId);
        router.push('/applications');
    }
};

const seed = async () => {
   await seedTemplate(appId);
};
</script>
