<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="loading" class="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-brand-dark/90 backdrop-blur-md">
         <!-- Spinner -->
         <div class="relative w-24 h-24 mb-8">
            <div class="absolute inset-0 rounded-full border-b-4 border-brand-teal animate-spin"></div>
            <div class="absolute inset-4 rounded-full border-t-4 border-brand-light/50 animate-spin-reverse"></div>
            <div class="absolute inset-0 flex items-center justify-center">
               <span class="text-2xl animate-pulse">✨</span>
            </div>
         </div>
         
         <!-- Text -->
         <div class="text-center">
            <h3 class="text-2xl font-bold text-brand-light mb-2 tracking-tight animate-pulse">{{ t('loading.title') || 'Syncing Data...' }}</h3>
            <p class="text-brand-light/50 text-sm font-mono">{{ t('loading.subtitle') || 'Please wait while we update your sheet.' }}</p>
         </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const { loading } = useApplications();
const { t } = useTranslation();
</script>

<style scoped>
.animate-spin-reverse {
  animation: spin-reverse 1.5s linear infinite;
}

@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>
