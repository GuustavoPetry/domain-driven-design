import { InMemoryQuestionAttachmentsRepo } from "@test/repositories/in-memory-question-attachments-repo";
import { InMemoryQuestionRepo } from "@test/repositories/in-memory-question-repo";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteQuestionService } from "./delete-question";
import { makeQuestion } from "@test/factories/make-question";
import { makeQuestionAttachment } from "@test/factories/make-question-attachment";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryQuestionAttachmentRepo: InMemoryQuestionAttachmentsRepo;
let inMemoryQuestionRepo: InMemoryQuestionRepo;
let sut: DeleteQuestionService;

describe("Delete Question Service", () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentRepo = new InMemoryQuestionAttachmentsRepo();
        inMemoryQuestionRepo = new InMemoryQuestionRepo(inMemoryQuestionAttachmentRepo);
        sut = new DeleteQuestionService(inMemoryQuestionRepo);
    });

    it("should be able to delete question", async () => {
        const question = makeQuestion();

        inMemoryQuestionRepo.create(question);

        inMemoryQuestionAttachmentRepo.items.push(
            makeQuestionAttachment({ questionId: new UniqueEntityID(question.id.toString()) }),
            makeQuestionAttachment({ questionId: new UniqueEntityID(question.id.toString()) }),
        )

        expect(inMemoryQuestionRepo.items[0]?.id).toBe(question.id);
        expect(inMemoryQuestionAttachmentRepo.items).toHaveLength(2);

        await sut.execute({
            questionId: question.id.toString(),
            authorId: question.authorId.toString(),
        });

        expect(inMemoryQuestionRepo.items[0]?.id).toBeFalsy();
        expect(inMemoryQuestionAttachmentRepo.items).toHaveLength(0);
    });
});