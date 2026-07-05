import { InMemoryNotificationRepo } from "@test/repositories/in-memory-notification-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SendNotification } from "./send-notification";
import { makeNotification } from "@test/factories/make-notification";

let inMemoryNotificationRepo: InMemoryNotificationRepo;
let sut: SendNotification;

describe("Send Notification", () => {
    beforeEach(() => {
        inMemoryNotificationRepo = new InMemoryNotificationRepo();
        sut = new SendNotification(inMemoryNotificationRepo);
    });

    it("should be able to send notification", async () => {
        const notification = makeNotification();

        const result = await sut.execute({
            recipientId: notification.recipientId,
            title: notification.title,
            content: notification.content,
        });

        expect(result.isRigth()).toBe(true);
        expect(inMemoryNotificationRepo.items).toHaveLength(1);
        expect(inMemoryNotificationRepo.items[0]).toEqual(result.value?.notification);
    });
});