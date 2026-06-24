import { randomUUID } from "node:crypto";

export class UniqueEntityID {
    public value: string;

    constructor(value?: string) {
        this.value = value ?? randomUUID();
    }
}