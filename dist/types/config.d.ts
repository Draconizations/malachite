export default class Config {
    static allowSave: (saveType: number, frames?: Map<string, string>) => boolean;
    static localSaveName: string;
    static maxHistory: number;
    static storyInterface: ((start: string) => string) | undefined;
    static frameClass: string;
}
