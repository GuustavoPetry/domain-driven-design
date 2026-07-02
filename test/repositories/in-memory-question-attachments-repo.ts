import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionAttachmentsRepo } from "@/domain/forum/application/repositories/question-attachments-repo";
import { QuestionAttachment } from "@/domain/forum/entities/question-attachment";

export class InMemoryQuestionAttachmentsRepo implements QuestionAttachmentsRepo {
    public items: QuestionAttachment[] = [];

    async findManyByQuestionId(questionId: UniqueEntityID): Promise<QuestionAttachment[]> {
        const attachments = this.items.filter((item) => item.questionId === questionId);

        return attachments;
    }

    async deleteManyByQuestionId(questionId: UniqueEntityID): Promise<void> {
        const attachments = this.items.filter((item) => item.id !== questionId);

        this.items = attachments;
    }
}