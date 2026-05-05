import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/use-cases/create-user/create-user.usecase';
import { RemoveFlightAlertUseCase } from 'src/application/use-cases/remove-flight-alert/remove-flight-alert.usecase';
import { Context } from 'telegraf';
import { RemoveFlightAlertMessageParser } from '../parsers/remove-flight-alert-message.parser';
import { FlightAlertPresenter } from '../presenters/flight-alert.presenter';
import { AppError } from 'src/shared/errors/app-error';

@Injectable()
export class RemoveFlightAlertCommand {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly removeFlightAlertUseCase: RemoveFlightAlertUseCase,
  ) {}

  async execute(ctx: Context): Promise<void> {
    try {
      const telegramUser = ctx.from;

      if (!telegramUser) {
        await ctx.reply('Não consegui identificar seu usuário no Telegram.');
        return;
      }

      const message = ctx.message;

      if (!message || !('text' in message)) {
        await ctx.reply('Comando inválido.');
        return;
      }

      const parsedMessage = RemoveFlightAlertMessageParser.parse(message.text);

      const user = await this.createUserUseCase.execute({
        telegramChatId: String(telegramUser.id),
        firstName: telegramUser.first_name,
        username: telegramUser.username,
      });

      if (!user.id) {
        await ctx.reply('Não foi possível identificar o usuário salvo.');
        return;
      }

      const alertRemoved = await this.removeFlightAlertUseCase.execute(
        parsedMessage.id,
        user.id,
      );

      await ctx.reply(FlightAlertPresenter.remove(alertRemoved));
    } catch (error) {
      if (error instanceof AppError) {
        await ctx.reply(error.message);
        return;
      }
      await ctx.reply('Ocorreu um erro inesperado ao remover o alerta.');
    }
  }
}
