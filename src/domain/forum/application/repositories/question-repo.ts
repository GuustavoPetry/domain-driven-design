import type { Question } from "../../entities/question";

export interface QuestionRepo {
    create(question: Question): Promise<Question>;

    save(question: Question): Promise<Question>;

    delete(authorId: string, questionId: string): Promise<void>;

    findById(id: string): Promise<Question | null>;

}