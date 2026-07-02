export abstract class WatchedList<T> {
    public current: T[];
    private initial: T[];
    private new: T[];
    private removed: T[];

    constructor(initialItems?: T[]) {
        this.current = initialItems?.slice() || [];
        this.initial = initialItems?.slice() || [];
        this.new = [];
        this.removed = [];
    }

    abstract compareItems(a: T, b: T): boolean;

    public getCurrent() {
        return this.current
    }

    public getInitial() {
        return this.initial;
    }

    public getNew() {
        return this.new;
    }

    public getRemoved() {
        return this.removed;
    }

    private isCurrentItem(item: T): boolean {
        return (
            this.current.filter((v) => this.compareItems(v, item)).length !== 0
        );
    }

    private isInitialItem(item: T): boolean {
        return (
            this.initial.filter((v) => this.compareItems(v, item)).length !== 0
        );
    }

    private isNewItem(item: T): boolean {
        return (
            this.new.filter((v) => this.compareItems(v, item)).length !== 0
        );
    }

    private isRemovedItem(item: T): boolean {
        return (
            this.removed.filter((v) => this.compareItems(v, item)).length !== 0
        );
    }

    private removeFromCurrent(item: T): void {
        this.current = this.current.filter((v) => !this.compareItems(v, item));
    }

    private removeFromNew(item: T): void {
        this.new = this.new.filter((v) => !this.compareItems(v, item));
    }

    private removeFromRemoved(item: T): void {
        this.removed = this.removed.filter((v) => !this.compareItems(v, item));
    }

    public exists(item: T): boolean {
        return this.isCurrentItem(item);
    }

    public add(item: T): void {
        if (this.isRemovedItem(item)) {
            this.removeFromRemoved(item);
        }

        if (!this.isNewItem(item) && !this.isInitialItem(item)) {
            this.new.push(item);
        }

        if (!this.isCurrentItem(item)) {
            this.current.push(item);
        }
    }

    public remove(item: T): void {
        if (this.isCurrentItem(item)) {
            this.removeFromCurrent(item);
        }

        if (this.isNewItem(item)) {
            this.removeFromNew(item);
            return;
        }

        if (!this.isRemovedItem(item)) {
            this.removed.push(item);
        }
    }

    public update(items: T[]): void {
        const newItems = items.filter((a) => !this.initial.some((b) => this.compareItems(a, b)));

        const removedItems = this.initial.filter((a) => !items.some((b) => this.compareItems(a, b)));

        this.current = items;
        this.new = newItems;
        this.removed = removedItems;
    }
}
