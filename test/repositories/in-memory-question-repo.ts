import { QuestionAttachmentsRepo } from "@/domain/forum/application/repositories/question-attachments-repo";
import type { QuestionRepo } from "@/domain/forum/application/repositories/question-repo";
import type { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionRepo implements QuestionRepo {
    public items: Question[] = [];

    constructor(private questionAttachmentRepo: QuestionAttachmentsRepo) { }

    async create(question: Question) {
        this.items.push(question);

        return question;
    }

    async save(question: Question) {
        const itemIndex = this.items.findIndex(item => item.id === question.id);

        this.items[itemIndex] = question;

        return question;
    }

    async delete(questionId: string): Promise<void> {
        const removeQuestion = this.items.filter((item) => item.id.toString() !== questionId);

        await this.questionAttachmentRepo.deleteManyByQuestionId(questionId)

        this.items = removeQuestion;
    }

    async findById(id: string): Promise<Question | null> {
        const question = this.items.find(item => item.id.toString() === id);

        return question ?? null;
    }
}