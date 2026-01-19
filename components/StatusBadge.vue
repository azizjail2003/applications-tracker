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
    case 'Draft': return 'bg-gray-500/10 text-gray-300 border-gray-500/20 shadow-[0_0_5px_rgba(156,163,175,0.3)]';
    case 'In progress': return 'bg-blue-500/10 text-blue-300 border-blue-500/20 shadow-[0_0_8px_rgba(59,130,246,0.5)]';
    case 'Submitted': return 'bg-amber-500/10 text-amber-300 border-amber-500/20 shadow-[0_0_8px_rgba(245,158,11,0.5)]';
    case 'Interview': return 'bg-purple-500/10 text-purple-300 border-purple-500/20 shadow-[0_0_8px_rgba(168,85,247,0.5)]';
    case 'Accepted': return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.6)]';
    case 'Rejected': return 'bg-rose-500/10 text-rose-300 border-rose-500/20 shadow-[0_0_5px_rgba(244,63,94,0.4)]';
    default: return 'bg-gray-500/10 text-gray-300 border-gray-500/20';
  }
});
</script>
