
export const useConfirm = () => {
    const isVisible = useState<boolean>('confirm_visible', () => false);
    const message = useState<string>('confirm_message', () => '');
    const title = useState<string>('confirm_title', () => 'Confirm Action');

    // Store the resolve/reject functions for the current promise
    // We use a simple global object for this since useState isn't meant for functions
    // In a real app we might use a store, but this works for simple composition
    const promiseState = useState<any>('confirm_promise', () => ({
        resolve: null as ((value: boolean) => void) | null
    }));

    const ask = (msg: string, titleText: string = 'Confirm Action'): Promise<boolean> => {
        message.value = msg;
        title.value = titleText;
        isVisible.value = true;

        return new Promise((resolve) => {
            promiseState.value.resolve = resolve;
        });
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
        ask,
        respond
    };
};
