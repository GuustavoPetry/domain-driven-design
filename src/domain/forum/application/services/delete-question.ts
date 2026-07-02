import { Either, left, rigth } from "@/core/error/either";
import { NotAllowedError } from "@/core/error/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/error/errors/resource-not-found-error";
import { InMemoryQuestionRepo } from "@test/repositories/in-memory-question-repo";

interface DeleteQuestionRequest {
    questionId: string;
    authorId: string;
}

type DeleteQuestionResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {}
>

export class DeleteQuestionService {
    constructor(
        private questionRepo: InMemoryQuestionRepo,
    ) { }

    async execute({
        questionId,
        authorId,
    }: DeleteQuestionRequest): Promise<DeleteQuestionResponse> {
        const question = await this.questionRepo.findById(questionId);

        if (!question) return left(new ResourceNotFoundError());

        const isAuthor = authorId === question.authorId.toString();

        if (!isAuthor) return left(new NotAllowedError());

        await this.questionRepo.delete(questionId);

        return rigth({});
    }
}