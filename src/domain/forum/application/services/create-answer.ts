import { Either, left, rigth } from "@/core/error/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepo } from "../repositories/answer-repo";
import { QuestionRepo } from "../repositories/question-repo";
import { ResourceNotFoundError } from "@/core/error/errors/resource-not-found-error";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface CreateAnswerRequest {
    content: string,
    questionId: string,
    authorId: string,
}

type CreateAnswerResponse = Either<
    ResourceNotFoundError,
    {
        answer: Answer,
    }
>;

export class CreateAnswer {
    constructor(
        private questionRepo: QuestionRepo,
        private answerRepo: AnswerRepo,
    ) { }

    async execute({
        content,
        questionId,
        authorId,
    }: CreateAnswerRequest): Promise<CreateAnswerResponse> {
        const question = await this.questionRepo.findById(questionId);

        if (!question) return left(new ResourceNotFoundError());

        const answer = Answer.create({
            content,
            questionId: new UniqueEntityID(questionId),
            authorId: new UniqueEntityID(authorId),
            createdAt: new Date(),
        });

        await this.answerRepo.create(answer);

        return rigth({ answer });
    }
}

