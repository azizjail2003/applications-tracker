export const useApi = () => {
    const config = useRuntimeConfig();
    const router = useRouter();
    const { isReadOnly } = useReadOnly();

    const getUrl = () => {
        if (import.meta.client) {
            return localStorage.getItem('msc_tracker_api_url') || config.public.apiBase;
        }
        return config.public.apiBase;
    };

    const request = async <T>(action: string, method: 'GET' | 'POST', data?: any): Promise<T | null> => {
        const url = getUrl();
        if (!url) {
            if (router.currentRoute.value.path !== '/setup') router.push('/setup');
            return null;
        }

        // GAS Trick: Always put action in URL to help routing even on POST
        const queryParams = new URLSearchParams({ action });
        if (method === 'GET' && data) {
            Object.entries(data).forEach(([key, val]) => {
                if (val !== undefined && val !== null) queryParams.append(key, String(val));
            });
        }

        const finalUrl = `${url}${url.includes('?') ? '&' : '?'}${queryParams.toString()}`;

        const options: RequestInit = {
            method,
            mode: 'cors',
            redirect: 'follow', // Crucial for GAS
        };

        if (method === 'POST') {
            options.headers = { 'Content-Type': 'text/plain;charset=utf-8' };
            options.body = JSON.stringify({ action, data });
        }

        try {
            const response = await fetch(finalUrl, options);
            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

            const json = await response.json();
            if (json.ok === false || json.status === 'error') throw new Error(json.error || json.message || 'API Error');

            // Handle both {ok: true, data: T} and { ...T }
            return (json.data !== undefined ? json.data : json) as T;
        } catch (error: any) {
            console.error(`API Call Failed (${action}):`, error);

            // Helpful Diagnostic for the user
            if (error instanceof TypeError && error.message === 'Failed to fetch') {
                const diag = "CONNECTION BLOCKED: This usually means you haven't authorized your script yet. \n\nGo to your Apps Script Editor, run 'sendTestEmail' once, and click 'Authorize'.";
                alert(diag);
                throw new Error(diag);
            }
            throw error;
        }
    };

    return {
        get: <T>(action: string, params?: any) => request<T>(action, 'GET', params),
        post: <T>(action: string, data?: any) => {
            if (isReadOnly.value) {
                alert('View Only Mode: Changes blocked.');
                throw new Error('Read Only');
            }
            return request<T>(action, 'POST', data);
        },
    };
};
