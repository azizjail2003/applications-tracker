<template>
  <span :class="['px-2 py-0.5 rounded-full text-xs font-medium border', colorClass]">
    {{ status }}
  </span>
</template>

<script setup lang="ts">
import type { ApplicationStatus } from '~/types';

const props = defineProps<{ status: ApplicationStatus }>();

const colorClass = computed(() => {
  switch (props.status) {
    case 'Draft': return 'bg-brand-dark/5 text-brand-dark/50 border-brand-dark/10 dark:bg-brand-light/5 dark:text-brand-light/50 dark:border-brand-light/10';
    case 'In progress': return 'bg-brand-teal/10 text-brand-teal border-brand-teal/20 dark:bg-cyan-500/10 dark:text-cyan-200 dark:border-cyan-500/20';
    case 'Submitted': return 'bg-brand-gold/10 text-brand-gold border-brand-gold/20 dark:bg-amber-400/10 dark:text-amber-200 dark:border-amber-400/20';
    case 'Interview': return 'bg-purple-900/5 text-purple-700 border-purple-900/10 dark:bg-purple-400/10 dark:text-purple-300 dark:border-purple-400/20';
    case 'Accepted': return 'bg-emerald-900/5 text-emerald-700 border-emerald-900/10 dark:bg-emerald-400/10 dark:text-emerald-300 dark:border-emerald-400/20';
    case 'Rejected': return 'bg-rose-900/5 text-rose-700 border-rose-900/10 dark:bg-rose-400/10 dark:text-rose-300 dark:border-rose-400/20';
    default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }
});
</script>
