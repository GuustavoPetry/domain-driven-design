import { EventHandler } from "@/core/events/event-handler";
import { QuestionRepo } from "@/domain/forum/application/repositories/question-repo";
import { SendNotification } from "../services/send-notification";
import { DomainEvents } from "@/core/events/domain-events";
import { AnswerCreatedEvent } from "@/domain/forum/enterprise/events/answer-created-event";

export class OnQuestionCreated implements EventHandler {
    constructor(
        private questionRepo: QuestionRepo,
        private sendNotification: SendNotification
    ) {
        this.setupSubscriptions();
    }

    setupSubscriptions(): void {
        DomainEvents.register(
            this.sendNewQuestionNotification.bind(this),
            AnswerCreatedEvent.name
        )
    }

    private async sendNewQuestionNotification({ answer }: AnswerCreatedEvent) {
        const question = await this.questionRepo.findById(answer.questionId.toString());

        if (question) {
            await this.sendNotification.execute({
                recipientId: question.authorId.toString(),
                title: `Nova Resposta em "${question.title.substring(0, 40).concat("...")}"`,
                content: answer.excerpt,
            })
        }
    }
}