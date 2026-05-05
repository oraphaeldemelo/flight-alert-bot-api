import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/use-cases/create-user/create-user.usecase';
import { ListFlightAlertUseCase } from 'src/application/use-cases/list-flight-alert/list-flight-alert.usecase';
import { Context } from 'telegraf';
import { FlightAlertPresenter } from '../presenters/flight-alert.presenter';
import { AppError } from 'src/shared/errors/app-error';

@Injectable()
export class ListFlightAlertsCommand {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listFlightAlertUseCase: ListFlightAlertUseCase,
  ) {}

  async execute(ctx: Context): Promise<void> {
    try {
      const telegramUser = ctx.from;

      if (!telegramUser) {
        await ctx.reply('Não consegui identificar seu usuário no Telegram.');
        return;
      }

      const user = await this.createUserUseCase.execute({
        telegramChatId: String(telegramUser.id),
        firstName: telegramUser.first_name,
        username: telegramUser.username,
      });

      if (!user.id) {
        await ctx.reply('Não foi possível identificar o usuário salvo.');
        return;
      }

      const flightAlerts = await this.listFlightAlertUseCase.execute(user.id);

      await ctx.reply(FlightAlertPresenter.list(flightAlerts));
    } catch (error) {
      if (error instanceof AppError) {
        await ctx.reply(error.message);
        return;
      }

      await ctx.reply('Ocorreu um erro inesperado ao listar seus alertas');
    }
  }
}
