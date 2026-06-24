import { Entity } from "@/core/entities/entity";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface QuestionProps {
    title: string;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
    authorId: string;
}

export class Question extends Entity<QuestionProps> {
    get title() {
        return this.props.title;
    }

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

    static create(props: QuestionProps, id?: UniqueEntityID) {
        const question = new Question(props, id);

        return question;
    }
}