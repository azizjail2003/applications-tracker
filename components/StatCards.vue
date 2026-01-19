<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    <div class="glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-brand-dark/20 dark:hover:border-brand-light/20 transition-all">
      <div class="text-xs font-bold text-brand-dark/60 dark:text-brand-light/60 uppercase tracking-widest mb-4 flex justify-between items-center">
        {{ t('dashboard.total_apps') }}
        <span class="w-2 h-2 rounded-full bg-brand-dark dark:bg-brand-light"></span>
      </div>
      <div class="text-4xl font-bold text-brand-dark dark:text-brand-light">{{ total }}</div>
    </div>
    
    <div class="glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-brand-teal/50 transition-all">
      <div class="text-xs font-bold text-brand-teal dark:text-cyan-200 uppercase tracking-widest mb-4 flex justify-between items-center">
        {{ t('dashboard.in_progress') }}
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
      <div class="text-4xl font-bold text-brand-teal dark:text-cyan-200">{{ inProgress }}</div>
    </div>
    
    <div class="glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-emerald-500/50 transition-all dark:bg-emerald-900/10 bg-emerald-50/50">
      <div class="text-xs font-bold text-emerald-600 dark:text-emerald-300 uppercase tracking-widest mb-4 flex justify-between items-center">
        {{ t('dashboard.accepted') }}
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
      <div class="text-4xl font-bold text-emerald-600 dark:text-emerald-300">{{ accepted }}</div>
    </div>
    
    <div class="glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-rose-500/50 transition-all dark:bg-rose-900/10 bg-rose-50/50">
      <div class="text-xs font-bold text-rose-600 dark:text-rose-300 uppercase tracking-widest mb-4 flex justify-between items-center">
        {{ t('dashboard.rejected') }}
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
      <div class="text-4xl font-bold text-rose-600 dark:text-rose-300">{{ rejected }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { applications } = useApplications();
const { t } = useTranslation();

const total = computed(() => applications.value.length);
const inProgress = computed(() => applications.value.filter(a => ['In progress', 'Interview', 'Submitted'].includes(a.status)).length);
const accepted = computed(() => applications.value.filter(a => a.status === 'Accepted').length);
const rejected = computed(() => applications.value.filter(a => a.status === 'Rejected').length);
</script>
