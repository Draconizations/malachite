import type Passage from "../passage.ts";
export declare const markup: (source: string) => string;
export declare const render: (el: Element, source: string, skip?: boolean, passage?: Passage) => Promise<void>;
