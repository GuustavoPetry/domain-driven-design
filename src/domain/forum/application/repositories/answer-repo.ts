import type { Answer } from "../../enterprise/entities/answer";

export interface AnswerRepo {
    create(answer: Answer): Promise<void>;
}