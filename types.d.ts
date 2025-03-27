declare module "html" {
    export const defaultLayout: (start: string) => string;
}
declare module "config" {
    export default class Config {
        static allowSave: (saveType: number, frames?: Map<string, string>) => boolean;
        static storyInterface: ((start: string) => string) | undefined;
        static frameClass: string;
        static localSaveName: string;
    }
}
declare module "state" {
    type Data = {
        _frames: Record<string, string>;
    } & Record<string, any>;
    type Snapshot = {
        title: string;
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
     * Gets the current state in the history
     */
    export function current(index?: number): Snapshot;
    export function jump(target: number, checkBounds?: boolean): void;
    /**
     * Initializes the state
     *
     * Called once on page load.
     * Should be called after userscripts are loaded.
     */
    export function init(): void;
    /**
     * Loads in the state from a specified source.
     */
    export function load(encodedData?: string): void;
    /**
     * Creates a new moment in the history, replacing the current moment with the new moment.
     */
    export function push(data?: Data, title?: string): void;
    /**
     * Creates a snapshot with a given title and data set.
     */
    export function snapshot(data?: Data, title?: string): Snapshot;
    const _default: {
        init: typeof init;
    };
    export default _default;
}
declare module "passage" {
    export default class Passage {
        name: string;
        tags: string[];
        source: string;
        constructor(name: string, tags: string[], source: string);
    }
}
declare module "frame" {
    export interface FrameConfig {
        history?: boolean;
    }
    export default class Frame {
        #private;
        name: string;
        history: boolean;
        get passage(): string | undefined;
        set passage(value: string | undefined);
        constructor(name: string, config?: FrameConfig);
        visible(): boolean;
    }
    export function newFrame(name?: string, config?: FrameConfig): Frame;
    export function getFrame(name?: string): Frame;
    export function filterFrames(predicate: (f: Frame) => boolean): Frame[];
    export function allFrames(): Frame[];
    export function goto(passageName: string, frameName?: string, transition?: boolean, skip?: boolean): void;
    export function current(frame?: string): import("passage").default;
    export function active(): import("passage").default[];
}
declare module "utils" {
    export function getAttribute(el: Element | null, attr: string): string;
    export function getTransitionDuration(el: Element): number;
    export function runFrameQueue(frameQueue: Map<string, string>, allowPlay: boolean, transition: boolean): void;
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
    export function get(name: string): Passage;
    export function has(name: string): boolean;
    export function filter(predicate: (passage: Passage) => boolean): Passage[];
    export function find(predicate: (passage: Passage) => boolean): Passage;
    export function getStyles(): readonly Passage[];
    export function getScripts(): readonly Passage[];
    const _default_1: {
        init: typeof init;
    };
    export default _default_1;
}
declare module "markup/variable" {
    import type { RuleInline } from "markdown-it/lib/parser_inline.mjs";
    import type { RenderRule } from "markdown-it/lib/renderer.mjs";
    export const variableRule: RuleInline;
    export const variableRender: RenderRule;
}
declare module "markup/link" {
    import type { RuleInline } from "markdown-it/lib/parser_inline.mjs";
    import type { RenderRule } from "markdown-it/lib/renderer.mjs";
    export const linkRule: RuleInline;
    export const linkRender: RenderRule;
}
declare module "markup/index" {
    export const markup: (source: string) => string;
    export const render: (el: Element, source: string, skip?: boolean) => Promise<void>;
}
declare module "engine" {
    export const version: string;
    export const frameQueue: Map<string, string>;
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
    export function play(frames?: Map<string, string>): void;
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
        const Config: typeof configAPI;
        const $s: typeof emptyData & Record<string, any>;
        interface Window {
            Engine: typeof engineAPI;
            Story: typeof storyAPI;
            Alpine: typeof alpineAPI;
            State: typeof stateAPI;
            Frames: typeof frameAPI;
            Config: typeof configAPI;
            $s: typeof emptyData & Record<string, any>;
        }
    }
    const alpineAPI: MAlpine;
    const engineAPI: {
        version: string;
        play: () => void;
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
        allowBack: boolean;
        allowForward: boolean;
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
    const configAPI: {
        State: {
            allowSave: (type: number, frames?: Map<string, string>) => boolean;
            localSaveName: string;
        };
        Story: {
            interface: ((start: string) => string) | undefined;
        };
        Frame: {
            class: string;
        };
    };
}
