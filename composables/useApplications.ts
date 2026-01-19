import type { Application, ChecklistItem, Recommender } from '~/types';

export const useApplications = () => {
    const api = useApi();
    const applications = useState<Application[]>('applications', () => []);
    const checklistItems = useState<ChecklistItem[]>('checklistItems', () => []);
    const recommenders = useState<Recommender[]>('recommenders', () => []);
    const loading = useState<boolean>('loading', () => false);

    const fetchAll = async () => {
        loading.value = true;
        const apps = await api.get<Application[]>('listApplications');
        if (apps) applications.value = apps;
        loading.value = false;
    };

    const fetchDetails = async (appId: string) => {
        loading.value = true;
        const [cl, recs] = await Promise.all([
            api.get<ChecklistItem[]>('listChecklist', { application_id: appId }),
            api.get<Recommender[]>('listRecommenders', { application_id: appId })
        ]);

        if (cl) checklistItems.value = cl;
        if (recs) recommenders.value = recs;

        // Ensure we have the app in our list too, or fetch it if needed (optimization)
        if (!applications.value.find(a => a.id === appId)) {
            const app = await api.get<Application>('getApplication', { id: appId });
            if (app) applications.value.push(app);
        }
        loading.value = false;
    };

    const upsertApplication = async (app: Application) => {
        // Optimistic update
        const index = applications.value.findIndex(a => a.id === app.id);
        if (index >= 0) {
            applications.value[index] = { ...app, updated_at: new Date().toISOString() };
        } else {
            applications.value.push({ ...app, updated_at: new Date().toISOString() });
        }

        const res = await api.post<Application>('upsertApplication', { data: app });
        // Revert or update with server response if needed
        if (res) {
            // update with validated data
            const idx = applications.value.findIndex(a => a.id === res.id);
            if (idx >= 0) applications.value[idx] = res;
        }
    };

    const deleteApplication = async (id: string) => {
        applications.value = applications.value.filter(a => a.id !== id);
        await api.post('deleteApplication', { id });
    };

    // Checklist Learning
    const knownChecklistItems = useState<Set<string>>('knownChecklistItems', () => new Set());

    const initKnownItems = async () => {
        // 1. Load from local storage (fast)
        if (import.meta.client) {
            const stored = localStorage.getItem('msc_tracker_known_items');
            if (stored) {
                try {
                    const items = JSON.parse(stored);
                    items.forEach((i: string) => knownChecklistItems.value.add(i));
                } catch (e) { console.error(e); }
            }
        }

        // 2. Fetch from backend (comprehensive) - triggers only once per session ideally
        // We can check if we likely have data, or just fetch always in background
        try {
            const allItems = await api.get<ChecklistItem[]>('listChecklist');
            if (allItems && Array.isArray(allItems)) {
                allItems.forEach(i => {
                    if (i.item && i.item.trim()) {
                        addKnownItem(i.item); // This naturally dedupes and saves to local storage
                    }
                });
            }
        } catch (e) {
            // Silently fail if API not updated yet or network error, 
            // suggestions just won't be as good.
            console.warn('Could not fetch global checklist history', e);
        }
    };

    const addKnownItem = (item: string) => {
        if (!item || !item.trim()) return;
        const clean = item.trim();
        if (!knownChecklistItems.value.has(clean)) {
            knownChecklistItems.value.add(clean);
            if (import.meta.client) {
                localStorage.setItem('msc_tracker_known_items', JSON.stringify(Array.from(knownChecklistItems.value)));
            }
        }
    };

    // Checklist
    const upsertChecklistItem = async (item: ChecklistItem) => {
        const index = checklistItems.value.findIndex(i => i.id === item.id);
        const newItem = { ...item, updated_at: new Date().toISOString() };

        if (index >= 0) checklistItems.value[index] = newItem;
        else checklistItems.value.push(newItem);

        // Learn
        addKnownItem(item.item);

        await api.post('upsertChecklistItem', { data: item });
    };

    const deleteChecklistItem = async (id: string) => {
        checklistItems.value = checklistItems.value.filter(i => i.id !== id);
        await api.post('deleteChecklistItem', { id });
    };

    // Recommenders
    const upsertRecommender = async (rec: Recommender) => {
        const index = recommenders.value.findIndex(r => r.id === rec.id);
        const newRec = { ...rec, updated_at: new Date().toISOString() };

        if (index >= 0) recommenders.value[index] = newRec;
        else recommenders.value.push(newRec);

        await api.post('upsertRecommender', { data: rec });
    };

    const deleteRecommender = async (id: string) => {
        recommenders.value = recommenders.value.filter(r => r.id !== id);
        await api.post('deleteRecommender', { id });
    };

    const seedTemplate = async (appId: string) => {
        // Create default items
        const items: string[] = ['SOP', 'CV', 'Transcript', 'Passport', 'IELTS', 'Photo'];
        const rids = [crypto.randomUUID(), crypto.randomUUID()];

        const newChecklist = items.map(name => ({
            id: crypto.randomUUID(),
            application_id: appId,
            item: name,
            state: 'missing' as const
        }));

        // Optimistic
        checklistItems.value.push(...newChecklist);
        // Note: Bulk API would be better, but loop for now or custom action
        // We'll use a loop in background
        newChecklist.forEach(i => upsertChecklistItem(i));
    };

    const recalculateProgress = (appId: string) => {
        const items = checklistItems.value.filter(i => i.application_id === appId);
        if (items.length === 0) return; // Do not touch progress if no items (or maybe set to 0?)

        // Logic: (Ready + Uploaded) / (Total - NotRequired)
        // If Total - NotRequired == 0, then 100% if all are NotRequired? Or 0?
        // Let's say if all are NotRequired, progress is 100% (done).

        const effectiveItems = items.filter(i => i.state !== 'not_required');
        const doneItems = effectiveItems.filter(i => i.state === 'ready' || i.state === 'uploaded');

        let progress = 0;
        if (effectiveItems.length === 0) {
            // If we have items but all are not_required, consider it done (100) or 0? 
            // Let's say 0 to be safe unless user overrides.
            // Actually, if I have 5 items and all are not required, I am effectively ready to submit.
            progress = items.length > 0 ? 100 : 0;
        } else {
            progress = Math.round((doneItems.length / effectiveItems.length) * 100);
        }

        const app = applications.value.find(a => a.id === appId);
        if (app) {
            app.progress = progress;
        }
    };

    return {
        applications,
        checklistItems,
        recommenders,
        loading,
        fetchAll,
        fetchDetails,
        upsertApplication,
        deleteApplication,
        upsertChecklistItem,
        deleteChecklistItem,
        upsertRecommender,
        deleteRecommender,
        seedTemplate,
        recalculateProgress,
        knownChecklistItems,
        initKnownItems
    };
};
