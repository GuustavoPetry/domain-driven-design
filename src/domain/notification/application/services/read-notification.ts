import { Either, left, rigth } from "@/core/error/either";
import { NotAllowedError } from "@/core/error/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/error/errors/resource-not-found-error";
import { NotificationRepository } from "../repositories/notification-repository";

interface ReadNotificationRequest {
    recipientId: string;
    notificationId: string;
}

type ReadNotificationResponse = Either<
    ResourceNotFoundError | NotAllowedError,
    {}
>;

export class ReadNotification {
    constructor(private notificationRepo: NotificationRepository) { }

    async execute({
        recipientId,
        notificationId
    }: ReadNotificationRequest): Promise<ReadNotificationResponse> {
        const notification = await this.notificationRepo.findById(notificationId);

        if (!notification) return left(new ResourceNotFoundError());

        const isRecipient: boolean = recipientId === notification.recipientId;

        if (!isRecipient) return left(new NotAllowedError());

        notification.read();

        await this.notificationRepo.save(notification);

        return rigth({});
    }
}