<template>
  <div class="w-full bg-brand-dark/10 dark:bg-brand-light/10 rounded-full h-2 overflow-hidden">
    <div 
      class="bg-brand-dark dark:bg-brand-light h-2 rounded-full transition-all duration-500 ease-out"
      :style="{ width: Math.min(Math.max(percent, 0), 100) + '%' }"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ percent: number }>();
</script>
