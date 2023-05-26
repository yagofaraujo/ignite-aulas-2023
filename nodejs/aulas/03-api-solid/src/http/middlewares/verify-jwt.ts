import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authorization = String(request.headers.authorization)

    if (authorization.trim() === '' || !authorization.includes('Bearer')) {
      return reply.status(401).send({ message: 'Missing token' })
    }

    await request.jwtVerify()
  } catch (error) {
    console.log(error)
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
