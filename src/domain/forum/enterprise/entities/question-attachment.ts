import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface QuestionAttachmentsProps {
    attachmentId: UniqueEntityID;
    questionId: UniqueEntityID;
}

export class QuestionAttachment extends Entity<QuestionAttachmentsProps> {
    get attachmentId() {
        return this.props.attachmentId;
    }

    get questionId() {
        return this.props.questionId;
    }

    static create(props: QuestionAttachmentsProps, id?: UniqueEntityID) {
        const questionAttachments = new QuestionAttachment(props, id);

        return questionAttachments;
    }
}