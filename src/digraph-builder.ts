import Digraph from "./digraph";
import AsyncTree from "./async-tree";

export default class DigraphBuilder {
    private digraph?: Digraph;
    private tree?: AsyncTree;

    setEmptyDigraph(digraph: Digraph): DigraphBuilder {
        this.digraph = digraph;
        return this;
    }

    setTree(tree: AsyncTree): DigraphBuilder {
        this.tree = tree;
        return this;
    }

    build(): Promise<Digraph> {
        if(!this.digraph || !this.tree) {
            throw new Error("Builder must have both digraph and tree set");
        }

        // TODO implement
        return Promise.resolve(new Digraph());
    }
}