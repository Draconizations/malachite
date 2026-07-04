import { type MAlpine } from "./alpine.ts";
import { play } from "./engine.ts";
import type Frame from "./frame.ts";
import { type FrameConfig } from "./frame.ts";
import Passage from "./passage.ts";
import { type emptyData } from "./state.ts";
export default function (): void;
declare global {
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
declare const alpineAPI: MAlpine;
declare const engineAPI: {
    version: string;
    play: typeof play;
    markup: (source: string | Passage) => string;
    render: (el: Element, source: string | Passage, skip?: boolean) => void;
};
declare const storyAPI: {
    readonly id: string;
    title: string;
    readonly start: Passage | undefined;
    get: (name: string) => Passage | undefined;
    has: (name: string) => boolean;
    filter: (predicate: (passage: Passage) => boolean) => Passage[];
    find: (predicate: (passage: Passage) => boolean) => Passage | undefined;
};
declare const stateAPI: {
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
declare const frameAPI: {
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
declare const utilAPI: {
    /**
     * Makes the target element perform a transition. The visual aspect of the transtiion is
     * determined by the element's CSS. Read [the documentation](https://draconizations.github.io/malachite/prerelease/general/directives/) for more information.
     * @param el
     * @param detail
     * @param bubble
     */
    transition: (el: Element, detail: any, bubble?: boolean) => void;
};
declare const configAPI: {
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
export {};
