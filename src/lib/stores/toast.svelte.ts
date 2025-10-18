let toastState = $state({
    show: false,
    message: "",
    duration: 3000,
});

export function useToast() {
    return {
        get show() {
            return toastState.show;
        },
        set show(value: boolean) {
            toastState.show = value;
        },
        get message() {
            return toastState.message;
        },
        get duration() {
            return toastState.duration;
        },
        showToast(message: string, duration: number = 3000) {
            toastState.message = message;
            toastState.duration = duration;
            toastState.show = true;
        },
        hideToast() {
            toastState.show = false;
        },
    };
}
