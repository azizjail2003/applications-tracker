
export const useConfirm = () => {
    const isVisible = useState<boolean>('confirm_visible', () => false);
    const message = useState<string>('confirm_message', () => '');
    const title = useState<string>('confirm_title', () => 'Confirm Action');
    const type = useState<'confirm' | 'info' | 'success' | 'error'>('confirm_type', () => 'confirm');

    const promiseState = useState<any>('confirm_promise', () => ({
        resolve: null as ((value: boolean) => void) | null
    }));

    const ask = (msg: string, titleText: string = 'Confirm Action'): Promise<boolean> => {
        message.value = msg;
        title.value = titleText;
        type.value = 'confirm';
        isVisible.value = true;

        return new Promise((resolve) => {
            promiseState.value.resolve = resolve;
        });
    };

    const notify = (msg: string, titleText: string = 'Notice', variant: 'success' | 'error' | 'info' = 'info') => {
        message.value = msg;
        title.value = titleText;
        type.value = variant;
        isVisible.value = true;
    };

    const respond = (answer: boolean) => {
        isVisible.value = false;
        if (promiseState.value.resolve) {
            promiseState.value.resolve(answer);
            promiseState.value.resolve = null;
        }
    };

    return {
        isVisible,
        message,
        title,
        type,
        ask,
        notify,
        respond
    };
};
