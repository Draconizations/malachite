export interface FrameQueueEntry {
    passage: string;
    doTransition: boolean;
    pushToState: boolean;
}
export declare function getAttribute(el: Element | null, attr: string): string | null;
/**
 * Loop through all frames in the queue. We queue them because otherwise
 * x-link with a goto in the event listener will push two separate states to the history
 * and we don't want that.
 * @param pushToHistory to push the frame changes to history or not
 * @param clearQueue to clear the queue after or not
 * @param frameQueue the queue itself
 */
export declare function runFrameQueue(pushToHistory: boolean, clearQueue: boolean, frameQueue: Map<string, FrameQueueEntry>): void;
