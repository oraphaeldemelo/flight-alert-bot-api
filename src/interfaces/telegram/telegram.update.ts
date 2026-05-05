import { Command, Ctx, Start, Update } from 'nestjs-telegraf';
import { CreateUserUseCase } from 'src/application/use-cases/create-user/create-user.usecase';
import { Context } from 'telegraf';
import { AddFlightAlertCommand } from './commands/add-flight-alert.command';
import { ListFlightAlertsCommand } from './commands/list-flight-alerts.command';
import { RemoveFlightAlertCommand } from './commands/remove-flight-alert.command';
import { SearchFlightPriceCommand } from './commands/search-flight-price.command';

@Update()
export class TelegramUpdate {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly addFlightAlertCommand: AddFlightAlertCommand,
    private readonly listFlightAlertsCommand: ListFlightAlertsCommand,
    private readonly removeFlightAlertCommand: RemoveFlightAlertCommand,
    private readonly searchFlightPriceCommand: SearchFlightPriceCommand,
  ) {}

  @Start()
  async start(@Ctx() ctx: Context): Promise<void> {
    const telegramUser = ctx.from;

    if (!telegramUser) {
      await ctx.reply('Não consegui identificar seu usário no Telegram');
      return;
    }

    const user = await this.createUserUseCase.execute({
      telegramChatId: String(telegramUser.id),
      firstName: telegramUser.first_name,
      username: telegramUser.username,
    });

    await ctx.reply(
      [
        `Olá, ${user.firstName ?? 'usuario'}!`,
        '',
        'Seu Bot de alertas de passagens está ativo.',
        '',
        'Comandos disponíveis:',
        '/adicionar FOR LIS 2026-10-10 3000',
        '/listar',
        '/remover ID_DO_ALERTA',
      ].join('\n'),
    );
  }

  @Command('adicionar')
  async addFlightAlert(@Ctx() ctx: Context): Promise<void> {
    await this.addFlightAlertCommand.execute(ctx);
  }

  @Command('listar')
  async listFlightAlerts(@Ctx() ctx: Context): Promise<void> {
    await this.listFlightAlertsCommand.execute(ctx);
  }

  @Command('remover')
  async removeFlightAlert(@Ctx() ctx: Context): Promise<void> {
    await this.removeFlightAlertCommand.execute(ctx);
  }

  @Command('consultar')
  async searchFlightPrice(@Ctx() ctx: Context): Promise<void> {
    await this.searchFlightPriceCommand.execute(ctx);
  }
}
