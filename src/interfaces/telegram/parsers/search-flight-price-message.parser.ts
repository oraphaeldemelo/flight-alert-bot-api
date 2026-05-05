import { ValidationError } from 'src/shared/errors/validation.error';

export type SearchFlightPriceMessageParserOutput = {
  origin: string;
  destination: string;
  departureDate: Date;
};

export class SearchFlightPriceMessageParser {
  static parse(message: string): SearchFlightPriceMessageParserOutput {
    const [, origin, destination, departureDate] = message.trim().split(/\s+/);

    if (!origin || !destination || !departureDate) {
      throw new ValidationError(
        [
          'Formato inválido.',
          '',
          'Use assim:',
          '/consultar FOR LIS 2026-10-10',
        ].join('\n'),
      );
    }

    const parsedDate = new Date(departureDate);

    if (Number.isNaN(parsedDate.getTime())) {
      throw new ValidationError('Data inválida. Use o formato YYYY-MM-DD');
    }

    return {
      origin,
      destination,
      departureDate: parsedDate,
    };
  }
}
