import { QuestionAttachmentsRepo } from "@/domain/forum/application/repositories/question-attachments-repo";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";

export class InMemoryQuestionAttachmentsRepo implements QuestionAttachmentsRepo {
    public items: QuestionAttachment[] = [];

    async findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
        const attachments = this.items.filter((item) => item.questionId.toString() === questionId);

        return attachments;
    }

    async deleteManyByQuestionId(questionId: string): Promise<void> {
        const attachments = this.items.filter((item) => item.questionId.toString() !== questionId);

        this.items = attachments;
    }
}