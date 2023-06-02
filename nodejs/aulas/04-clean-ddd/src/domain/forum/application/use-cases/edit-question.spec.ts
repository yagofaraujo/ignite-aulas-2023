import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository copy'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from '@/test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('Should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(inMemoryQuestionsRepository.items).toHaveLength(1)

    await sut.execute({
      authorId: newQuestion.authorId.toString(),
      questionId: newQuestion.id.toString(),
      title: 'Pergunta teste',
      content: 'Conteudo teste',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Pergunta teste',
      content: 'Conteudo teste',
    })
  })

  it('Should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(inMemoryQuestionsRepository.items).toHaveLength(1)

    await expect(() => {
      return sut.execute({
        authorId: 'author-2',
        questionId: newQuestion.id.toString(),
        title: 'Pergunta teste',
        content: 'Conteudo teste',
      })
    }).rejects.toEqual(
      new Error(
        "Not allowed! User doesn't have permission to edit this question",
      ),
    )
  })
})
