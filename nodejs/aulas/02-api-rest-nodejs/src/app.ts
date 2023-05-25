import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { transactionsRoutes } from './routes/transactions'

export const app = fastify()

app.register(cookie)

// Maneira de implementar um middleware global (que será usado em todas as rotas)
app.addHook('preHandler', (request, reply, done) => {
  console.log(`${request.method} ${request.url}`)
  done()
})

app.register(transactionsRoutes, {
  prefix: 'transactions',
})

app.get('/hello', async (request, reply) => {
  return reply.status(200).send({ message: 'Hello world!' })
})
