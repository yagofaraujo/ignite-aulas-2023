import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    /* 
    CENÁRIO: PARA CRIAR UM CHECK-IN, PRECISAMOS TER UMA ACADEMIA (GYM) CRIADA
    
    EM CENÁRIOS QUE NÃO POSSUÍMOS UMA ROTA PARA CRIAÇÃO DE UM DETERMINADO RECURSO
    (NESTE CASO, POR EXEMPLO, "GYMS"), PODEMOS INCLUIR O REGISTRO  DE DEPENDÊNCIA
    DIRETO PELO REPOSITÓRIO DO ORM 
    */

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '11999999999',
        latitude: -3.7884674,
        longitude: -38.5795397,
      },
    })

    const response = await request(app.server)
      .post(`/check-ins/${gym.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userLatitude: -3.7884674,
        userLongitude: -38.5795397,
      })

    expect(response.statusCode).toEqual(201)
  })
})
