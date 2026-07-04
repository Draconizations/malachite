import Passage from "./passage.ts";
export declare let ifID: string;
export declare let storyTitle: string;
export declare let start: Passage | undefined;
/**
 * Initializes the Story.
 *
 * Called after the Engine is initialized, but before user scripts.
 */
export declare function init(): void;
export declare function finish(): void;
export declare function get(name: string): Passage | undefined;
export declare function has(name: string): boolean;
export declare function filter(predicate: (passage: Passage) => boolean): Passage[];
export declare function find(predicate: (passage: Passage) => boolean): Passage | undefined;
export declare function getStyles(): readonly Passage[];
export declare function getScripts(): readonly Passage[];
declare const _default: {
    init: typeof init;
};
export default _default;
