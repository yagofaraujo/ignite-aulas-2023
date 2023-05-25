import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import {
  VALID_LATITUDE,
  VALID_LONGITUDE,
} from '@/utils/latitude-longitude-validation'
import { makeCheckInUseCaseUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    userLatitude: z.number().refine((value) => {
      return VALID_LATITUDE(value)
    }),
    userLongitude: z.number().refine((value) => {
      return VALID_LONGITUDE(value)
    }),
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)

  const { userLatitude, userLongitude } = createCheckInBodySchema.parse(
    request.body,
  )

  const checkInUseCase = makeCheckInUseCaseUseCase()

  await checkInUseCase.execute({
    userId: request.user.sub,
    gymId,
    userLatitude,
    userLongitude,
  })

  return reply.status(201).send()
}
