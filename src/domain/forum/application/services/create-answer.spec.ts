import { makeQuestion } from "@test/factories/make-question";
import { InMemoryAnswerRepo } from "@test/repositories/in-memory-answer-repo";
import { InMemoryQuestionRepo } from "@test/repositories/in-memory-question-repo";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateAnswer } from "./create-answer";
import { InMemoryQuestionAttachmentsRepo } from "@test/repositories/in-memory-question-attachments-repo";
import { makeAnswer } from "@test/factories/make-answer";

let inMemoryQuestionAttachmentRepo: InMemoryQuestionAttachmentsRepo;
let inMemoryQuestionRepo: InMemoryQuestionRepo;
let inMemoryAnswerRepo: InMemoryAnswerRepo;
let sut: CreateAnswer;

describe("Create Answer", () => {
    beforeEach(() => {
        inMemoryQuestionAttachmentRepo = new InMemoryQuestionAttachmentsRepo();
        inMemoryQuestionRepo = new InMemoryQuestionRepo(inMemoryQuestionAttachmentRepo);
        inMemoryAnswerRepo = new InMemoryAnswerRepo();
        sut = new CreateAnswer(inMemoryQuestionRepo, inMemoryAnswerRepo);
    });

    it("should be able to create a answer on question", async () => {
        const question = makeQuestion();

        await inMemoryQuestionRepo.create(question);

        const result = await sut.execute({
            content: "New Answer Created on Question",
            authorId: "author-1",
            questionId: question.id.toString()
        });

        expect(result.isRigth()).toBe(true);
        expect(inMemoryAnswerRepo.items).toHaveLength(1);
    });

    it("should be able to dispatch events when created new answer", async () => {
        const question = makeQuestion();

        await inMemoryQuestionRepo.create(question);

        const answer = makeAnswer();
        expect(answer.domainEvents).toHaveLength(1);

        await inMemoryAnswerRepo.create(answer);
        expect(answer.domainEvents).toHaveLength(0);
    })
});
