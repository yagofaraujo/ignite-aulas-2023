import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import {
  VALID_LATITUDE,
  VALID_LONGITUDE,
} from '@/utils/latitude-longitude-validation'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return VALID_LATITUDE(value)
    }),
    longitude: z.coerce.number().refine((value) => {
      return VALID_LONGITUDE(value)
    }),
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    latitude,
    longitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
