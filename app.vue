<template>
  <div class="min-h-screen bg-brand-light dark:bg-brand-dark text-brand-dark dark:text-brand-light transition-colors duration-500 font-sans selection:bg-brand-teal selection:text-white">
    <AppHeader />
    <main class="container mx-auto px-4 py-8">
      <NuxtPage />
    </main>
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
  useUser().initUser();
  useReadOnly().initReadOnly();
});
</script>
