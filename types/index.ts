export type ApplicationStatus = 'Draft' | 'In progress' | 'Submitted' | 'Interview' | 'Accepted' | 'Rejected' | 'Waitlist' | 'Withdrawn';

export interface Application {
    id: string;
    university: string;
    program: string;
    country: string;
    status: ApplicationStatus;
    deadline_app: string; // YYYY-MM-DD
    deadline_scholarship?: string; // YYYY-MM-DD
    portal_apply_url?: string;
    portal_status_url?: string;
    progress: number; // 0-100
    priority: number; // 1-5
    notes?: string;
    updated_at?: string;
}

export type ChecklistState = 'missing' | 'ready' | 'uploaded' | 'not_required';

export interface ChecklistItem {
    id: string;
    application_id: string;
    item: string;
    state: ChecklistState;
    link?: string;
    updated_at?: string;
}

export type RecommenderState = 'not_asked' | 'asked' | 'submitted';

export interface Recommender {
    id: string;
    application_id: string;
    name: string;
    email: string;
    state: RecommenderState;
    last_nudge_date?: string; // YYYY-MM-DD
    updated_at?: string;
}

export interface ApiResponse<T> {
    ok: boolean;
    data?: T;
    error?: string;
}
