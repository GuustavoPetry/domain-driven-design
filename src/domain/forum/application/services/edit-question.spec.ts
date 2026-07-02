import { makeQuestion } from "@test/factories/make-question";
import { InMemoryQuestionRepo } from "@test/repositories/in-memory-question-repo";
import { beforeEach, describe, expect, it } from "vitest";
import { EditQuestion } from "./edit-question";
import { NotAllowedError } from "@/core/error/errors/not-allowed-error";
import { InMemoryQuestionAttachmentsRepo } from "@test/repositories/in-memory-question-attachments-repo";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryQuestionAttachmentsRepo: InMemoryQuestionAttachmentsRepo;
let inMemoryQuestionRepo: InMemoryQuestionRepo;
let sut: EditQuestion;

describe("Edit Question Service", () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentsRepo = new InMemoryQuestionAttachmentsRepo();
        inMemoryQuestionRepo = new InMemoryQuestionRepo(inMemoryQuestionAttachmentsRepo);
        sut = new EditQuestion(
            inMemoryQuestionRepo,
            inMemoryQuestionAttachmentsRepo
        );
    });

    it("should be able to edit question", async () => {
        const question = makeQuestion({
            title: "Old Title",
            content: "Old Content"
        });

        inMemoryQuestionRepo.create(question);

        const result = await sut.execute({
            authorId: question.authorId.toString(),
            questionId: question.id.toString(),
            title: "New Title",
            attachmentIds: ["3", "4"]
        });

        console.log(inMemoryQuestionRepo.items[0]?.attachments.current)

        expect(result.isRigth()).toBe(true);
        expect(inMemoryQuestionRepo.items[0]?.attachments.current).toHaveLength(2);
        expect(inMemoryQuestionRepo.items[0]?.attachments.current).toEqual([
            expect.objectContaining({ attachmentId: new UniqueEntityID("3") }),
            expect.objectContaining({ attachmentId: new UniqueEntityID("4") }),
        ])
    });

    it("should not be able to edit question from another user", async () => {
        const question = makeQuestion();

        inMemoryQuestionRepo.create(question);

        const result = await sut.execute({
            authorId: "Another User",
            questionId: question.id.toString(),
            title: "New Title",
            attachmentIds: []
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAllowedError);
    });
});