import { Either, left, rigth } from "@/core/error/either";
import { ResourceNotFoundError } from "@/core/error/errors/resource-not-found-error";
import { Question } from "../../entities/question";
import { NotAllowedError } from "@/core/error/errors/not-allowed-error";
import { QuestionRepo } from "../repositories/question-repo";
import { QuestionAttachmentsRepo } from "../repositories/question-attachments-repo";
import { QuestionAttachmentList } from "../../entities/question-attachment-list";
import { QuestionAttachment } from "../../entities/question-attachment";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface EditQuestionRequest {
    authorId: string;
    questionId: string;
    title?: string;
    content?: string;
    attachmentIds?: string[];
}

type EditQuestionResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {
        question: Question;
    }
>

export class EditQuestion {
    constructor(
        private questionRepo: QuestionRepo,
        private questionAttachmentRepo: QuestionAttachmentsRepo
    ) { }

    async execute({
        authorId,
        questionId,
        title,
        content,
        attachmentIds,
    }: EditQuestionRequest): Promise<EditQuestionResponse> {
        const question = await this.questionRepo.findById(questionId);

        if (!question) return left(new ResourceNotFoundError());

        const isAuthor = question.authorId.toString() === authorId;

        if (!isAuthor) return left(new NotAllowedError());

        const currentAttachments = await this.questionAttachmentRepo.findManyByQuestionId(questionId);

        const attachmentList = new QuestionAttachmentList(currentAttachments);

        if (attachmentIds) {
            const newAttachments = attachmentIds?.map((attachmentId) => {
                return new QuestionAttachment({
                    attachmentId: new UniqueEntityID(attachmentId),
                    questionId: question.id,
                })
            });

            attachmentList.update(newAttachments);

            question.attachments = attachmentList;
        }

        if (title) question.title = title;
        if (content) question.content = content;

        await this.questionRepo.save(question);

        return rigth({
            question
        });

    }
}