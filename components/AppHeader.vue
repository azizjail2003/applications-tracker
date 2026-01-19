<template>
  <header class="glass sticky top-4 z-50 mx-4 mt-4 rounded-2xl dark:bg-slate-900/60 bg-white/60 dark:border-white/10 border-gray-200">
    <div class="container mx-auto px-6 h-16 flex justify-between items-center">
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <div class="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg shadow-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
           <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <span class="font-bold dark:text-white text-slate-800 tracking-widest text-lg">MSc<span class="text-indigo-500">TRACKER</span></span>
      </NuxtLink>
      
      <div class="flex items-center gap-4">
        <nav class="flex gap-1 dark:bg-white/5 bg-gray-100/50 rounded-full p-1 backdrop-blur-md dark:border-white/10 border-gray-200/50">
          <NuxtLink 
            to="/" 
            class="px-4 py-1.5 rounded-full text-sm font-medium dark:text-gray-400 text-gray-500 hover:text-indigo-600 dark:hover:text-white transition-all duration-300"
            active-class="dark:bg-indigo-600/20 bg-white shadow-sm dark:text-indigo-300 text-indigo-600 dark:shadow-inner"
          >
            {{ t('nav.dashboard') }}
          </NuxtLink>
          <NuxtLink 
            to="/applications" 
            class="px-4 py-1.5 rounded-full text-sm font-medium dark:text-gray-400 text-gray-500 hover:text-indigo-600 dark:hover:text-white transition-all duration-300"
            active-class="dark:bg-indigo-600/20 bg-white shadow-sm dark:text-indigo-300 text-indigo-600 dark:shadow-inner"
          >
            {{ t('nav.applications') }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-2 pl-4 border-l dark:border-white/10 border-gray-200">
           <!-- Lang Switcher -->
           <button @click="toggleLang" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors font-bold text-xs dark:text-gray-300 text-gray-600">
             {{ locale.toUpperCase() }}
           </button>
           
           <!-- Theme Toggle -->
           <button @click="toggleTheme" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
              <svg v-if="isDark" class="w-5 h-5 text-yellow-400 group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <svg v-else class="w-5 h-5 text-indigo-600 group-hover:-rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
           </button>
           
           <NuxtLink to="/setup" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-gray-400 hover:text-indigo-500" :title="t('nav.setup')">
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
