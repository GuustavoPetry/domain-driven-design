import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question, type QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { faker } from "@faker-js/faker";

export function makeQuestion(
    override?: Partial<QuestionProps>,
    id?: UniqueEntityID
) {
    const question = Question.create({
        title: faker.lorem.sentences(4),
        content: faker.lorem.sentences(8),
        createdAt: new Date(),
        authorId: new UniqueEntityID(),
        ...override
    },
        id
    );

    return question;
}