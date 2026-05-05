import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import {
  NotificationPort,
  SendMessageInput,
} from 'src/application/ports/notification.port';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramNotificationAdapter implements NotificationPort {
  constructor(@InjectBot() private readonly bot: Telegraf) {}

  async sendMessage(input: SendMessageInput): Promise<void> {
    await this.bot.telegram.sendMessage(input.chatId, input.message);
  }
}
