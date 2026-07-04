interface TransitionSettings {
    applyClass: boolean;
    emitEvent: boolean;
    delay: boolean;
    bubble: boolean;
    action?: () => void;
}
export declare function doTransition(el: Element, detail: any, settings: TransitionSettings): Promise<void>;
export {};
