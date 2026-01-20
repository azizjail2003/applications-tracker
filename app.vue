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

useSeoMeta({
  title: 'MSc Application Tracker',
  titleTemplate: '%s - MSc Application Tracker',
  description: 'Track your Master\'s degree applications, deadlines, and recommenders in one private, secure dashboard. Free and open source tool for students.',
  ogTitle: 'MSc Application Tracker',
  ogDescription: 'Organize your grad school applications with a beautiful, private dashboard. Track deadlines, checklists, and recommenders.',
  ogImage: '/og-image.png', // We stick to a default, user can add the file later
  twitterCard: 'summary_large_image',
  keywords: 'MSc application, masters degree tracker, grad school planner, university application organizer, education tools',
  author: 'Abdelaziz Jail',
  themeColor: '#0d9488' // brand-teal
});

</script>
