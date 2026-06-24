import { InMemoryQuestionRepo } from "@test/repositories/in-memory-question-repo";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateQuestion } from "./create-question";

let inMemoryQuestionRepo: InMemoryQuestionRepo;
let sut: CreateQuestion;

describe("Create Question Service", () => {
    beforeEach(() => {
        inMemoryQuestionRepo = new InMemoryQuestionRepo();
        sut = new CreateQuestion(inMemoryQuestionRepo);
    });

    it("should be able to create question", async () => {
        sut.execute({
            title: "new question",
            content: "new content",
            authorId: "author-1"
        })

        expect(inMemoryQuestionRepo.items[0]).toEqual(
            expect.objectContaining({
                title: "new question",
                content: "new content",
                authorId: "author-1"
            })
        );
    });
});