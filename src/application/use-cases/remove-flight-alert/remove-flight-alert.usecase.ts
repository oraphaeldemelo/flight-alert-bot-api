import { Injectable } from '@nestjs/common';
import { FlightAlert } from 'src/domain/entities/flight-alert.entity';
import { FlightAlertRepository } from 'src/domain/repositories/flight-alert.repository';
import { NotFoundError } from 'src/shared/errors/not-found.error';
import { ValidationError } from 'src/shared/errors/validation.error';

@Injectable()
export class RemoveFlightAlertUseCase {
  constructor(private readonly flightAlertRepository: FlightAlertRepository) {}

  async execute(flightAlertId: string, userId?: string): Promise<FlightAlert> {
    const flightAlert =
      await this.flightAlertRepository.findById(flightAlertId);

    if (!flightAlert) {
      throw new NotFoundError('Flight alert not found');
    }

    if (flightAlert.userId !== userId) {
      throw new ValidationError(
        'Você não tem permissão para remover este alerta.',
      );
    }
    return await this.flightAlertRepository.remove(flightAlertId);
  }
}
