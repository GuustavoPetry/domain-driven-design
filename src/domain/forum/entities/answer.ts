import { Entity } from "@/core/entities/entity";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface AnswerProps {
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
}

export class Answer extends Entity<AnswerProps> {
    get content() {
        return this.props.content;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    get authorId() {
        return this.props.authorId;
    }

    touch() {
        this.props.updatedAt = new Date();
    }

    static create(props: AnswerProps, id?: UniqueEntityID) {
        const answer = new Answer(props, id);

        return answer;
    }
}