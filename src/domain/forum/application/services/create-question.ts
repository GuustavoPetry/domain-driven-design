import { Either, rigth } from "@/core/errors/either";
import { Question } from "../../entities/question";
import type { QuestionRepo } from "../repositories/question-repo";

interface CreateQuestionRequest {
    title: string;
    content: string;
    authorId: string;
}

type CreateQuestionResponse = Either<
    null,
    {
        question: Question
    }
>

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

        return rigth({ question })
    }
}