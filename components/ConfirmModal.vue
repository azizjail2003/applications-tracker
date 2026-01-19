<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isVisible" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-brand-dark/60 backdrop-blur-md transition-opacity" @click="respond(false)"></div>
        
        <!-- Modal -->
        <div 
          class="relative w-full max-w-lg overflow-hidden rounded-2xl border border-brand-light/10 bg-brand-dark/95 shadow-2xl ring-1 ring-black/5 dark:bg-brand-dark/95 dark:border-brand-light/20"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-brand-teal/5 to-transparent pointer-events-none"></div>

          <div class="relative p-8 text-center">
            <!-- Icon -->
            <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-light/5 ring-1 ring-brand-light/10">
              <span class="text-3xl">🤔</span>
            </div>

            <h3 class="text-2xl font-bold text-brand-light mb-3 tracking-tight">{{ title }}</h3>
            <p class="text-brand-light/70 leading-relaxed">{{ message }}</p>

            <div class="mt-8 flex justify-center gap-4">
               <button 
                  @click="respond(false)"
                  class="px-6 py-2.5 rounded-xl font-bold text-sm text-brand-light/70 hover:text-brand-light hover:bg-brand-light/10 transition-all border border-transparent hover:border-brand-light/10"
               >
                  {{ t('confirm.cancel') }}
               </button>
               <button 
                  @click="respond(true)"
                  class="px-8 py-2.5 rounded-xl font-bold text-sm bg-brand-teal text-white shadow-lg shadow-brand-teal/20 hover:bg-brand-light hover:text-brand-dark transition-all transform hover:-translate-y-0.5 active:translate-y-0"
               >
                  {{ t('confirm.confirm') }}
               </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const { isVisible, message, title, respond } = useConfirm();
const { t } = useTranslation();
</script>
