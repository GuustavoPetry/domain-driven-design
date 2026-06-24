import { Question } from "../../entities/question";
import type { QuestionRepo } from "../repositories/question-repo";

interface CreateQuestionRequest {
    title: string;
    content: string;
    authorId: string;
}

interface CreateQuestionResponse {
    question: Question;
}

export class CreateQuestion {
    constructor(private questionRepo: QuestionRepo) { }

    async execute({
        title,
        content,
        authorId,
    }: CreateQuestionRequest): Promise<CreateQuestionResponse> {
        const question = Question.create({
            title,
            content,
            authorId,
            createdAt: new Date(),
        });

        await this.questionRepo.create(question);

        return {
            question
        }
    }
}