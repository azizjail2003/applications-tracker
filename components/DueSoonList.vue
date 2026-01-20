<template>
  <div class="glass-card rounded-2xl overflow-hidden flex flex-col h-full">
    <div class="px-6 py-4 border-b border-brand-dark/5 dark:border-brand-light/10 flex justify-between items-center bg-brand-dark/5 dark:bg-brand-light/5">
      <h2 class="text-sm font-bold dark:text-brand-light text-brand-dark uppercase tracking-widest flex items-center gap-2">
         <span class="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
         {{ t('dashboard.due_soon') }}
      </h2>
      <NuxtLink to="/applications" class="text-xs font-bold text-brand-dark/60 hover:text-brand-dark dark:text-brand-light/60 dark:hover:text-brand-light transition-colors">{{ t('dashboard.view_all') }}</NuxtLink>
    </div>
    
    <div v-if="dueSoon.length === 0" class="p-8 text-sm text-brand-dark/40 dark:text-brand-light/40 text-center italic flex-1 flex items-center justify-center">
      {{ t('dashboard.no_due_soon') }}
    </div>
    
    <div v-else class="divide-y divide-brand-dark/5 dark:divide-brand-light/10">
      <NuxtLink 
        v-for="app in dueSoon" 
        :key="app.id"
        :to="`/applications/${app.id}`"
        class="block px-6 py-4 hover:bg-brand-dark/5 dark:hover:bg-brand-light/5 transition-colors group"
      >
        <div class="flex justify-between items-start">
          <div>
            <div class="text-sm font-bold dark:text-brand-light text-brand-dark transition-colors">{{ app.university }}</div>
            <div class="text-xs text-brand-dark/60 dark:text-brand-light/60">{{ app.program }}</div>
          </div>
          <div class="text-right">
             <div class="text-xs font-bold text-brand-gold">
               {{ daysLeft(app.deadline_app) }} days left
             </div>
             <div class="text-[10px] text-brand-dark/40 dark:text-brand-light/40 font-mono mt-0.5">{{ formatDate(app.deadline_app) }}</div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { applications } = useApplications();
const { t } = useTranslation();
const { formatDate } = useDate();

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
