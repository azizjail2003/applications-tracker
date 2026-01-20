<template>
  <div class="min-h-screen bg-brand-light dark:bg-brand-dark text-brand-dark dark:text-brand-light transition-colors duration-500 font-sans selection:bg-brand-teal selection:text-white">
    <AppHeader />
    <main class="container mx-auto px-4 py-8 pb-20">
      <NuxtPage />
    </main>

    <!-- Footer Disclaimer -->
    <footer class="py-6 text-center border-t border-brand-dark/5 dark:border-brand-light/5 mt-auto space-y-2">
        <p class="text-xs text-brand-dark/40 dark:text-brand-light/40">
            <span class="font-bold">{{ t('footer.beta_note') }}</span> 
            {{ t('footer.contact') }} <a href="mailto:jailabdelaziz@icloud.com" class="text-brand-teal hover:underline">jailabdelaziz@icloud.com</a>
        </p>
        <p class="text-[10px] text-brand-dark/30 dark:text-brand-light/30">
            {{ t('footer.built_by') }} <a href="https://jailabdelaziz.online" target="_blank" class="hover:text-brand-teal transition-colors">Abdelaziz Jail</a>
        </p>
    </footer>
    <ConfirmModal />
    <GlobalLoader />
  </div>
</template>

<script setup lang="ts">
const { initTheme } = useTheme();
const { initLocale, t } = useTranslation();

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
