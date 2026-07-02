import { describe, expect, it } from "vitest";
import { WatchedList } from "./watched-list";

class NumberWatchedList extends WatchedList<Number> {
    compareItems(a: Number, b: Number): boolean {
        return a === b;
    }
}

describe("Watched List Pattern", () => {
    it("should be able to create watched list with initial items", () => {
        const list = new NumberWatchedList([1, 2, 3]);

        expect(list.getInitial()).toEqual([1, 2, 3]);
        expect(list.getCurrent()).toEqual([1, 2, 3]);
        expect(list.getNew()).toEqual([]);
        expect(list.getRemoved()).toEqual([]);
    });

    it("should be able to add a new item", () => {
        const list = new NumberWatchedList([1, 2, 3]);

        list.add(4);

        expect(list.getInitial()).toEqual([1, 2, 3]);
        expect(list.getCurrent()).toEqual([1, 2, 3, 4]);
        expect(list.getNew()).toEqual([4]);
        expect(list.getRemoved()).toEqual([]);
    });

    it("should be able to add a item even if it has been removed before", () => {
        const list = new NumberWatchedList([1, 2, 3]);

        list.remove(2);
        expect(list.getInitial()).toEqual([1, 2, 3]);
        expect(list.getCurrent()).toEqual([1, 3]);
        expect(list.getNew()).toEqual([]);
        expect(list.getRemoved()).toEqual([2]);

        list.add(2);
        expect(list.getInitial()).toEqual([1, 2, 3]);
        expect(list.getCurrent()).toEqual([1, 3, 2]);
        expect(list.getNew()).toEqual([]);
        expect(list.getRemoved()).toEqual([]);
    });

    it("should be able to remove a item even if it has been added before", () => {
        const list = new NumberWatchedList([1, 2, 3]);

        list.add(4);
        expect(list.getInitial()).toEqual([1, 2, 3]);
        expect(list.getCurrent()).toEqual([1, 2, 3, 4]);
        expect(list.getNew()).toEqual([4]);
        expect(list.getRemoved()).toEqual([]);

        list.remove(4);
        expect(list.getInitial()).toEqual([1, 2, 3]);
        expect(list.getCurrent()).toEqual([1, 2, 3]);
        expect(list.getNew()).toEqual([]);
        expect(list.getRemoved()).toEqual([]);
    });

    it("should be able to update watched list", () => {
        const list = new NumberWatchedList([1, 2, 3, 4]);

        list.update([1, 3, 5, 7]);
        expect(list.getInitial()).toEqual([1, 2, 3, 4]);
        expect(list.getCurrent()).toEqual([1, 3, 5, 7]);
        expect(list.getNew()).toEqual([5, 7]);
        expect(list.getRemoved()).toEqual([2, 4]);

        list.update([1, 2, 4, 5]);
        expect(list.getInitial()).toEqual([1, 2, 3, 4]);
        expect(list.getCurrent()).toEqual([1, 2, 4, 5]);
        expect(list.getNew()).toEqual([5]);
        expect(list.getRemoved()).toEqual([3]);
    });
})