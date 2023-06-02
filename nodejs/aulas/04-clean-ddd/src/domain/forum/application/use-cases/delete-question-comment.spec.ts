import { InMemoryQuestionCommentsRepository } from '@/test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from '@/test/factories/make-question-comment'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()

    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('Should be able to delete question comment', async () => {
    const questionComment = makeQuestionComment()

    await inMemoryQuestionCommentsRepository.create(questionComment)
    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(1)

    await sut.execute({
      authorId: questionComment.authorId.toString(),
      questionCommentId: questionComment.id.toString(),
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('Should not be able to delete another user question comment', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryQuestionCommentsRepository.create(questionComment)
    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(1)

    await expect(() => {
      return sut.execute({
        authorId: 'author-2',
        questionCommentId: questionComment.id.toString(),
      })
    }).rejects.toEqual(
      new Error(
        "Not allowed! User doesn't have permission to delete this question comment",
      ),
    )
  })
})