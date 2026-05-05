import { Injectable } from '@nestjs/common';
import { CreateFlightAlertUseCase } from 'src/application/use-cases/create-flight-alert/create-flight-alert.usecase';
import { CreateUserUseCase } from 'src/application/use-cases/create-user/create-user.usecase';
import { Context } from 'telegraf';
import { AddFlightAlertMessageParser } from '../parsers/add-flight-alert-message.parser';
import { FlightAlertPresenter } from '../presenters/flight-alert.presenter';
import { AppError } from 'src/shared/errors/app-error';

@Injectable()
export class AddFlightAlertCommand {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly createFlightAlertUseCase: CreateFlightAlertUseCase,
  ) {}

  async execute(ctx: Context): Promise<void> {
    try {
      const telegramUser = ctx.from;

      if (!telegramUser) {
        await ctx.reply('Não consegui identificar seu usuário no Telegram');
        return;
      }

      const message = ctx.message;

      if (!message || !('text' in message)) {
        await ctx.reply('Comando inválido.');
        return;
      }

      const parsedMessage = AddFlightAlertMessageParser.parse(message.text);

      const user = await this.createUserUseCase.execute({
        telegramChatId: String(telegramUser.id),
        firstName: telegramUser.first_name,
        username: telegramUser.username,
      });

      if (!user.id) {
        await ctx.reply('Não foi possível identificar o usuário salvo.');
        return;
      }

      const flightAlert = await this.createFlightAlertUseCase.execute({
        userId: user.id,
        origin: parsedMessage.origin,
        destination: parsedMessage.destination,
        departureDate: parsedMessage.departureDate,
        targetPrice: parsedMessage.targetPrice,
      });

      await ctx.reply(FlightAlertPresenter.created(flightAlert));
    } catch (error) {
      if (error instanceof AppError) {
        await ctx.reply(error.message);
        return;
      }
      await ctx.reply('Ocorreu um erro inesperado ao criar o alerta');
    }
  }
}
