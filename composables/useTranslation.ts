import en from '~/locales/en';
import fr from '~/locales/fr';

export const useTranslation = () => {
    const locale = useState<string>('locale', () => 'en');

    const messages: Record<string, any> = {
        en,
        fr
    };

    const t = (key: string) => {
        const keys = key.split('.');
        let value = messages[locale.value];

        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return key; // Fallback to key if missing
            }
        }

        return value;
    };

    const setLocale = (newLocale: 'en' | 'fr') => {
        locale.value = newLocale;
        localStorage.setItem('msc_locale', newLocale);
    };

    const initLocale = () => {
        if (import.meta.client) {
            const saved = localStorage.getItem('msc_locale');
            if (saved && (saved === 'en' || saved === 'fr')) {
                locale.value = saved;
            }
        }
    };

    return {
        locale,
        t,
        setLocale,
        initLocale
    };
};
