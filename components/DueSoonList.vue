<template>
  <div class="glass-card rounded-2xl overflow-hidden">
    <div class="px-6 py-4 dark:border-b dark:border-white/10 border-b border-gray-100 flex justify-between items-center dark:bg-white/5 bg-gray-50/50">
      <h2 class="text-sm font-bold dark:text-white text-gray-800 uppercase tracking-widest flex items-center gap-2">
         <span class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
         {{ t('dashboard.due_soon') }}
      </h2>
      <NuxtLink to="/applications" class="text-xs text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-white transition-colors">{{ t('dashboard.view_all') }}</NuxtLink>
    </div>
    
    <div v-if="dueSoon.length === 0" class="p-8 text-sm text-gray-400 text-center italic">
      {{ t('dashboard.no_due_soon') }}
    </div>
    
    <div v-else class="divide-y dark:divide-white/5 divide-gray-100">
      <NuxtLink 
        v-for="app in dueSoon" 
        :key="app.id"
        :to="`/applications/${app.id}`"
        class="block px-6 py-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
      >
        <div class="flex justify-between items-start">
          <div>
            <div class="text-sm font-bold dark:text-white text-gray-900 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{{ app.university }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">{{ app.program }}</div>
          </div>
          <div class="text-right">
             <div class="text-xs font-bold text-orange-500 dark:text-orange-400 animate-pulse-slow">
               {{ daysLeft(app.deadline_app) }} days left
             </div>
             <div class="text-[10px] text-gray-500">{{ app.deadline_app }}</div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { applications } = useApplications();
const { t } = useTranslation();

const dueSoon = computed(() => {
  const now = new Date();
  const limit = new Date();
  limit.setDate(now.getDate() + 14);
  
  return applications.value.filter(app => {
    if (!app.deadline_app) return false;
    const d = new Date(app.deadline_app);
    return d >= now && d <= limit && app.status !== 'Submitted' && app.status !== 'Accepted' && app.status !== 'Rejected';
  }).sort((a, b) => new Date(a.deadline_app).getTime() - new Date(b.deadline_app).getTime());
});

const daysLeft = (dateStr: string) => {
  const diff = new Date(dateStr).getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 3600 * 24));
};
</script>
