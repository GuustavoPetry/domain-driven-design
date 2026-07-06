import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Answer, AnswerProps } from "@/domain/forum/enterprise/entities/answer";

export function makeAnswer(
    override?: Partial<AnswerProps>,
    id?: UniqueEntityID
) {
    const answer = Answer.create({
        content: "answer content",
        authorId: new UniqueEntityID("author-1"),
        questionId: new UniqueEntityID("question-1"),
        createdAt: new Date(),
        ...override,
    }, id);

    return answer;
}