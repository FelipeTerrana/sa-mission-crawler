export default interface AsyncTree {
    loadChildren(): Promise<AsyncTree[]>;
    get name(): string;
}