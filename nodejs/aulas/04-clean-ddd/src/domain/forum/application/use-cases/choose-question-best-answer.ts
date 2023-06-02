import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'

interface ChooseQuestionBestAnswerUseCaseRequest {
  questionAuthorId: string
  answerId: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    questionAuthorId,
    answerId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Question not found')
    }

    if (questionAuthorId !== question.authorId.toString()) {
      throw new Error(
        "Not allowed! User doesn't have permission to choose best answer",
      )
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return { question }
  }
}
