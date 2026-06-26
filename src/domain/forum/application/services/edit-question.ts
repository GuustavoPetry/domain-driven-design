import { Either, left, rigth } from "@/core/errors/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { Question } from "../../entities/question";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { QuestionRepo } from "../repositories/question-repo";

interface EditQuestionRequest {
    authorId: string,
    questionId: string,
    title?: string,
    content?: string,
}

type EditQuestionResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {
        question: Question;
    }
>

export class EditQuestion {
    constructor(private questionRepo: QuestionRepo) { }

    async execute({
        authorId,
        questionId,
        title,
        content,
    }: EditQuestionRequest): Promise<EditQuestionResponse> {
        const question = await this.questionRepo.findById(questionId);

        if (!question) return left(new ResourceNotFoundError());

        const isAuthor = question.authorId === authorId;

        if (!isAuthor) return left(new NotAllowedError());

        if (title) question.title = title;
        if (content) question.content = content;

        await this.questionRepo.save(question);

        return rigth({
            question
        })

    }
}