<template>
  <div class="min-h-screen transition-colors duration-300 dark:bg-slate-900 bg-gray-50">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { initTheme } = useTheme();
const { initLocale } = useTranslation();

onMounted(() => {
  initTheme();
  initLocale();
});
</script>
