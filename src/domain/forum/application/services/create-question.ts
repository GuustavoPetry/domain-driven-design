import { Either, rigth } from "@/core/error/either";
import { Question } from "../../entities/question";
import type { QuestionRepo } from "../repositories/question-repo";
import { QuestionAttachment } from "../../entities/question-attachment";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionAttachmentList } from "../../entities/question-attachment-list";

interface CreateQuestionRequest {
    title: string;
    content: string;
    attachmentIds: string[];
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
        attachmentIds,
        authorId,
    }: CreateQuestionRequest): Promise<CreateQuestionResponse> {
        const question = Question.create({
            title,
            content,
            authorId,
        });

        const questionAttachments = attachmentIds.map((attachmentId) => {
            return new QuestionAttachment({
                attachmentId: new UniqueEntityID(attachmentId),
                questionId: question.id,
            })
        });

        const questionAttachmentList = new QuestionAttachmentList(questionAttachments);

        question.attachments = questionAttachmentList;

        await this.questionRepo.create(question);

        return rigth({ question })
    }
}