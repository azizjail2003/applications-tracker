<template>
  <div>
    <AppHeader />
    <div class="container mx-auto px-6 py-8 max-w-5xl" v-if="app">
      <!-- Top Action Bar -->
      <div class="flex justify-between items-center mb-8">
         <NuxtLink to="/applications" class="text-sm text-brand-teal dark:text-brand-light/80 hover:text-brand-dark dark:hover:text-brand-light flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-brand-dark/5 dark:hover:bg-brand-light/10 transition-colors group">
           <span class="group-hover:-translate-x-1 transition-transform">&larr;</span> {{ t('detail.back') }}
         </NuxtLink>
         <div class="flex gap-3">
            <button @click="handleDelete" class="text-sm text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 px-4 py-2 hover:bg-rose-500/10 rounded-lg transition-colors border border-transparent hover:border-rose-500/30">{{ t('detail.delete') }}</button>
            <button @click="save" class="px-6 py-2 bg-brand-teal text-white text-sm font-bold rounded-xl shadow-lg hover:bg-brand-dark transition-all">{{ t('detail.save') }}</button>
         </div>
      </div>

      <!-- Main Card -->
      <div class="glass p-8 rounded-3xl mb-8 relative overflow-hidden dark:bg-brand-light/5 bg-white border border-brand-dark/10 dark:border-brand-light/10">
         
         <div class="relative z-10 space-y-8">
            <!-- Header Inputs -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div class="space-y-6">
                  <div>
                    <label class="block text-xs font-bold text-brand-dark/40 dark:text-brand-light/40 uppercase tracking-widest mb-2">{{ t('detail.university') }}</label>
                    <input v-model="app.university" @blur="save" class="block w-full text-3xl font-bold bg-transparent border-0 border-b border-brand-dark/20 dark:border-brand-light/20 px-0 py-2 focus:ring-0 focus:border-brand-teal placeholder-brand-dark/20 dark:placeholder-brand-light/20 text-brand-dark dark:text-brand-light transition-colors" placeholder="University Name" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-brand-dark/40 dark:text-brand-light/40 uppercase tracking-widest mb-2">{{ t('detail.program') }}</label>
                    <input v-model="app.program" @blur="save" class="block w-full text-xl bg-transparent border-0 border-b border-brand-dark/20 dark:border-brand-light/20 px-0 py-2 focus:ring-0 focus:border-brand-teal placeholder-brand-dark/20 dark:placeholder-brand-light/20 text-brand-teal dark:text-brand-light/80 transition-colors" placeholder="Program Name" />
                  </div>
               </div>
               
               <div class="space-y-6 md:text-right">
                  <div class="flex flex-col md:items-end">
                    <label class="block text-xs font-bold text-brand-dark/40 dark:text-brand-light/40 uppercase tracking-wide mb-2">{{ t('detail.status') }}</label>
                    <select v-model="app.status" @change="save" class="block w-full md:w-48 bg-brand-light/50 dark:bg-brand-dark/50 border border-brand-dark/10 dark:border-brand-light/10 text-brand-dark dark:text-brand-light rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-brand-teal focus:border-transparent cursor-pointer shadow-sm">
                      <option value="Draft">Draft</option>
                      <option value="In progress">In Progress</option>
                      <option value="Submitted">Submitted</option>
                      <option value="Interview">Interview</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  
                  <div class="flex flex-col md:items-end">
                     <label class="block text-xs font-bold text-brand-dark/40 dark:text-brand-light/40 uppercase tracking-wide mb-2">{{ t('detail.progress') }} ({{ app.progress }}%)</label>
                     <div class="flex items-center gap-3 w-full md:w-48 dark:bg-brand-light/5 bg-brand-dark/5 p-2 rounded-xl border border-brand-dark/5 dark:border-brand-light/5">
                        <input type="range" :value="app.progress" disabled min="0" max="100" class="w-full accent-brand-teal h-1 bg-brand-dark/10 dark:bg-brand-light/10 rounded-lg appearance-none cursor-not-allowed opacity-50">
                        <span class="text-[10px] text-brand-teal dark:text-brand-light/80 font-bold whitespace-nowrap px-1.5 py-0.5 bg-brand-teal/10 rounded">{{ t('detail.auto') }}</span>
                     </div>
                  </div>
               </div>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-brand-dark/5 dark:border-brand-light/5">
               <div>
                 <label class="block text-[10px] font-bold text-brand-dark/40 dark:text-brand-light/40 uppercase mb-2">{{ t('detail.country') }}</label>
                 <input v-model="app.country" @blur="save" class="w-full text-sm bg-brand-light/50 dark:bg-brand-dark/50 border border-brand-dark/10 dark:border-brand-light/10 rounded-lg px-3 py-2 text-brand-dark dark:text-brand-light placeholder-brand-dark/40 dark:placeholder-brand-light/40 focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all" placeholder="e.g. UK" />
               </div>
               <div>
                 <label class="block text-[10px] font-bold text-brand-dark/40 dark:text-brand-light/40 uppercase mb-2">{{ t('detail.priority') }} (1-5)</label>
                 <input type="number" v-model.number="app.priority" @blur="save" min="1" max="5" class="w-full text-sm bg-brand-light/50 dark:bg-brand-dark/50 border border-brand-dark/10 dark:border-brand-light/10 rounded-lg px-3 py-2 text-brand-dark dark:text-brand-light focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all" />
               </div>
               <div>
                  <label class="block text-[10px] font-bold text-brand-dark/40 dark:text-brand-light/40 uppercase mb-2">{{ t('detail.app_deadline') }}</label>
                  <input type="date" v-model="app.deadline_app" @blur="save" class="w-full text-sm bg-brand-light/50 dark:bg-brand-dark/50 border border-brand-dark/10 dark:border-brand-light/10 rounded-lg px-3 py-2 text-brand-dark dark:text-brand-light/80 focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all dark:[color-scheme:dark]" />
               </div>
               <div>
                  <label class="block text-[10px] font-bold text-brand-dark/40 dark:text-brand-light/40 uppercase mb-2">{{ t('detail.scholarship_deadline') }}</label>
                  <input type="date" v-model="app.deadline_scholarship" @blur="save" class="w-full text-sm bg-brand-light/50 dark:bg-brand-dark/50 border border-brand-dark/10 dark:border-brand-light/10 rounded-lg px-3 py-2 text-brand-dark dark:text-brand-light/80 focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all dark:[color-scheme:dark]" />
               </div>
            </div>
            
            <!-- Portals -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label class="block text-[10px] font-bold text-brand-dark/40 dark:text-brand-light/40 uppercase mb-2">{{ t('detail.app_portal') }}</label>
                  <div class="flex">
                    <input v-model="app.portal_apply_url" @blur="save" class="flex-1 text-sm bg-brand-light/50 dark:bg-brand-dark/50 border border-brand-dark/10 dark:border-brand-light/10 rounded-l-lg px-3 py-2 text-brand-dark dark:text-brand-light placeholder-brand-dark/40 dark:placeholder-brand-light/40 focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all" placeholder="https://..." />
                    <a v-if="app.portal_apply_url" :href="app.portal_apply_url" target="_blank" class="bg-brand-teal hover:bg-brand-dark border border-brand-teal px-3 py-2 rounded-r-lg flex items-center justify-center transition-colors text-white">
                       <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </div>
               </div>
               <div>
                  <label class="block text-[10px] font-bold text-brand-dark/40 dark:text-brand-light/40 uppercase mb-2">{{ t('detail.status_portal') }}</label>
                  <div class="flex">
                    <input v-model="app.portal_status_url" @blur="save" class="flex-1 text-sm bg-brand-light/50 dark:bg-brand-dark/50 border border-brand-dark/10 dark:border-brand-light/10 rounded-l-lg px-3 py-2 text-brand-dark dark:text-brand-light placeholder-brand-dark/40 dark:placeholder-brand-light/40 focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all" placeholder="https://..." />
                    <a v-if="app.portal_status_url" :href="app.portal_status_url" target="_blank" class="bg-brand-teal hover:bg-brand-dark border border-brand-teal px-3 py-2 rounded-r-lg flex items-center justify-center transition-colors text-white">
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
            <div class="glass p-6 rounded-2xl dark:bg-brand-light/5 bg-white border border-brand-dark/10 dark:border-brand-light/10">
               <div class="flex justify-between items-center mb-6 border-b dark:border-brand-light/10 border-brand-dark/5 pb-4">
                  <h3 class="font-bold dark:text-brand-light text-brand-dark flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                    {{ t('detail.checklist') }}
                  </h3>
                  <button @click="seed" class="text-xs bg-brand-teal/10 text-brand-teal border border-brand-teal/20 px-3 py-1.5 rounded-lg hover:bg-brand-teal/20 transition-colors">{{ t('detail.seed_items') }}</button>
               </div>
               <ChecklistEditor :appId="app.id" />
            </div>
            
            <div class="glass p-6 rounded-2xl dark:bg-brand-light/5 bg-white border border-brand-dark/10 dark:border-brand-light/10">
               <RecommendersEditor :appId="app.id" />
            </div>
         </div>
         
         <!-- Right: Notes -->
         <div class="glass p-6 rounded-2xl flex flex-col h-fit dark:bg-brand-light/5 bg-white border border-brand-dark/10 dark:border-brand-light/10">
            <h3 class="font-bold dark:text-brand-light text-brand-dark mb-6 border-b dark:border-brand-light/10 border-brand-dark/5 pb-4 flex items-center gap-2">
               <span class="w-2 h-2 rounded-full bg-purple-400"></span>
               {{ t('detail.notes') }}
            </h3>
            <textarea 
               v-model="app.notes" 
               @blur="save" 
               class="flex-1 min-h-[400px] w-full bg-brand-light/50 dark:bg-brand-dark/50 border border-brand-dark/10 dark:border-brand-light/10 rounded-xl text-sm text-brand-dark dark:text-brand-light focus:ring-2 focus:ring-brand-teal focus:border-transparent p-4 placeholder-brand-dark/40 dark:placeholder-brand-light/40 leading-relaxed transition-colors"
               :placeholder="t('detail.notes_placeholder')"
            ></textarea>
            <div class="mt-4 text-xs text-brand-dark/40 dark:text-brand-light/40 text-right font-mono">
               {{ t('detail.last_updated') }}: {{ app.updated_at ? new Date(app.updated_at).toLocaleString() : 'Never' }}
            </div>
         </div>
      </div>
    </div>
    
    <!-- Loader handled globally -->
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
    }
};

const { ask } = useConfirm();

const handleDelete = async () => {
    if (await ask(t('confirm.delete_app') || 'Are you sure you want to delete this entire application?', 'Delete Application')) {
        await deleteApplication(appId);
        router.push('/applications');
    }
};

const seed = async () => {
   await seedTemplate(appId);
};
</script>
