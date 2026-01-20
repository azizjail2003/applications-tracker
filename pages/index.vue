<template>
  <div>

    <div class="container mx-auto px-6 py-8 max-w-6xl">
      <!-- Welcome Section -->
      <div class="mb-10 text-center md:text-left">
        <h1 class="text-4xl md:text-5xl font-bold dark:text-brand-light text-brand-dark mb-3 tracking-tight flex flex-col md:flex-row items-center gap-2 justify-center md:justify-start">
           <span>{{ t('dashboard.welcome_prefix') }}</span>
           <div class="relative group">
              <span 
                v-if="!editingName" 
                @click="startEditing"
                class="text-brand-teal cursor-pointer hover:underline decoration-dashed decoration-2 underline-offset-4"
                title="Click to edit name"
              >
                {{ userName || t('dashboard.default_name') }}
              </span>
              <input 
                v-else
                ref="nameInput"
                v-model="userName"
                @blur="stopEditing"
                @keyup.enter="stopEditing"
                class="bg-transparent border-b-2 border-brand-teal text-brand-teal focus:outline-none w-48 text-center md:text-left"
                placeholder="Your Name"
              />
              <svg v-if="!editingName" class="w-4 h-4 text-brand-teal/50 absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
           </div>
           <span>!</span>
        </h1>
        <p class="text-lg dark:text-brand-light/60 text-brand-dark/60 font-light max-w-2xl">{{ t('dashboard.subtitle') }}</p>
      </div>

      <StatCards />

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Priority List (2/3 width) -->
        <div class="lg:col-span-2">
           <div class="glass-card rounded-2xl p-6 min-h-[400px]">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-bold dark:text-brand-light text-brand-dark flex items-center gap-2">
                   {{ t('dashboard.top_priority') }}
                </h2>
                <NuxtLink to="/applications" class="text-sm font-medium text-brand-teal hover:text-brand-dark dark:text-brand-light/70 dark:hover:text-brand-light transition-colors">{{ t('dashboard.view_all') }} &rarr;</NuxtLink>
              </div>

              <div class="space-y-4">
                <NuxtLink 
                  v-for="app in priorityApps" 
                  :key="app.id"
                  :to="`/applications/${app.id}`"
                  class="block p-4 rounded-xl border border-brand-dark/5 dark:border-brand-light/5 hover:bg-brand-dark/5 dark:hover:bg-brand-light/5 transition-all group"
                >
                   <div class="flex justify-between items-center mb-2">
                      <div class="flex items-center gap-3">
                         <div class="w-10 h-10 rounded-lg bg-brand-dark dark:bg-brand-light flex items-center justify-center text-lg font-bold text-brand-light dark:text-brand-dark">
                           {{ app.university.charAt(0) }}
                         </div>
                         <div>
                            <h3 class="font-bold dark:text-brand-light text-brand-dark leading-tight group-hover:underline">{{ app.university }}</h3>
                            <p class="text-xs dark:text-brand-light/60 text-brand-dark/60">{{ app.program }}</p>
                         </div>
                      </div>
                      <StatusBadge :status="app.status" />
                   </div>
                   
                   <div class="flex items-center gap-3 mt-3">
                      <div class="flex-1">
                        <ProgressBar :percent="app.progress" />
                      </div>
                      <span class="text-xs font-mono dark:text-brand-light/50 text-brand-dark/50">{{ app.progress }}%</span>
                   </div>
                </NuxtLink>
                <div v-if="priorityApps.length === 0" class="p-8 text-sm text-brand-dark/40 dark:text-brand-light/40 text-center italic">
                   {{ t('dashboard.no_priority') }}
                </div>
              </div>
           </div>
        </div>

        <!-- Sidebar (1/3 width) -->
        <div class="lg:col-span-1">
           <DueSoonList />
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { applications, fetchAll } = useApplications();
const { t } = useTranslation();
const { userName, setUserName } = useUser();

const editingName = ref(false);
const nameInput = ref<HTMLInputElement | null>(null);

const startEditing = async () => {
  editingName.value = true;
  await nextTick();
  nameInput.value?.focus();
};

const stopEditing = () => {
  editingName.value = false;
  setUserName(userName.value); // Persist
};

onMounted(() => {
  fetchAll();
});

const priorityApps = computed(() => {
  return applications.value
    .filter(a => a.status === 'In progress' || a.status === 'Draft')
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 5);
});
</script>
