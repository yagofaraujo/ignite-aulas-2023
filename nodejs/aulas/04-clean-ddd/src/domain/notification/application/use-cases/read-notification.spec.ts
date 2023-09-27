import { makeNotification } from '@/test/factories/make-notification'
import { ReadNotificationUseCase } from './read-notification'
import { InMemoryNotificationsRepository } from '@/test/repositories/in-memory-notifications-repository'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Read Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()

    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('Should be able to read a notification', async () => {
    const notification = makeNotification()

    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: notification.recipientId.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date),
    )

    it('Should not be able to read a notification from another user', async () => {
      const newNotification = makeNotification({
        recipientId: new UniqueEntityId('recipient-1'),
      })

      await inMemoryNotificationsRepository.create(newNotification)

      expect(inMemoryNotificationsRepository.items).toHaveLength(1)

      const result = await sut.execute({
        recipientId: 'recipient-2',
        notificationId: newNotification.id.toString(),
      })

      expect(result.isLeft()).toBe(true)
      expect(result.value).toBeInstanceOf(NotAllowedError)
    })
  })
})
