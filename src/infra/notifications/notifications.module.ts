import { Module } from '@nestjs/common';
import { NotificationPort } from 'src/application/ports/notification.port';
import { TelegramNotificationAdapter } from './telegram-notification.adapter';

@Module({
  providers: [
    TelegramNotificationAdapter,
    {
      provide: NotificationPort,
      useClass: TelegramNotificationAdapter,
    },
  ],
  exports: [NotificationPort],
})
export class NotificationsModule {}
