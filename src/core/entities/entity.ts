import { UniqueEntityID } from "./unique-entity-id";

export abstract class Entity<Props> {
    private _id: UniqueEntityID;
    protected props: Props;

    toString() {
        return this._id.value;
    }

    constructor(props: Props, id?: UniqueEntityID) {
        this.props = props;
        this._id = id ?? new UniqueEntityID();
    }
}