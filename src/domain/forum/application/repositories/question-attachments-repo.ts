import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionAttachment } from "../../entities/question-attachment";

export interface QuestionAttachmentsRepo {
    findManyByQuestionId(questionId: UniqueEntityID): Promise<QuestionAttachment[]>;

    deleteManyByQuestionId(questionId: UniqueEntityID): Promise<void>;
}