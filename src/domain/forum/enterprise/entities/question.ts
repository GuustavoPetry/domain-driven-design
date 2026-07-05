import { AggregateRoot } from "@/core/entities/aggregate-root";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionAttachmentList } from "./question-attachment-list";
import { Optional } from "@/core/types/optional";

export interface QuestionProps {
    title: string;
    content: string;
    attachments: QuestionAttachmentList;
    createdAt: Date;
    updatedAt?: Date;
    authorId: UniqueEntityID;
}

export class Question extends AggregateRoot<QuestionProps> {
    get title() {
        return this.props.title;
    }

    get content() {
        return this.props.content;
    }

    get attachments() {
        return this.props.attachments;
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

    set title(value: string) {
        this.props.title = value;
    }

    set content(value: string) {
        this.props.content = value;
    }

    set attachments(attachments: QuestionAttachmentList) {
        this.props.attachments = attachments;
    }

    static create(
        props: Optional<QuestionProps, "createdAt" | "attachments">,
        id?: UniqueEntityID
    ) {
        const question = new Question({
            ...props,
            createdAt: props.createdAt ?? new Date(),
            attachments: props.attachments ?? new QuestionAttachmentList(),
        },
            id
        );

        return question;
    }
}