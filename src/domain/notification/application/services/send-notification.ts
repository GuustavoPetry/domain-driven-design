import { Either, rigth } from "@/core/error/either";
import { Notification } from "../../enterprise/entities/notification";
import { NotificationRepository } from "../repositories/notification-repository";

export interface SendNotificationRequest {
    recipientId: string;
    title: string;
    content: string;
}

export type SendNotificationResponse = Either<
    null,
    {
        notification: Notification;
    }
>;

export class SendNotification {
    constructor(private notificationRepo: NotificationRepository) { }

    async execute({
        recipientId,
        title,
        content
    }: SendNotificationRequest): Promise<SendNotificationResponse> {
        const notification = Notification.create({
            recipientId,
            title,
            content
        });

        await this.notificationRepo.create(notification);

        return rigth({ notification });
    }
}