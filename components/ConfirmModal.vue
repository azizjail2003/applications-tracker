<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isVisible" class="fixed inset-0 z-[60] flex items-center justify-center bg-brand-dark/80 backdrop-blur-sm p-4">
        <div 
          class="bg-white dark:bg-brand-dark border border-brand-dark/10 dark:border-brand-light/10 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all scale-100"
          @click.stop
        >
          <div class="p-6">
            <h3 class="text-xl font-bold text-brand-dark dark:text-brand-light mb-2">{{ title }}</h3>
            <p class="text-brand-dark/70 dark:text-brand-light/70">{{ message }}</p>
          </div>
          
          <div class="bg-brand-light/20 dark:bg-white/5 px-6 py-4 flex justify-end gap-3">
            <button 
              @click="respond(false)" 
              class="px-4 py-2 rounded-xl text-sm font-bold text-brand-dark/60 dark:text-brand-light/60 hover:bg-brand-dark/5 dark:hover:bg-brand-light/10 transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="respond(true)" 
              class="px-6 py-2 rounded-xl text-sm font-bold bg-brand-teal text-white shadow-lg hover:shadow-xl hover:bg-brand-dark transition-all transform active:scale-95"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const { isVisible, message, title, respond } = useConfirm();
</script>
