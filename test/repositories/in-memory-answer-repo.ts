import type { AnswerRepo } from "@/domain/forum/application/repositories/answer-repo";
import type { Answer } from "@/domain/forum/entities/answer";

export class InMemoryAnswerRepo implements AnswerRepo {
    public items: Answer[] = [];

    async create(answer: Answer) {
        this.items.push(answer);
    }
}