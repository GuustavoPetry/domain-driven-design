import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionAttachment, QuestionAttachmentsProps } from "@/domain/forum/entities/question-attachment";

export function makeQuestionAttachment(override?: Partial<QuestionAttachmentsProps>, id?: UniqueEntityID) {
    const questionAttachment = QuestionAttachment.create({
        attachmentId: new UniqueEntityID(),
        questionId: new UniqueEntityID(),
        ...override
    },
        id
    );

    return questionAttachment;
}