<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 backdrop-blur-none"
      enter-to-class="opacity-100 backdrop-blur-md"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 backdrop-blur-md"
      leave-to-class="opacity-0 backdrop-blur-none"
    >
      <div v-if="loading" class="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-brand-dark/80">
         <div class="absolute inset-0 bg-gradient-to-tr from-brand-teal/10 to-transparent pointer-events-none"></div>

         <!-- Premium Spinner -->
         <div class="relative w-24 h-24 mb-10">
            <!-- Pulsing ring -->
            <div class="absolute inset-0 rounded-full border border-brand-light/10 animate-ping opacity-20"></div>
            
            <!-- Outer Ring -->
            <div class="absolute inset-0 rounded-full border-t-2 border-brand-teal animate-spin-slow shadow-[0_0_30px_rgba(4,60,80,0.5)]"></div>
            
            <!-- Inner Ring -->
            <div class="absolute inset-3 rounded-full border-b-2 border-brand-light/30 animate-spin-reverse"></div>
            
            <!-- Center Icon -->
            <div class="absolute inset-0 flex items-center justify-center">
               <span class="text-3xl animate-pulse filter drop-shadow-[0_0_10px_rgba(238,217,190,0.5)]">✨</span>
            </div>
         </div>
         
         <!-- Text -->
         <div class="text-center relative z-10 max-w-sm px-4">
            <h3 class="text-xl font-bold text-brand-light mb-3 tracking-widest uppercase">{{ t('loading.title') }}</h3>
            <p class="text-brand-light/60 text-sm font-light tracking-wide leading-relaxed">{{ t('loading.subtitle') }}</p>
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
.animate-spin-slow {
  animation: spin 3s linear infinite;
}

.animate-spin-reverse {
  animation: spin-reverse 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}
</style>
