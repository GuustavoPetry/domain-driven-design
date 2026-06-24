import type { Answer } from "../../entities/answer";

export interface AnswerRepo {
    create(answer: Answer): Promise<void>;
}