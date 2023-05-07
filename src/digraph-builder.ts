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

        let visited = {};
        return DigraphBuilder.buildPartial(this.digraph, this.tree, visited);
    }



    private static buildPartial(digraph: Digraph, tree: AsyncTree, visited: {[key: string]: boolean}): Promise<Digraph> {
        if(visited[tree.name]) {
            return Promise.resolve(digraph);
        }

        console.log(`Visiting node "${tree.name}"`);
        visited[tree.name] = true;

        return tree.loadChildren().then(subtrees => {
            subtrees.forEach(subtree => {
                digraph.addEdge(tree.name, subtree.name);
            });

            return subtrees.reduce((promiseAccumulator, currentSubtree) => {
                return promiseAccumulator.then(digraphAccumulator => 
                    DigraphBuilder.buildPartial(digraphAccumulator, currentSubtree, visited)
                );
            }, Promise.resolve(digraph));
        });
    }
}