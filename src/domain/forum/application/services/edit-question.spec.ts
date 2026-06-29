import { makeQuestion } from "@test/factories/make-question";
import { InMemoryQuestionRepo } from "@test/repositories/in-memory-question-repo";
import { beforeEach, describe, expect, it } from "vitest";
import { EditQuestion } from "./edit-question";
import { NotAllowedError } from "@/core/error/errors/not-allowed-error";

let inMemoryQuestionRepo: InMemoryQuestionRepo;
let sut: EditQuestion;

describe("Edit Question Service", () => {
    beforeEach(() => {
        inMemoryQuestionRepo = new InMemoryQuestionRepo();
        sut = new EditQuestion(inMemoryQuestionRepo);
    });

    it("should be able to edit question", async () => {
        const question = makeQuestion({
            title: "Old Title",
            content: "Old Content"
        });

        inMemoryQuestionRepo.create(question);

        await sut.execute({
            authorId: question.authorId.toString(),
            questionId: question.id.toString(),
            title: "New Title",
        });

        expect(inMemoryQuestionRepo.items[0]).toEqual(
            expect.objectContaining({
                title: "New Title",
                content: "Old Content",
            })
        );
    });

    it("should not be able to edit question from another user", async () => {
        const question = makeQuestion();

        inMemoryQuestionRepo.create(question);

        const result = await sut.execute({
            authorId: "Another User",
            questionId: question.id.toString(),
            title: "New Title",
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAllowedError);
    });
});