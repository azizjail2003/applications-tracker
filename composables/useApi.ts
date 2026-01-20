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
            console.error('API URL not configured');
            // Redirect to setup if not configured and not already there
            if (router.currentRoute.value.path !== '/setup') {
                router.push('/setup');
            }
            return null;
        }

        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'text/plain;charset=utf-8', // Google Apps Script quirk
            },
        };

        if (method === 'POST') {
            options.body = JSON.stringify({ action, ...data });
        } else {
            // For GET, we append to URL
        }

        try {
            const finalUrl = method === 'GET' ? `${url}?${new URLSearchParams({ action, ...data })}` : url;

            const response = await fetch(finalUrl, options);

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            const json = await response.json();

            if (json.status === 'error') {
                throw new Error(json.message);
            }

            return json.data as T;
        } catch (error) {
            console.error(`API Call Failed (${action}):`, error);
            throw error;
        }
    };

    const post = async <T>(action: string, data?: any): Promise<T | null> => {
        if (isReadOnly.value) {
            console.warn('Blocked mutation in Read-Only mode');
            alert('View Only Mode: You cannot make changes.');
            // Allow this to fail gracefully or just return null?
            // Throwing might break some UI that expects a result, but safety first.
            throw new Error('Read Only Mode');
        }
        return request<T>(action, 'POST', data);
    };

    return {
        get: <T>(action: string, params?: any) => request<T>(action, 'GET', params),
        post: post,
    };
};
