import type { Question } from "../../entities/question";

export interface QuestionRepo {
    create(question: Question): Promise<void>;
}