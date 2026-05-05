import { Injectable } from '@nestjs/common';
import { FlightAlert } from 'src/domain/entities/flight-alert.entity';
import { FlightAlertRepository } from 'src/domain/repositories/flight-alert.repository';
import { CreateFlightAlertInput } from './create-flight-alert.input';

@Injectable()
export class CreateFlightAlertUseCase {
  constructor(private readonly flightAlertRepositor: FlightAlertRepository) {}

  async execute(input: CreateFlightAlertInput): Promise<FlightAlert> {
    const flightAlert = new FlightAlert({
      userId: input.userId,
      origin: input.origin,
      destination: input.destination,
      departureDate: input.departureDate,
      targetPrice: input.targetPrice,
    });

    return this.flightAlertRepositor.create(flightAlert);
  }
}
