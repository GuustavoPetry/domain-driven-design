import { makeQuestion } from "@test/factories/make-question";
import { InMemoryAnswerRepo } from "@test/repositories/in-memory-answer-repo";
import { InMemoryNotificationRepo } from "@test/repositories/in-memory-notification-repository";
import { InMemoryQuestionAttachmentsRepo } from "@test/repositories/in-memory-question-attachments-repo";
import { InMemoryQuestionRepo } from "@test/repositories/in-memory-question-repo";
import { beforeEach, describe, expect, it, MockInstance, vi } from "vitest";
import { OnAnswerCreated } from "./on-answer-created";
import { SendNotification, SendNotificationRequest, SendNotificationResponse } from "../services/send-notification";
import { makeAnswer } from "@test/factories/make-answer";

let inMemoryNotificationRepo: InMemoryNotificationRepo;
let inMemoryQuestionAttachmentsRepo: InMemoryQuestionAttachmentsRepo;
let inMemoryQuestionRepo: InMemoryQuestionRepo;
let inMemoryAnswerRepo: InMemoryAnswerRepo;
let sendNotification: SendNotification;

let sendNotificationExecuteSpy: MockInstance<
    (request: SendNotificationRequest) => Promise<SendNotificationResponse>
>;

describe("On Answer Created Event", () => {
    beforeEach(() => {
        inMemoryNotificationRepo = new InMemoryNotificationRepo();
        inMemoryQuestionAttachmentsRepo = new InMemoryQuestionAttachmentsRepo();
        inMemoryQuestionRepo = new InMemoryQuestionRepo(inMemoryQuestionAttachmentsRepo);
        inMemoryAnswerRepo = new InMemoryAnswerRepo();

        sendNotification = new SendNotification(inMemoryNotificationRepo);
        sendNotificationExecuteSpy = vi.spyOn(sendNotification, "execute");

        new OnAnswerCreated(inMemoryQuestionRepo, sendNotification);
    });

    it("should be able to send a notification when created answer", async () => {
        const question = makeQuestion();

        await inMemoryQuestionRepo.create(question);

        const answer = makeAnswer({ questionId: question.id });

        await inMemoryAnswerRepo.create(answer);

        expect(sendNotificationExecuteSpy).toHaveBeenCalled();
        expect(inMemoryNotificationRepo.items).toHaveLength(1);
    })
});