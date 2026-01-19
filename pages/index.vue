<template>
  <div>
    <AppHeader />
    <div class="container mx-auto px-6 py-8 max-w-6xl">
       <div class="mb-10 text-center md:text-left">
         <h1 class="text-4xl font-bold dark:text-white text-gray-900 mb-2 animate-float">{{ t('dashboard.welcome') }}</h1>
         <p class="dark:text-indigo-200 text-gray-600 text-lg">{{ t('dashboard.subtitle') }}</p>
       </div>
       
       <StatCards />
       
       <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
         <DueSoonList />
         
         <div class="glass-card rounded-2xl overflow-hidden">
           <div class="px-6 py-4 dark:border-b dark:border-white/10 dark:bg-white/5 border-b border-gray-100 bg-gray-50/50">
             <h2 class="text-sm font-bold dark:text-white text-gray-800 uppercase tracking-widest">🏆 {{ t('dashboard.top_priority') }}</h2>
           </div>
           <div class="divide-y dark:divide-white/5 divide-gray-100">
             <NuxtLink 
               v-for="app in priorityApps"
               :key="app.id"
               :to="`/applications/${app.id}`"
               class="block px-6 py-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
             >
                <div class="flex justify-between items-center mb-2">
                  <div>
                     <div class="text-sm font-bold dark:text-white text-gray-900 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{{ app.university }}</div>
                     <div class="text-xs text-gray-500 dark:text-gray-400">{{ app.program }}</div>
                  </div>
                  <StatusBadge :status="app.status" />
                </div>
                <div class="mt-2">
                   <div class="flex justify-between text-[10px] text-gray-500 mb-1 uppercase tracking-wider">
                      <span>{{ t('dashboard.progress') || 'Progress' }}</span>
                      <span class="text-indigo-600 dark:text-indigo-300">{{ app.progress }}%</span>
                   </div>
                   <ProgressBar :percent="app.progress" />
                </div>
             </NuxtLink>
             <div v-if="priorityApps.length === 0" class="p-8 text-sm text-gray-400 text-center italic">
                {{ t('dashboard.no_priority') }}
             </div>
           </div>
         </div>
       </div>
       
       <div class="mt-12 text-center">
          <NuxtLink to="/applications" class="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95">
             {{ t('dashboard.view_all') }}
          </NuxtLink>
       </div>
     </div>
  </div>
</template>

<script setup lang="ts">
const { applications, fetchAll } = useApplications();
const { t } = useTranslation();

onMounted(() => {
  fetchAll();
});

const priorityApps = computed(() => {
  return applications.value
    .filter(a => a.status === 'In progress' || a.status === 'Draft')
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 5);
});
</script>
