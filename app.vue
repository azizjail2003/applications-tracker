<template>
  <div class="min-h-screen transition-colors duration-300 dark:bg-brand-dark bg-brand-light font-sans text-brand-dark dark:text-brand-light">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ConfirmModal />
    <GlobalLoader />
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
