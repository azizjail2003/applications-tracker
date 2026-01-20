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
      <div v-if="modelValue" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-brand-dark/60 backdrop-blur-md transition-opacity" @click="$emit('update:modelValue', false)"></div>
        
        <!-- Modal -->
        <div 
          class="relative w-full max-w-lg overflow-hidden rounded-2xl border border-brand-light/10 bg-brand-dark/95 shadow-2xl ring-1 ring-black/5 dark:bg-brand-dark/95 dark:border-brand-light/20"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-brand-teal/5 to-transparent pointer-events-none"></div>

          <div class="relative p-8 text-center">
            <!-- Icon -->
            <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-light/5 ring-1 ring-brand-light/10">
              <span class="text-3xl">✨</span>
            </div>

            <h3 class="text-2xl font-bold text-brand-light mb-2 tracking-tight">Share Access</h3>
            <p class="text-brand-light/70 text-sm mb-6 max-w-xs mx-auto">Send this magic link to anyone you want to share your tracker database with.</p>

            <!-- Name Input -->
            <div class="mb-4 text-left">
                <label class="text-[10px] uppercase font-bold text-brand-light/40 mb-1 block pl-1">Your Name (Optional)</label>
                <input 
                    v-model="name" 
                    placeholder="e.g. Aziz" 
                    class="w-full bg-brand-light/5 border border-brand-light/10 rounded-xl px-4 py-2 text-sm text-brand-light placeholder-brand-light/30 focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all"
                />
            </div>

            <!-- Link Input -->
            <div class="relative group mb-6">
                <div class="absolute inset-0 bg-brand-teal/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div class="relative flex items-center gap-2 p-1.5 bg-brand-light/5 border border-brand-light/10 rounded-xl">
                    <input 
                        :value="finalLink" 
                        readonly 
                        class="w-full bg-transparent border-none text-xs text-brand-light/60 font-mono px-3 focus:ring-0 truncate"
                        @click="selectInput"
                    />
                    <button 
                        @click="copy" 
                        class="flex-shrink-0 px-4 py-2 rounded-lg font-bold text-xs transition-all flex items-center gap-2"
                        :class="copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-brand-teal text-white hover:bg-white hover:text-brand-dark'"
                    >
                        <span v-if="copied">Copied!</span>
                        <span v-else>Copy Link</span>
                    </button>
                </div>
            </div>

            <button 
                @click="$emit('update:modelValue', false)"
                class="px-6 py-2 rounded-xl font-bold text-xs text-brand-light/40 hover:text-brand-light transition-all"
            >
                Close
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  baseUrl: string;
}>();

defineEmits(['update:modelValue']);

const name = ref('');
const copied = ref(false);

// Initialize name from localStorage check if possible, or leave empty
onMounted(() => {
    name.value = localStorage.getItem('msc_user_name') || '';
});

// Update localStorage when name changes
watch(name, (val) => {
    localStorage.setItem('msc_user_name', val);
});

const finalLink = computed(() => {
    let url = `${window.location.origin}/setup?import=${encodeURIComponent(props.baseUrl)}`;
    if (name.value.trim()) {
        url += `&name=${encodeURIComponent(name.value.trim())}`;
    }
    return url;
});

const copy = async () => {
    try {
        await navigator.clipboard.writeText(finalLink.value);
        copied.value = true;
        setTimeout(() => copied.value = false, 2000);
    } catch (err) {
        alert('Failed to copy. Please select and copy manually.');
    }
};

const selectInput = (event: Event) => {
    (event.target as HTMLInputElement).select();
};
</script>
