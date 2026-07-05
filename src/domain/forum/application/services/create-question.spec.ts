import { InMemoryQuestionRepo } from "@test/repositories/in-memory-question-repo";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateQuestion } from "./create-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryQuestionAttachmentsRepo } from "@test/repositories/in-memory-question-attachments-repo";

let inMemoryQuestionAttachment: InMemoryQuestionAttachmentsRepo;
let inMemoryQuestionRepo: InMemoryQuestionRepo;
let sut: CreateQuestion;

describe("Create Question Service", () => {
    beforeEach(() => {
        inMemoryQuestionAttachment = new InMemoryQuestionAttachmentsRepo();
        inMemoryQuestionRepo = new InMemoryQuestionRepo(inMemoryQuestionAttachment);
        sut = new CreateQuestion(inMemoryQuestionRepo);
    });

    it("should be able to create question", async () => {
        const result = await sut.execute({
            title: "new question",
            content: "new content",
            attachmentIds: ["1", "2"],
            authorId: "author-1"
        })

        expect(result.isRigth()).toBe(true);
        expect(inMemoryQuestionRepo.items[0]?.attachments.current).toHaveLength(2);
        expect(inMemoryQuestionRepo.items[0]?.attachments.current).toEqual([
            expect.objectContaining({
                attachmentId: new UniqueEntityID("1"),
                questionId: result.value?.question.id
            }),
            expect.objectContaining({
                attachmentId: new UniqueEntityID("2"),
                questionId: result.value?.question.id
            }),
        ])
    });
});