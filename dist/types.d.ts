declare module "config" {
    export default class Config {
        static allowSave: (saveType: number, frames?: Map<string, string>) => boolean;
        static localSaveName: string;
        static maxHistory: number;
        static storyInterface: ((start: string) => string) | undefined;
        static frameClass: string;
    }
}
declare module "html" {
    export const defaultLayout: (start: string) => string;
}
declare module "passage" {
    export default class Passage {
        name: string;
        tags: string[];
        source: string;
        constructor(name: string, tags: string[], source: string);
    }
}
declare module "transition" {
    interface TransitionSettings {
        applyClass: boolean;
        emitEvent: boolean;
        delay: boolean;
        bubble: boolean;
        action?: () => void;
    }
    export function doTransition(el: Element, detail: any, settings: TransitionSettings): Promise<void>;
}
declare module "markup/link" {
    import type { RuleInline } from "markdown-it/lib/parser_inline.mjs";
    import type { RenderRule } from "markdown-it/lib/renderer.mjs";
    export const linkRule: RuleInline;
    export const linkRender: RenderRule;
}
declare module "markup/variable" {
    import type { RuleInline } from "markdown-it/lib/parser_inline.mjs";
    import type { RenderRule } from "markdown-it/lib/renderer.mjs";
    export const variableRule: RuleInline;
    export const variableRender: RenderRule;
}
declare module "markup/index" {
    import type Passage from "passage";
    export const markup: (source: string) => string;
    export const render: (el: Element, source: string, skip?: boolean, passage?: Passage) => Promise<void>;
}
declare module "story" {
    import Passage from "passage";
    export let ifID: string;
    export let storyTitle: string;
    export let start: Passage | undefined;
    /**
     * Initializes the Story.
     *
     * Called after the Engine is initialized, but before user scripts.
     */
    export function init(): void;
    export function finish(): void;
    export function get(name: string): Passage | undefined;
    export function has(name: string): boolean;
    export function filter(predicate: (passage: Passage) => boolean): Passage[];
    export function find(predicate: (passage: Passage) => boolean): Passage | undefined;
    export function getStyles(): readonly Passage[];
    export function getScripts(): readonly Passage[];
    const _default: {
        init: typeof init;
    };
    export default _default;
}
declare module "frame" {
    export interface FrameConfig {
        state?: boolean;
    }
    export const _frames: Frame[];
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
    export function newFrame(name?: string, config?: FrameConfig): Frame;
    /**
     * Gets a frame by its name. Creates a new frame if this frame isn't found.
     * @param name
     * @returns
     */
    export function getFrame(name?: string): Frame;
    /**
     * Gets all frames that match a certain predicate
     * @param predicate
     * @returns
     */
    export function filterFrames(predicate: (f: Frame) => boolean): Frame[];
    /**
     * Gets every single frame
     * @returns
     */
    export function allFrames(): Frame[];
    /**
     * Swaps the specified frame to the given passage.
     * @param passageName name of the passage to swap to
     * @param frameName name of the frame to swap
     * @param transition whether to apply the transition class or not
     * @param skip whether to skip pushing to the history or not
     */
    export function goto(passageName: string, frameName?: string, transition?: boolean, skip?: boolean): void;
    /**
     * Returns the current passage in the given frame
     * @param frame
     * @returns
     */
    export function current(frame?: string): import("passage.ts").default | undefined;
    /**
     * Returns the current passages from all frames (whether visible or not)
     * @returns
     */
    export function active(): (import("passage.ts").default | undefined)[];
}
declare module "utils" {
    export interface FrameQueueEntry {
        passage: string;
        doTransition: boolean;
        pushToState: boolean;
    }
    export function getAttribute(el: Element | null, attr: string): string | null;
    /**
     * Loop through all frames in the queue. We queue them because otherwise
     * x-link with a goto in the event listener will push two separate states to the history
     * and we don't want that.
     * @param pushToHistory to push the frame changes to history or not
     * @param clearQueue to clear the queue after or not
     * @param frameQueue the queue itself
     */
    export function runFrameQueue(pushToHistory: boolean, clearQueue: boolean, frameQueue: Map<string, FrameQueueEntry>): void;
}
declare module "state" {
    import { type FrameQueueEntry } from "utils";
    type Data = {
        _frames: Record<string, string>;
    } & Record<string, any>;
    type Snapshot = {
        timestamp: string;
        data: Data;
    };
    export const emptyData: Data;
    export let _history: Snapshot[];
    export let _index: number;
    export let max: number;
    export const SaveType: {
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
    export function init(): void;
    const _default_1: {
        init: typeof init;
    };
    export default _default_1;
    /**
     * Gets the state from the history at the specified index. Defaults to the current state
     */
    export function getState(index?: number): Snapshot;
    /**
     * Jumps to a specific state in history.
     * @param target positive jumps forward, negative jumps backwards
     * @returns
     */
    export function jump(target: number): void;
    /**
     * Pushes a new state onto the history stack, trimming the stack as needed.
     */
    export function push(data: Data, frames?: Map<string, FrameQueueEntry>): void;
    /**
     * Saves the state to the current moment in history.
     * @param data
     */
    export function saveState(data: Data): void;
    export function saveFrames(frames: Record<string, string>): void;
    /**
     * Overwrites the current state with updated frames.
     *
     * This is needed because a frame render can cause other frames
     * to change or be intialized. Meaning that the snapshot created by a single push()
     * does not automatically reflect what the player can currently *see*.
     * @param frames frames to be updated
     */
    export function updateFrames(frames?: Map<string, FrameQueueEntry>): void;
    /**
     * Creates a snapshot with a given data set.
     */
    export function createSnapshot(data?: Data): Snapshot;
    /**
     * Loads in the save from the given data
     */
    export function load(encodedData?: string): void;
    /**
     * Retrieves a save stored in localstorage
     * @param index
     * @returns
     */
    export function getLocalSave(index?: number): string | undefined;
    /**
     * Creates a save and stores it in localstorage
     * @param history
     * @param current
     * @param index which save slot to use
     */
    export function setLocalSave(history: any, current: number, index?: number, title?: string): {
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
    export function localSaveLocation(index?: number): string;
}
declare module "engine" {
    import type { FrameQueueEntry } from "utils";
    export const version: string;
    export const frameQueue: Map<string, FrameQueueEntry>;
    /**
     * Initializes the Engine
     *
     * This is the very first thing that runs once the page is opened.
     */
    export function init(): void;
    export function runUserScripts(): void;
    /**
     * Starts the game.
     *
     * This function is called after user scripts are ran and will respect the relevant config settings
     */
    export function start(): Promise<void>;
    /**
     * Updates the State and History, and updates Alpine.store("story") accordingly.
     *
     * **Note:** this function is (by default) automatically triggered on passage navigation, i.e. by `x-link` or
     * `Frame.goto()`. It can be called manually as well.
     */
    export function play(frames?: Map<string, FrameQueueEntry>): void;
    const _default_2: {
        init: typeof init;
        start: typeof start;
        runUserScripts: typeof runUserScripts;
    };
    export default _default_2;
}
declare module "alpine" {
    import Alpine from "alpinejs";
    export const _frames: Record<string, {
        passage: string;
        transition: boolean;
    }>;
    export const _allowNavigation: {
        back: boolean;
        forward: boolean;
    };
    export type MAlpine = typeof Alpine;
    export default Alpine;
}
declare module "api" {
    import { type MAlpine } from "alpine";
    import { play } from "engine";
    import type Frame from "frame";
    import { type FrameConfig } from "frame";
    import Passage from "passage";
    import { type emptyData } from "state";
    export default function (): void;
    global {
        const Engine: typeof engineAPI;
        const Story: typeof storyAPI;
        const Alpine: typeof alpineAPI;
        const State: typeof stateAPI;
        const Frames: typeof frameAPI;
        const Utils: typeof utilAPI;
        const Config: typeof configAPI;
        const $s: typeof emptyData & Record<string, any>;
        interface Window {
            Engine: typeof engineAPI;
            Story: typeof storyAPI;
            Alpine: typeof alpineAPI;
            State: typeof stateAPI;
            Frames: typeof frameAPI;
            Utils: typeof utilAPI;
            Config: typeof configAPI;
            $s: typeof emptyData & Record<string, any>;
        }
    }
    const alpineAPI: MAlpine;
    const engineAPI: {
        version: string;
        play: typeof play;
        markup: (source: string | Passage) => string;
        render: (el: Element, source: string | Passage, skip?: boolean) => void;
    };
    const storyAPI: {
        readonly id: string;
        title: string;
        readonly start: Passage | undefined;
        get: (name: string) => Passage | undefined;
        has: (name: string) => boolean;
        filter: (predicate: (passage: Passage) => boolean) => Passage[];
        find: (predicate: (passage: Passage) => boolean) => Passage | undefined;
    };
    const stateAPI: {
        SaveType: Readonly<{
            AUTO: number;
            LOCAL: number;
            FILE: number;
        }>;
        back: () => void;
        forward: () => void;
        jump: (target: number) => void;
        restart: () => void;
        allow: {
            back: boolean;
            forward: boolean;
        };
        load: {
            fromLocal: (slot: number) => void;
        };
        save: {
            toLocal: (slot: number, title: string) => {
                history: any;
                index: number;
                version: any;
                timestamp: string;
                title: string | undefined;
            };
            getLocal: (slot: number) => any;
        };
    };
    const frameAPI: {
        /**
         * Creates a new Frame object and initializes it with the given configuration
         *
         * Useful for changing Frame behavior
         * @param name
         * @param config
         * @returns
         */
        new: (name?: string, config?: FrameConfig) => Readonly<Frame>;
        /**
         * Gets the instance of a Frame with the given name
         * @param name
         * @returns
         */
        get: (name?: string) => Readonly<Frame>;
        all: () => Frame[];
        /**
         * Jumps to the specified passage. Uses the unnamed frame by default.
         * @param passage  The passage to jump to
         * @param frame (optional) the frame to use
         * @param fade (optional) whether to skip passage transition or not
         * @param skip (optional) whether to skip saving state to history or not
         */
        goto: (passage: string | Passage, frame?: string, fade?: boolean, skip?: boolean) => void;
        /**
         * Gets the currently active Passage in the specified frame
         * @param frame
         * @returns
         */
        current: (frame?: string | undefined) => Passage | undefined;
        /**
         * Gets an array of all currently active passages (regardless of whether they're visible or not)
         * @returns
         */
        active: () => (Passage | undefined)[];
    };
    const utilAPI: {
        /**
         * Makes the target element perform a transition. The visual aspect of the transtiion is
         * determined by the element's CSS. Read [the documentation](https://draconizations.github.io/malachite/prerelease/general/directives/) for more information.
         * @param el
         * @param detail
         * @param bubble
         */
        transition: (el: Element, detail: any, bubble?: boolean) => void;
    };
    const configAPI: {
        State: {
            allowSave: (type: number, frames?: Map<string, string>) => boolean;
            localSaveName: string;
            maxHistory: number;
        };
        Story: {
            interface: ((start: string) => string) | undefined;
        };
        Frame: {
            class: string;
        };
    };
}
