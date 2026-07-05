import { QuestionAttachment } from "../../enterprise/entities/question-attachment";

export interface QuestionAttachmentsRepo {
    findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>;

    deleteManyByQuestionId(questionId: string): Promise<void>;
}