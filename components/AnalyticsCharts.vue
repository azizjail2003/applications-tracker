<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    
    <!-- Status Distribution (Donut Chart) -->
    <div class="glass-card p-6 rounded-2xl flex flex-col">
      <h3 class="text-xs font-bold text-brand-dark/60 dark:text-brand-light/60 uppercase tracking-widest mb-6">Application Status</h3>
      
      <div class="flex items-center justify-center gap-8">
        <!-- SVG Donut -->
        <div class="relative w-40 h-40">
          <svg viewBox="0 0 100 100" class="transform -rotate-90 w-full h-full">
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" stroke-width="20" class="text-brand-dark/5 dark:text-brand-light/5" />
            
            <!-- Segments -->
            <circle 
              v-for="(segment, index) in chartSegments" 
              :key="index"
              cx="50" cy="50" r="40" 
              fill="transparent" 
              :stroke="segment.color" 
              stroke-width="20" 
              :stroke-dasharray="`${segment.length} 251.2`" 
              :stroke-dashoffset="segment.offset"
              class="transition-all duration-1000 ease-out"
            />
          </svg>
          <!-- Center Text -->
          <div class="absolute inset-0 flex flex-col items-center justify-center">
             <span class="text-3xl font-bold text-brand-dark dark:text-brand-light">{{ total }}</span>
             <span class="text-[10px] uppercase text-brand-dark/40 dark:text-brand-light/40 font-bold">Total</span>
          </div>
        </div>

        <!-- Legend -->
        <div class="space-y-3">
           <div v-for="(segment, index) in chartSegments" :key="index" class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: segment.color }"></span>
              <div class="flex flex-col">
                 <span class="text-xs font-bold text-brand-dark dark:text-brand-light">{{ segment.label }}</span>
                 <span class="text-[10px] text-brand-dark/50 dark:text-brand-light/50">{{ segment.count }} apps ({{ Math.round(segment.percent) }}%)</span>
              </div>
           </div>
        </div>
      </div>
    </div>

    <!-- Success Timeline (Simple Funnel/Bar) -->
    <div class="glass-card p-6 rounded-2xl flex flex-col">
        <h3 class="text-xs font-bold text-brand-dark/60 dark:text-brand-light/60 uppercase tracking-widest mb-6">Success Pipeline</h3>
        
        <div class="flex-1 flex flex-col justify-center space-y-6">
            <!-- Draft -->
            <div>
               <div class="flex justify-between text-xs font-bold mb-2">
                  <span class="text-brand-dark/70 dark:text-brand-light/70">Drafting</span>
                  <span class="text-brand-dark dark:text-brand-light">{{ stats.draft }}</span>
               </div>
               <div class="h-2 w-full bg-brand-dark/5 dark:bg-brand-light/5 rounded-full overflow-hidden">
                  <div class="h-full bg-gray-400 rounded-full transition-all duration-1000" :style="{ width: `${(stats.draft / total) * 100}%` }"></div>
               </div>
            </div>

            <!-- In Progress -->
            <div>
               <div class="flex justify-between text-xs font-bold mb-2">
                  <span class="text-brand-teal">In Progress</span>
                  <span class="text-brand-teal">{{ stats.inProgress }}</span>
               </div>
               <div class="h-2 w-full bg-brand-dark/5 dark:bg-brand-light/5 rounded-full overflow-hidden">
                  <div class="h-full bg-brand-teal rounded-full transition-all duration-1000" :style="{ width: `${(stats.inProgress / total) * 100}%` }"></div>
               </div>
            </div>

            <!-- Submitted -->
            <div>
               <div class="flex justify-between text-xs font-bold mb-2">
                  <span class="text-blue-500">Submitted</span>
                  <span class="text-blue-500">{{ stats.submitted }}</span>
               </div>
               <div class="h-2 w-full bg-brand-dark/5 dark:bg-brand-light/5 rounded-full overflow-hidden">
                  <div class="h-full bg-blue-500 rounded-full transition-all duration-1000" :style="{ width: `${(stats.submitted / total) * 100}%` }"></div>
               </div>
            </div>

            <!-- Success -->
            <div>
               <div class="flex justify-between text-xs font-bold mb-2">
                  <span class="text-emerald-500">Accepted</span>
                  <span class="text-emerald-500">{{ stats.accepted }}</span>
               </div>
               <div class="h-2 w-full bg-brand-dark/5 dark:bg-brand-light/5 rounded-full overflow-hidden">
                  <div class="h-full bg-emerald-500 rounded-full transition-all duration-1000" :style="{ width: `${(stats.accepted / total) * 100}%` }"></div>
               </div>
            </div>
        </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const { applications } = useApplications();

const total = computed(() => applications.value.length || 1); // Avoid div by zero

const stats = computed(() => {
    const apps = applications.value;
    return {
        draft: apps.filter(a => a.status === 'Draft').length,
        inProgress: apps.filter(a => a.status === 'In progress').length,
        submitted: apps.filter(a => a.status === 'Submitted').length,
        interview: apps.filter(a => a.status === 'Interview').length,
        accepted: apps.filter(a => a.status === 'Accepted').length,
        rejected: apps.filter(a => a.status === 'Rejected').length,
        waitlist: apps.filter(a => a.status === 'Waitlist').length,
        withdrawn: apps.filter(a => a.status === 'Withdrawn').length,
    };
});

const chartSegments = computed(() => {
    const s = stats.value;
    const circumference = 251.2; // 2 * pi * 40
    let currentOffset = 0;

    const data = [
        { label: 'Success', count: s.accepted, color: '#10b981' }, // emerald-500
        { label: 'Active', count: s.inProgress + s.submitted + s.interview, color: '#0d9488' }, // brand-teal
        { label: 'Draft', count: s.draft, color: '#9ca3af' }, // gray-400
        { label: 'Lost', count: s.rejected + s.withdrawn, color: '#f43f5e' }, // rose-500
    ].filter(d => d.count > 0);

    return data.map(d => {
        const percent = (d.count / total.value) * 100;
        const length = (percent / 100) * circumference;
        const segment = {
            ...d,
            percent,
            length,
            offset: -currentOffset
        };
        currentOffset += length;
        return segment;
    });
});
</script>
