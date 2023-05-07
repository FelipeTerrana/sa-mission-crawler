export default class Digraph {
    private edgesByNode: {[node: string]: string[]} = {};



    addEdge(from: string, to: string): void {
        this.edgesByNode[from] = this.edgesByNode[from] || [];
        this.edgesByNode[to] = this.edgesByNode[to] || [];

        this.edgesByNode[from].push(to);
    }

    generateDotString(): string {
        return `\
            digraph G {
            ${Object.keys(this.edgesByNode).map(node => `
                "${node}" -> { ${this.edgesByNode[node].map(edgeNode => `"${edgeNode}"`).join(", ")} }`).join(";\n")}
            }`;
    }
}