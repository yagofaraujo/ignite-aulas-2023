import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorId: new UniqueEntityId(),
    title: 'Example Question',
    slug: Slug.create('example-question'),
    content: 'Example content',
    ...override,
  })

  return question
}
