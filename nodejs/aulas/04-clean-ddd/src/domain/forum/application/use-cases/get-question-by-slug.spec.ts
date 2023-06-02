import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository copy'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from '@/test/factories/make-question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it.only('Should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.isRight()).toBe(true)

    expect(result.value?.question.id).toBeTruthy()
    expect(result.value?.question.title).toEqual(newQuestion.title)

    // if (result.isRight()) {
    //   expect(result.value.question.title).toEqual(newQuestion.title)
    //   expect(result.value.question.content).toEqual(newQuestion.content)
    // }
  })
})
