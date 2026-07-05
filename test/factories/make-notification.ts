import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Notification, NotificationProps } from "@/domain/notification/enterprise/entities/notification";

export function makeNotification(
    override?: NotificationProps,
    id?: UniqueEntityID
) {
    const notification = Notification.create({
        recipientId: "recipient-1",
        title: "new notification",
        content: "notification content",
        ...override
    }, id);

    return notification;
}