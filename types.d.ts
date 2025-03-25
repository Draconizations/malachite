declare module "html" {
    export const defaultLayout: (start: string) => string;
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
    export let max: number;
    export function current(): Snapshot;
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
declare module "utils" {
    export function getAttribute(el: Element | null, attr: string): string;
}
declare module "story" {
    import Passage from "passage";
    export let ifID: string;
    export let storyTitle: string;
    export let start: Passage | null;
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
declare module "config" {
    export default class Config {
        static allowSave: (saveType: number) => boolean;
        static storyInterface: (start: string) => string | undefined;
    }
}
declare module "engine" {
    export const version: any;
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
    export function start(): void;
    /**
     * Updates the State and History, and updates Alpine.store("story") accordingly.
     *
     * **Note:** this function is (by default) automatically triggered on passage navigation, i.e. by `x-link` or
     * `Frame.goto()`. It can be called manually as well.
     */
    export function play(): void;
    const _default_2: {
        init: typeof init;
        start: typeof start;
        runUserScripts: typeof runUserScripts;
    };
    export default _default_2;
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
    const _default_3: (source: string) => string;
    export default _default_3;
}
declare module "alpine" {
    import Alpine from "alpinejs";
    export default Alpine;
}
declare module "frame" {
    export function goto(frame: string, name: string, skip: boolean): void;
    export function current(frame?: string): import("passage").default;
    export function active(): import("passage").default[];
}
declare module "api" {
    import Passage from "passage";
    import { type emptyData } from "state";
    export default function (): void;
    global {
        interface Window {
            Engine: typeof engineAPI;
            Story: typeof storyAPI;
            Alpine: typeof alpineAPI;
            State: typeof stateAPI;
            Frame: typeof frameAPI;
            Config: typeof configAPI;
            $s: typeof emptyData & Record<string, any>;
        }
    }
    const alpineAPI: any;
    const engineAPI: {
        version: any;
        play: () => void;
        render: (source: string | Passage) => string;
    };
    const storyAPI: {
        readonly id: string;
        title: string;
        get: (name: string) => Passage;
        has: (name: string) => boolean;
        filter: (predicate: (passage: Passage) => boolean) => Passage[];
        find: (predicate: (passage: Passage) => boolean) => Passage;
    };
    const stateAPI: {
        SaveType: Readonly<{
            AUTO: number;
            LOCAL: number;
            FILE: number;
        }>;
    };
    const frameAPI: {
        /**
         * Jumps to the specified passage. Uses the unnamed frame by default.
         * @param passage  The passage to jump to
         * @param frame (optional) the frame to use
         * @param skip (optional) whether to skip saving state to history or not
         */
        goto: (passage: string | Passage, frame?: string, skip?: boolean) => void;
        /**
         * Gets the currently active Passage in the specified frame
         * @param frame
         * @returns
         */
        current: (frame?: string) => Passage;
        /**
         * Gets an array of all currently active passages (regardless of whether they're visible or not)
         * @returns
         */
        active: () => Passage[];
    };
    const configAPI: {
        State: {
            allowSave: (saveType: number) => boolean;
        };
        Story: {
            interface: (start: string) => string | undefined;
        };
    };
}
