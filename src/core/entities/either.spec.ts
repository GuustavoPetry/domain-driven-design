import { expect, test } from "vitest";
import { Either, left, rigth } from "./either";

function doSomething(shouldSuccess: boolean): Either<string, number> {
    if (shouldSuccess) return rigth(10);

    return left("error");
}

test("success", () => {
    const result = doSomething(true);


    if (result.isRigth()) {
        console.log(result);
        //  Sem utilidade - apenas pra visualizar narrowing com -> : this is
    }

    expect(result.isRigth()).toBe(true);
    expect(result.isLeft()).toBe(false);
});

test("error", () => {
    const result = doSomething(false);

    if (result.isLeft()) {
        console.log(result);
        // Sem utilidade - apenas pra visualizar narrowing com -> : this is
    }

    expect(result.isLeft()).toBe(true);
    expect(result.isRigth()).toBe(false);
});