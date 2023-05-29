import { AnswerQuestionUseCase } from "./answer-question";
import { AnswersRepository } from "../repositories/answers-repository";
import { Answer } from "../entities/answer";

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return 
  }
}

describe('Answer', () => {
  it('Should be able to create an answer', async () => {
    const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswersRepository)

    const answer = await answerQuestionUseCase.execute({
      authorId: '1',
      questionId: '1',
      content: 'Nova resposta'
    })

    expect(answer.content).toEqual('Nova resposta')
  })
})