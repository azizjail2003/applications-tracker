export const useReadOnly = () => {
    const isReadOnly = useState<boolean>('isReadOnly', () => false);

    const initReadOnly = () => {
        if (import.meta.client) {
            const saved = localStorage.getItem('msc_readonly');
            isReadOnly.value = saved === 'true';
        }
    };

    const setReadOnly = (value: boolean) => {
        isReadOnly.value = value;
        if (import.meta.client) {
            localStorage.setItem('msc_readonly', String(value));
        }
    };

    return {
        isReadOnly,
        initReadOnly,
        setReadOnly
    };
};
