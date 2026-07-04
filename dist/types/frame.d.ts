export interface FrameConfig {
    state?: boolean;
}
export declare const _frames: Frame[];
/**
 * Frame object. Can be configured from userscripts.
 */
export default class Frame {
    #private;
    name: string;
    state: boolean;
    get passage(): string | undefined;
    set passage(value: string | undefined);
    constructor(name: string, config?: FrameConfig);
    visible(): boolean;
}
/**
 * Creates a new Frame instance and pushes it to the frame array
 * @param name
 * @param config
 * @returns
 */
export declare function newFrame(name?: string, config?: FrameConfig): Frame;
/**
 * Gets a frame by its name. Creates a new frame if this frame isn't found.
 * @param name
 * @returns
 */
export declare function getFrame(name?: string): Frame;
/**
 * Gets all frames that match a certain predicate
 * @param predicate
 * @returns
 */
export declare function filterFrames(predicate: (f: Frame) => boolean): Frame[];
/**
 * Gets every single frame
 * @returns
 */
export declare function allFrames(): Frame[];
/**
 * Swaps the specified frame to the given passage.
 * @param passageName name of the passage to swap to
 * @param frameName name of the frame to swap
 * @param transition whether to apply the transition class or not
 * @param skip whether to skip pushing to the history or not
 */
export declare function goto(passageName: string, frameName?: string, transition?: boolean, skip?: boolean): void;
/**
 * Returns the current passage in the given frame
 * @param frame
 * @returns
 */
export declare function current(frame?: string): import("./passage.ts").default | undefined;
/**
 * Returns the current passages from all frames (whether visible or not)
 * @returns
 */
export declare function active(): (import("./passage.ts").default | undefined)[];
