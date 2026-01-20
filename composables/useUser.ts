export const useUser = () => {
    const userName = useState<string>('userName', () => '');

    const initUser = () => {
        if (import.meta.client) {
            const saved = localStorage.getItem('msc_user_name');
            if (saved) {
                userName.value = saved;
            }
        }
    };

    const setUserName = (name: string) => {
        userName.value = name;
        if (import.meta.client) {
            localStorage.setItem('msc_user_name', name);
        }
    };

    return {
        userName,
        initUser,
        setUserName
    };
};
