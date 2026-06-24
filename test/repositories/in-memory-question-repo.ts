import type { QuestionRepo } from "@/domain/forum/application/repositories/question-repo";
import type { Question } from "@/domain/forum/entities/question";

export class InMemoryQuestionRepo implements QuestionRepo {
    public items: Question[] = [];

    async create(question: Question) {
        this.items.push(question);
    }
}