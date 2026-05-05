import { ValidationError } from 'src/shared/errors/validation.error';

export type RemoveFlightAlertMessageParserOutput = {
  id: string;
};

export class RemoveFlightAlertMessageParser {
  static parse(message: string): RemoveFlightAlertMessageParserOutput {
    const [, id] = message.trim().split(/\s+/);
    if (!id) {
      throw new ValidationError(
        ['Formato inválido', '', 'Use assim: ', '/remover ID_DO_ALERTA'].join(
          '\n',
        ),
      );
    }

    return { id };
  }
}
