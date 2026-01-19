export const useTheme = () => {
    const isDark = useState<boolean>('theme', () => true);

    const toggleTheme = () => {
        isDark.value = !isDark.value;
        updateDOM();
    };

    const updateDOM = () => {
        if (import.meta.client) {
            const html = document.documentElement;
            if (isDark.value) {
                html.classList.add('dark');
                localStorage.setItem('msc_theme', 'dark');
            } else {
                html.classList.remove('dark');
                localStorage.setItem('msc_theme', 'light');
            }
        }
    };

    const initTheme = () => {
        if (import.meta.client) {
            const saved = localStorage.getItem('msc_theme');
            if (saved) {
                isDark.value = saved === 'dark';
            } else {
                isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
            updateDOM();
        }
    };

    return {
        isDark,
        toggleTheme,
        initTheme
    };
};
