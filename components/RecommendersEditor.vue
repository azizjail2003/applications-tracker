<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wide">Recommenders</h3>
      <button @click="add" class="text-xs text-indigo-300 font-bold hover:text-white transition-colors bg-white/5 px-2 py-1 rounded hover:bg-white/10">+ ADD PERSON</button>
    </div>

    <div v-if="items.length === 0" class="text-sm text-gray-500 italic text-center py-4 bg-white/5 rounded-xl border border-dashed border-white/10">
       No recommenders added.
    </div>

    <div 
      v-for="item in items" 
      :key="item.id" 
      class="p-4 bg-white/5 border border-white/5 rounded-xl group hover:bg-white/10 hover:border-white/10 transition-all duration-300 space-y-3"
    >
      <div class="flex items-start gap-3">
        <div class="flex-1 space-y-2">
          <input 
            v-model="item.name" 
            @blur="save(item)"
            class="block w-full text-sm font-bold text-white placeholder-gray-500 bg-transparent border-none p-0 focus:ring-0 transition-colors"
            placeholder="Recommender Name"
          />
          <input 
            v-model="item.email" 
            @blur="save(item)"
            class="block w-full text-xs text-indigo-300 placeholder-gray-600 bg-transparent border-none p-0 focus:ring-0 transition-colors"
            placeholder="Email Address"
          />
        </div>
        <button @click="remove(item.id, item.name)" class="text-gray-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
           <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
      <div class="flex items-center gap-2 pt-3 border-t border-white/5">
        <select 
          v-model="item.state" 
          @change="save(item)"
          class="text-xs border-none bg-white/5 rounded px-2 py-1 text-gray-300 focus:ring-0 cursor-pointer hover:bg-white/10 transition-colors"
        >
          <option value="not_asked">Not Asked</option>
          <option value="asked">Asked</option>
          <option value="submitted">Submitted</option>
        </select>
        
        <div class="flex items-center ml-auto gap-2">
           <span class="text-[10px] text-gray-500 uppercase font-bold">Last Nudge:</span>
           <input 
             type="date" 
             v-model="item.last_nudge_date" 
             @blur="save(item)"
             class="text-xs text-indigo-300 border-none bg-transparent p-0 focus:ring-0 w-24 text-right [color-scheme:dark]"
           />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recommender } from '~/types';

const props = defineProps<{
  appId: string;
}>();

const { recommenders, upsertRecommender, deleteRecommender } = useApplications();
const { ask } = useConfirm();
const items = computed(() => recommenders.value.filter(r => r.application_id === props.appId));

const add = async () => {
  const newItem: Recommender = {
    id: crypto.randomUUID(),
    application_id: props.appId,
    name: '',
    email: '',
    state: 'not_asked'
  };
  await upsertRecommender(newItem);
};

const remove = async (id: string, name: string) => {
  if (await ask(`Are you sure you want to delete recommender "${name || 'Unnamed'}"?`, 'Delete Recommender')) {
    await deleteRecommender(id);
  }
};

const save = async (item: Recommender) => {
  if (item.name.trim()) {
    await upsertRecommender(item);
  }
};
</script>
