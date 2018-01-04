import { ToastOptions } from 'ng2-toastr';

export class ToastrOptions extends ToastOptions {
    positionClass = 'toast-bottom-full-width';
    toastLife = 5000;
    showCloseButton = true;
    newestOnTop = true;
    maxShown = 3;
    animate = 'fade';
}

/* 
positionClass
    toast-top-right (Default)
    toast-top-center
    toast-top-left
    toast-top-full-width
    toast-bottom-right
    toast-bottom-center
    toast-bottom-left
    toast-bottom-full-width

animate
    fade: makes every toast either fade in or fade out.
    flyLeft: makes every toast fly in from left side.
    flyRight: makes every toast fly in from right side. Defaults to 'fade'. You can set animate: null to disable animations.
*/