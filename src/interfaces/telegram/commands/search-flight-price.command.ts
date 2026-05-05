import { Injectable } from '@nestjs/common';
import { SearchFlightPriceUseCase } from 'src/application/use-cases/search-flight-price/search-flight-price.usecase';
import { Context } from 'telegraf';
import { SearchFlightPriceMessageParser } from '../parsers/search-flight-price-message.parser';
import { FlightAlertPresenter } from '../presenters/flight-alert.presenter';
import { AppError } from 'src/shared/errors/app-error';

@Injectable()
export class SearchFlightPriceCommand {
  constructor(
    private readonly searchFlightPriceUseCase: SearchFlightPriceUseCase,
  ) {}

  async execute(ctx: Context): Promise<void> {
    try {
      const message = ctx.message;

      if (!message || !('text' in message)) {
        await ctx.reply('Comando inválido');
        return;
      }

      const parsedMessage = SearchFlightPriceMessageParser.parse(message.text);

      const offers = await this.searchFlightPriceUseCase.execute({
        origin: parsedMessage.origin,
        destination: parsedMessage.destination,
        departureDate: parsedMessage.departureDate,
      });

      await ctx.reply(FlightAlertPresenter.searchResult(offers));
    } catch (error) {
      if (error instanceof AppError) {
        await ctx.reply(error.message);
        return;
      }
      await ctx.reply('Ocorreu um erro inesperado ao consultar o preço.');
    }
  }
}
