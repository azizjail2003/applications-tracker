<template>
  <header class="sticky top-0 z-50 w-full backdrop-blur-md border-b bg-brand-light/80 border-brand-dark/10 dark:bg-brand-dark/80 dark:border-brand-light/10 transition-colors duration-300">
    <div class="container mx-auto px-6 h-16 flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <div class="w-10 h-10 bg-brand-dark dark:bg-brand-light rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
           <svg class="w-6 h-6 text-brand-light dark:text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
        </div>
        <span class="font-bold text-xl tracking-tight text-brand-dark dark:text-brand-light">MSc<span class="font-light opacity-75">Tracker</span></span>
      </NuxtLink>
      
      <div class="flex items-center gap-6">
        <!-- Navigation -->
        <nav class="hidden md:flex gap-1 bg-brand-dark/5 dark:bg-brand-light/5 rounded-full p-1">
          <NuxtLink 
            to="/" 
            class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
            active-class="bg-brand-dark text-brand-light shadow-md dark:bg-brand-light dark:text-brand-dark"
            class-active="opacity-100"
            :class="[
              $route.path === '/' ? '' : 'text-brand-dark/60 hover:text-brand-dark dark:text-brand-light/60 dark:hover:text-brand-light'
            ]"
          >
            {{ t('nav.dashboard') }}
          </NuxtLink>
          <NuxtLink 
            to="/applications" 
            class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
            active-class="bg-brand-dark text-brand-light shadow-md dark:bg-brand-light dark:text-brand-dark"
            :class="[
              $route.path.startsWith('/applications') ? '' : 'text-brand-dark/60 hover:text-brand-dark dark:text-brand-light/60 dark:hover:text-brand-light'
            ]"
          >
            {{ t('nav.applications') }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-3 pl-6 border-l border-brand-dark/10 dark:border-brand-light/10 h-8">
           <!-- Lang Switcher -->
           <button @click="toggleLang" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-brand-dark/10 dark:hover:bg-brand-light/10 transition-colors font-bold text-xs text-brand-dark dark:text-brand-light">
             {{ locale.toUpperCase() }}
           </button>
           
           <!-- Theme Toggle -->
           <button @click="toggleTheme" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-brand-dark/10 dark:hover:bg-brand-light/10 transition-colors">
              <svg v-if="isDark" class="w-5 h-5 text-brand-light" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <svg v-else class="w-5 h-5 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
           </button>
           
           <NuxtLink to="/setup" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-brand-dark/10 dark:hover:bg-brand-light/10 transition-colors text-brand-dark/60 hover:text-brand-dark dark:text-brand-light/60 dark:hover:text-brand-light" :title="t('nav.setup')">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
           </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { isDark, toggleTheme } = useTheme();
const { t, locale, setLocale } = useTranslation();

const toggleLang = () => {
  setLocale(locale.value === 'en' ? 'fr' : 'en');
};
</script>
