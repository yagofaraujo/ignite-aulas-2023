import { Answer } from '@/domain/forum/enterprise/entities/answer'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
  findById(answerId: string): Promise<Answer | null>
  delete(answer: Answer): Promise<void>
}
