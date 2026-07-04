import { type FrameQueueEntry } from "./utils.ts";
type Data = {
    _frames: Record<string, string>;
} & Record<string, any>;
type Snapshot = {
    timestamp: string;
    data: Data;
};
export declare const emptyData: Data;
export declare let _history: Snapshot[];
export declare let _index: number;
export declare let max: number;
export declare const SaveType: {
    AUTO: number;
    LOCAL: number;
    FILE: number;
};
/**
 * Initializes the state
 *
 * Called once on page load.
 * Should be called after userscripts are loaded.
 */
export declare function init(): void;
declare const _default: {
    init: typeof init;
};
export default _default;
/**
 * Gets the state from the history at the specified index. Defaults to the current state
 */
export declare function getState(index?: number): Snapshot;
/**
 * Jumps to a specific state in history.
 * @param target positive jumps forward, negative jumps backwards
 * @returns
 */
export declare function jump(target: number): void;
/**
 * Pushes a new state onto the history stack, trimming the stack as needed.
 */
export declare function push(data: Data, frames?: Map<string, FrameQueueEntry>): void;
/**
 * Saves the state to the current moment in history.
 * @param data
 */
export declare function saveState(data: Data): void;
export declare function saveFrames(frames: Record<string, string>): void;
/**
 * Overwrites the current state with updated frames.
 *
 * This is needed because a frame render can cause other frames
 * to change or be intialized. Meaning that the snapshot created by a single push()
 * does not automatically reflect what the player can currently *see*.
 * @param frames frames to be updated
 */
export declare function updateFrames(frames?: Map<string, FrameQueueEntry>): void;
/**
 * Creates a snapshot with a given data set.
 */
export declare function createSnapshot(data?: Data): Snapshot;
/**
 * Loads in the save from the given data
 */
export declare function load(encodedData?: string): void;
/**
 * Retrieves a save stored in localstorage
 * @param index
 * @returns
 */
export declare function getLocalSave(index?: number): string | undefined;
/**
 * Creates a save and stores it in localstorage
 * @param history
 * @param current
 * @param index which save slot to use
 */
export declare function setLocalSave(history: any, current: number, index?: number, title?: string): {
    history: any;
    index: number;
    version: any;
    timestamp: string;
    title: string | undefined;
};
/**
 * Gets the string to use as the localstorage save key
 * @param index save slot
 * @returns
 */
export declare function localSaveLocation(index?: number): string;
