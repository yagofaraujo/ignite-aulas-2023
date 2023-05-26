import { REFRESH_TOKEN_EXPIRATION, TOKEN_EXPIRATION } from '@/utils/constants'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify({ onlyCookie: true })

    const { role } = request.user

    const token = await reply.jwtSign(
      { role },
      { sign: { sub: request.user.sub, expiresIn: TOKEN_EXPIRATION } },
    )

    const refreshToken = await reply.jwtSign(
      { role },
      { sign: { sub: request.user.sub, expiresIn: REFRESH_TOKEN_EXPIRATION } },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (error: any) {
    if (error.code === 'FST_JWT_AUTHORIZATION_TOKEN_INVALID') {
      return reply
        .status(401)
        .send({ message: 'Invalid refresh token.', code: error.code })
    }

    if (error.code === 'FST_JWT_NO_AUTHORIZATION_IN_COOKIE') {
      return reply
        .status(401)
        .send({ message: 'Inexistent refresh token', code: error.code })
    }

    if (error.code === 'FST_JWT_AUTHORIZATION_TOKEN_EXPIRED') {
      return reply.status(401).send({
        message: 'Expired token: please authenticate again.',
        code: error.code,
      })
    }
  }
}
