import { DomainEvents } from "@/core/events/domain-events";
import type { AnswerRepo } from "@/domain/forum/application/repositories/answer-repo";
import type { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswerRepo implements AnswerRepo {
    public items: Answer[] = [];

    async create(answer: Answer) {
        this.items.push(answer);

        DomainEvents.dispatchEventsForAggregate(answer.id);
    }
}