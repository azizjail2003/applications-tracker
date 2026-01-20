export const useDate = () => {
    const { locale } = useTranslation();

    const formatDate = (date: string | Date | undefined | null, options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }) => {
        if (!date) return 'N/A';
        const d = new Date(date);
        if (isNaN(d.getTime())) return 'N/A';

        return new Intl.DateTimeFormat(locale.value, options).format(d);
    };

    const toValueDate = (date: string | undefined | null) => {
        if (!date) return '';
        // If it's already YYYY-MM-DD, return it
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

        const d = new Date(date);
        if (isNaN(d.getTime())) return '';

        // Return YYYY-MM-DD safely
        return d.toISOString().split('T')[0];
    };

    return { formatDate, toValueDate };
};
