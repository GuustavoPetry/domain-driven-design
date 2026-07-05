import { AggregateRoot } from "../entities/aggregate-root";
import { UniqueEntityID } from "../entities/unique-entity-id";
import { DomainEvent } from "./domain-event";

type DomainEventCallback = (event: any) => void;

export class DomainEvents {
    private static handlersMap: Record<string, DomainEventCallback[]> = {};
    private static markedAggregates: AggregateRoot<any>[] = [];

    private static findAggregateById(id: UniqueEntityID): AggregateRoot<any> | null {
        const aggregate = this.markedAggregates.find((aggregate) => aggregate.id.equals(id));

        return aggregate ?? null;
    }

    public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
        const aggregateFound: boolean = !!this.findAggregateById(aggregate.id);

        if (!aggregateFound) {
            this.markedAggregates.push(aggregate);
        }
    }

    private static dispatch(event: DomainEvent): void {
        const eventClassName: string = event.constructor.name;

        const isEventRegistered: boolean = eventClassName in this.handlersMap;

        if (isEventRegistered) {
            this.handlersMap[eventClassName]?.forEach((handler) => {
                handler(event);
            });
        }
    }

    private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
        aggregate.domainEvents.forEach((event: DomainEvent) => this.dispatch(event));
    }

    private static removeAggregateFromMarkedDispatchList(aggregate: AggregateRoot<any>): void {
        const itemIndex = this.markedAggregates.findIndex((a) => a.equals(aggregate));

        this.markedAggregates.splice(itemIndex, 1);
    }

    private static findMarkedAggregateById(id: UniqueEntityID): AggregateRoot<any> | null {
        const aggregate = this.markedAggregates.find((aggregate) => aggregate.id.equals(id));

        return aggregate ?? null;
    }

    public static dispatchEventsForAggregate(id: UniqueEntityID): void {
        const aggregate = this.findMarkedAggregateById(id);

        if (aggregate) {
            this.dispatchAggregateEvents(aggregate);

            aggregate.clearEvents();

            this.removeAggregateFromMarkedDispatchList(aggregate);
        }
    }

    public static register(
        callback: DomainEventCallback,
        eventClassName: string,
    ): void {
        const wasEventRegisterBefore: boolean = eventClassName in this.handlersMap;

        if (!wasEventRegisterBefore) {
            this.handlersMap[eventClassName] = [];
        }

        this.handlersMap[eventClassName]?.push(callback);
    }

    public static clearHandlers(): void {
        this.handlersMap = {};
    }

    public static clearMarkedAggregates(): void {
        this.markedAggregates = [];
    }
}