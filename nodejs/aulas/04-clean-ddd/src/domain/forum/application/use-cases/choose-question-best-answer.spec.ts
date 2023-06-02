import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository copy'
import { makeQuestion } from '@/test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { makeAnswer } from '@/test/factories/make-answer'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('Should be able to choose the question best answer', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    expect(inMemoryQuestionsRepository.items).toHaveLength(1)

    await sut.execute({
      answerId: answer.id.toString(),
      questionAuthorId: question.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('Should not be able to choose another useer question best answer', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })

    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    expect(inMemoryQuestionsRepository.items).toHaveLength(1)

    await expect(() => {
      return sut.execute({
        answerId: answer.id.toString(),
        questionAuthorId: 'author-2',
      })
    }).rejects.toEqual(
      new Error(
        "Not allowed! User doesn't have permission to choose best answer",
      ),
    )
  })
})
