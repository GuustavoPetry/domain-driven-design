import { QuestionAttachment } from "../../entities/question-attachment";

export interface QuestionAttachmentsRepo {
    findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>;

    deleteManyByQuestionId(questionId: string): Promise<void>;
}