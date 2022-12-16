import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Count recipients notifications', () => {
  it('shoud be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        content: new Content('This is a notification'),
        category: 'social',
        recipientId: 'recipient1',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        content: new Content('This is a notification'),
        category: 'social',
        recipientId: 'recipient1',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        content: new Content('This is a notification'),
        category: 'social',
        recipientId: 'recipient2',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient1',
    });

    expect(count).toEqual(2);
  });
});
