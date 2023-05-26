import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh'

export async function userRoutes(app: FastifyInstance) {
  app.post('/', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /**  Authenticated Routes **/
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
