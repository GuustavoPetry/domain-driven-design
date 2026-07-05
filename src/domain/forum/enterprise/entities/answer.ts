import { AggregateRoot } from "@/core/entities/aggregate-root";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { AnswerCreatedEvent } from "../events/answer-created-event";

export interface AnswerProps {
    content: string;
    createdAt: Date;
    updatedAt?: Date;
    authorId: UniqueEntityID;
    questionId: UniqueEntityID,
}

export class Answer extends AggregateRoot<AnswerProps> {
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

    get questionId() {
        return this.props.questionId;
    }

    get excerpt() {
        return this.content.substring(0, 120).trimEnd().concat("...");
    }

    touch() {
        this.props.updatedAt = new Date();
    }

    static create(
        props: Optional<AnswerProps, "createdAt">,
        id?: UniqueEntityID
    ) {
        const answer = new Answer({
            createdAt: new Date(),
            ...props
        }, id);

        const isNewAnswer: boolean = !id;

        if (isNewAnswer) {
            answer.addDomainEvent(new AnswerCreatedEvent(answer));
        }

        return answer;
    }
}