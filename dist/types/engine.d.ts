import type { FrameQueueEntry } from "./utils.ts";
export declare const version: string;
export declare const frameQueue: Map<string, FrameQueueEntry>;
/**
 * Initializes the Engine
 *
 * This is the very first thing that runs once the page is opened.
 */
export declare function init(): void;
export declare function runUserScripts(): void;
/**
 * Starts the game.
 *
 * This function is called after user scripts are ran and will respect the relevant config settings
 */
export declare function start(): Promise<void>;
/**
 * Updates the State and History, and updates Alpine.store("story") accordingly.
 *
 * **Note:** this function is (by default) automatically triggered on passage navigation, i.e. by `x-link` or
 * `Frame.goto()`. It can be called manually as well.
 */
export declare function play(frames?: Map<string, FrameQueueEntry>): void;
declare const _default: {
    init: typeof init;
    start: typeof start;
    runUserScripts: typeof runUserScripts;
};
export default _default;
