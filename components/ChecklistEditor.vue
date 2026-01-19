  <div class="space-y-3">
    <div class="flex items-center justify-between mb-4">
      <div class="text-sm text-brand-dark/40 dark:text-brand-light/40 uppercase tracking-wide">Items</div>
      <button @click="add" class="text-xs text-brand-teal dark:text-brand-light/80 font-bold hover:text-brand-dark dark:hover:text-white transition-colors bg-brand-light/10 dark:bg-white/5 px-2 py-1 rounded hover:bg-brand-light/20 dark:hover:bg-white/10">+ ADD ITEM</button>
    </div>

    <!-- Smart Suggestions -->
    <div v-if="suggestions.length > 0" class="flex flex-wrap gap-2 mb-4 p-3 bg-brand-light/20 dark:bg-white/5 rounded-xl border border-brand-dark/5 dark:border-white/5">
       <span class="text-xs text-brand-dark/40 dark:text-brand-light/40 w-full mb-1 flex items-center gap-1">
         <span class="text-brand-teal">💡</span> Quick Add:
       </span>
       <button 
         v-for="sug in suggestions" 
         :key="sug"
         @click="quickAdd(sug)"
         class="px-2 py-1 rounded-lg text-xs font-medium bg-brand-teal/10 hover:bg-brand-teal text-brand-teal hover:text-white transition-colors border border-brand-teal/20"
       >
         + {{ sug }}
       </button>
    </div>

    <div v-if="items.length === 0" class="text-sm text-brand-dark/40 dark:text-brand-light/40 italic text-center py-4 bg-brand-light/5 dark:bg-white/5 rounded-xl border border-dashed border-brand-dark/10 dark:border-white/10">
       No checklist items yet. <span class="not-italic">👻</span>
    </div>

    <div 
      v-for="item in items" 
      :key="item.id" 
      class="flex items-start gap-3 p-3 bg-brand-light/10 dark:bg-white/5 border border-brand-dark/5 dark:border-white/5 rounded-xl group hover:bg-brand-light/20 dark:hover:bg-white/10 transition-all duration-300"
    >
      <!-- State Toggle -->
      <button 
        @click="cycleState(item)"
        class="mt-0.5 flex-shrink-0 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border transition-all duration-300 shadow-sm min-w-[70px] text-center"
        :class="stateStyles(item.state)"
        title="Click to change status"
      >
        {{ stateLabel(item.state) }}
      </button>

      <div class="flex-1 space-y-1">
        <!-- Item Name -->
        <input 
          v-model="item.item" 
          @blur="save(item)"
          @keyup.enter="($event.target as HTMLInputElement).blur()"
          class="block w-full text-sm font-medium dark:text-brand-light text-brand-dark placeholder-brand-dark/30 dark:placeholder-brand-light/30 bg-transparent border-none p-0 focus:ring-0 transition-colors"
          placeholder="Item name (e.g. CV)"
        />
        <!-- Link -->
        <div class="flex items-center gap-2 group/link">
           <svg class="w-3 h-3 text-brand-teal dark:text-brand-light/60 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
           <input 
             v-model="item.link" 
             @blur="save(item)"
             @keyup.enter="($event.target as HTMLInputElement).blur()"
             class="block w-full text-xs text-brand-teal dark:text-brand-light/80 placeholder-brand-dark/30 dark:placeholder-brand-light/30 bg-transparent border-none p-0 focus:ring-0 transition-colors"
             placeholder="Add link..."
           />
           <a v-if="item.link" :href="item.link" target="_blank" class="opacity-0 group-hover/link:opacity-100 text-brand-teal hover:text-brand-dark dark:hover:text-brand-light transition-colors">
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
           </a>
        </div>
      </div>

      <!-- Delete -->
      <button @click="remove(item.id)" class="text-brand-dark/30 dark:text-brand-light/30 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChecklistItem, ChecklistState } from '~/types';

const props = defineProps<{
  appId: string;
}>();

const { checklistItems, upsertChecklistItem, deleteChecklistItem, knownChecklistItems, initKnownItems } = useApplications();

onMounted(() => {
    initKnownItems();
});

const items = computed(() => checklistItems.value.filter(i => i.application_id === props.appId));

const suggestions = computed(() => {
    // Return known items that are NOT in the current list
    const currentNames = new Set(items.value.map(i => i.item.toLowerCase().trim()));
    return Array.from(knownChecklistItems.value).filter(name => !currentNames.has(name.toLowerCase().trim()));
});

const add = async () => {
  const newItem: ChecklistItem = {
    id: crypto.randomUUID(),
    application_id: props.appId,
    item: '',
    state: 'missing',
  };
  await upsertChecklistItem(newItem);
};

const quickAdd = async (name: string) => {
  const newItem: ChecklistItem = {
    id: crypto.randomUUID(),
    application_id: props.appId,
    item: name,
    state: 'missing',
  };
  await upsertChecklistItem(newItem);
};

const remove = async (id: string) => {
  if (confirm('Delete this item?')) {
    await deleteChecklistItem(id);
  }
};

const save = async (item: ChecklistItem) => {
  if (item.item.trim()) {
    await upsertChecklistItem(item);
  }
};

const cycleState = async (item: ChecklistItem) => {
  const states: ChecklistState[] = ['missing', 'ready', 'uploaded', 'not_required'];
  const idx = states.indexOf(item.state);
  item.state = states[(idx + 1) % states.length];
  await upsertChecklistItem(item);
};

const stateStyles = (state: ChecklistState) => {
  switch (state) {
    case 'missing': return 'bg-gray-100 dark:bg-white/10 dark:text-gray-400 text-gray-500 border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/20';
    case 'ready': return 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-300 border-yellow-200 dark:border-yellow-500/50 hover:bg-yellow-200 dark:hover:bg-yellow-500/30';
    case 'uploaded': return 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/50 hover:bg-emerald-200 dark:hover:bg-emerald-500/30';
    case 'not_required': return 'bg-gray-50 dark:bg-white/5 text-gray-300 border-transparent opacity-50';
    default: return 'bg-gray-100 dark:bg-white/10';
  }
};

const stateLabel = (state: ChecklistState) => {
   switch(state) {
      case 'missing': return 'Missing';
      case 'ready': return 'Ready';
      case 'uploaded': return 'Done';
      case 'not_required': return 'N/A';
   }
};
</script>
