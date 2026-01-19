<template>
  <div class="w-full bg-white/10 rounded-full h-1.5 overflow-hidden backdrop-blur-sm">
    <div 
      class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-1.5 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(139,92,246,0.5)]"
      :style="{ width: Math.min(Math.max(percent, 0), 100) + '%' }"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ percent: number }>();
</script>
