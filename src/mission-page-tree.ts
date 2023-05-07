import AsyncTree from "./async-tree";

// TODO implement
export default class MissionPageTree implements AsyncTree {
    private constructor(htmlString: string) { }

    get name(): string { return ""; }

    loadChildren(): Promise<MissionPageTree[]> { return Promise.resolve([]); }

    static fromURL(url: string): Promise<MissionPageTree> { return Promise.resolve(new MissionPageTree("TODO")); }
}