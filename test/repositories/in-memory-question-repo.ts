import type { QuestionRepo } from "@/domain/forum/application/repositories/question-repo";
import type { Question } from "@/domain/forum/entities/question";

export class InMemoryQuestionRepo implements QuestionRepo {
    public items: Question[] = [];

    async create(question: Question) {
        this.items.push(question);

        return question;
    }

    async save(question: Question) {
        const itemIndex = this.items.findIndex(item => item.id === question.id);

        this.items[itemIndex] = question;

        return question;
    }

    async findById(id: string): Promise<Question | null> {
        const question = this.items.find(item => item.id.toString() === id);

        return question ?? null;
    }
}