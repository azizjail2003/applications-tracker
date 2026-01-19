<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    <div class="glass-card p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300 dark:bg-white/5 bg-white shadow-sm border border-gray-100 dark:border-white/10">
      <div class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{{ t('dashboard.total_apps') }}</div>
      <div class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-400 dark:from-white dark:to-gray-400">{{ total }}</div>
    </div>
    <div class="glass-card p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300 dark:bg-white/5 bg-white shadow-sm border border-gray-100 dark:border-white/10">
      <div class="text-xs font-bold text-blue-400 dark:text-blue-300 uppercase tracking-widest mb-2">{{ t('dashboard.in_progress') }}</div>
      <div class="text-4xl font-bold text-blue-500 dark:text-blue-400 dark:drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">{{ inProgress }}</div>
    </div>
    <div class="glass-card p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300 dark:bg-white/5 bg-white shadow-sm border border-gray-100 dark:border-white/10">
      <div class="text-xs font-bold text-emerald-500 dark:text-emerald-300 uppercase tracking-widest mb-2">{{ t('dashboard.accepted') }}</div>
      <div class="text-4xl font-bold text-emerald-500 dark:text-emerald-400 dark:drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">{{ accepted }}</div>
    </div>
    <div class="glass-card p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300 dark:bg-white/5 bg-white shadow-sm border border-gray-100 dark:border-white/10">
      <div class="text-xs font-bold text-rose-400 dark:text-rose-300 uppercase tracking-widest mb-2">{{ t('dashboard.rejected') }}</div>
      <div class="text-4xl font-bold text-rose-500 dark:text-rose-400 dark:drop-shadow-[0_0_10px_rgba(251,113,133,0.5)]">{{ rejected }}</div>
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
