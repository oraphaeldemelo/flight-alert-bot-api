import { Injectable } from '@nestjs/common';
import { FlightAlert } from 'src/domain/entities/flight-alert.entity';
import { FlightAlertRepository } from 'src/domain/repositories/flight-alert.repository';

@Injectable()
export class ListFlightAlertUseCase {
  constructor(private readonly flightAlertRepository: FlightAlertRepository) {}

  async execute(userId: string): Promise<FlightAlert[]> {
    const list = await this.flightAlertRepository.findAll(userId);
    return list;
  }
}
