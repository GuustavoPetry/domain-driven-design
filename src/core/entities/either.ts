export class Left<L, R> {
    readonly value: L;

    constructor(value: L) {
        this.value = value;
    }

    isLeft() {
        return true;
    }

    isRigth() {
        return false;
    }
}

export class Rigth<L, R> {
    readonly value: R;

    constructor(value: R) {
        this.value = value;
    }

    isLeft() {
        return false;
    }

    isRigth() {
        return true;
    }
}

// response das services
export type Either<L, R> = Left<L, R> | Rigth<L, R>;

export const left = <L, R>(value: L): Either<L, R> => {
    return new Left(value);
}

export const rigth = <L, R>(value: R): Either<L, R> => {
    return new Rigth(value);
}