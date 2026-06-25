import { expect, test } from "vitest";
import { Either, left, rigth } from "./either";

function doSomething(shouldSuccess: boolean): Either<string, number> {
    if (shouldSuccess) return rigth(10);

    return left("error");
}

test("success", () => {
    const result = doSomething(true);

    expect(result.isRigth()).toBe(true);
    expect(result.isLeft()).toBe(false);
});

test("error", () => {
    const result = doSomething(false);

    expect(result.isLeft()).toBe(true);
    expect(result.isRigth()).toBe(false);
});