import type { ApiResponse } from '~/types';

export const useApi = () => {
    const request = async <T>(action: string, method: 'GET' | 'POST' = 'GET', payload?: any): Promise<T | null> => {
        // Dynamic API URL from localStorage (for multi-user/Vercel)
        let currentApiBase = '';
        if (import.meta.client) {
            currentApiBase = localStorage.getItem('msc_tracker_api_url') || '';
        }

        // If still no URL, redirect to setup
        if (!currentApiBase) {
            if (import.meta.client && window.location.pathname !== '/setup') {
                window.location.href = '/setup';
            }
            return null;
        }

        try {
            const opts: any = {
                method,
            };

            let url = `${currentApiBase}?action=${action}`;

            if (method === 'GET' && payload) {
                // Append query params
                const params = new URLSearchParams(payload).toString();
                url += `&${params}`;
            } else if (method === 'POST') {
                // Apps Script CORS hack:
                // We MUST send Content-Type: text/plain to avoid OPTIONS preflight request which Apps Script does not handle.
                // The body is still JSON stringified, but browser thinks it is text.
                opts.headers = {
                    'Content-Type': 'text/plain;charset=utf-8'
                };
                opts.body = JSON.stringify({ action, ...payload });
            }

            const res = await $fetch<ApiResponse<T>>(url, opts);

            if (res && res.ok) {
                return res.data as T;
            } else {
                console.error('API Error:', res?.error);
                // If error suggests auth or invalid script, maybe prompt setup again? 
                // For now just throw.
                return null;
            }
        } catch (e) {
            console.error('Request failed', e);
            return null;
        }
    };

    return {
        get: <T>(action: string, params?: any) => request<T>(action, 'GET', params),
        post: <T>(action: string, data?: any) => request<T>(action, 'POST', data),
    };
};
