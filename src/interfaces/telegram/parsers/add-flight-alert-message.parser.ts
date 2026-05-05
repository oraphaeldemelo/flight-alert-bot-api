import { ValidationError } from 'src/shared/errors/validation.error';

export type AddFlightAlertMessageParserOutput = {
  origin: string;
  destination: string;
  departureDate: Date;
  targetPrice?: number | null;
};

export class AddFlightAlertMessageParser {
  static parse(message: string): AddFlightAlertMessageParserOutput {
    const [, origin, destination, departureDate, targetPrice] = message
      .trim()
      .split(/\s+/);

    if (!origin || !destination || !departureDate) {
      throw new ValidationError(
        [
          'Formato inválido.',
          '',
          'Use assim: ',
          '/adicionar FOR LIS 2026-10-10 3000',
        ].join('\n'),
      );
    }

    const parsedDate = new Date(departureDate);

    if (Number.isNaN(parsedDate.getTime())) {
      throw new ValidationError('Data inválida. Use o formato YYYY-MM-DD');
    }

    const parsedTargetPrice = targetPrice ? Number(targetPrice) : null;

    if (targetPrice && Number.isNaN(parsedTargetPrice)) {
      throw new ValidationError('Preço alvo inválido');
    }

    return {
      origin,
      destination,
      departureDate: parsedDate,
      targetPrice: parsedTargetPrice,
    };
  }
}
