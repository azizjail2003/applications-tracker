export const useDate = () => {
    const { locale } = useTranslation();

    const formatDate = (date: string | Date | undefined | null, options: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }) => {
        if (!date) return 'N/A';
        const d = new Date(date);
        if (isNaN(d.getTime())) return 'N/A';

        return new Intl.DateTimeFormat(locale.value, options).format(d);
    };

    return { formatDate };
};
