import { FlightAlert } from '../entities/flight-alert.entity';

export abstract class FlightAlertRepository {
  abstract create(flightAlert: FlightAlert): Promise<FlightAlert>;

  abstract findByUserId(userId: string): Promise<FlightAlert[]>;

  abstract findById(id: string): Promise<FlightAlert | null>;

  abstract remove(id: string): Promise<FlightAlert>;

  abstract findAll(userId: string): Promise<FlightAlert[]>;

  abstract findActive(): Promise<FlightAlert[]>;

  abstract updateLastPrice(id: string, lastPrice: number): Promise<void>;
}
