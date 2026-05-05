import { Injectable } from '@nestjs/common';
import {
  FlightOffer,
  FlightProviderPort,
} from 'src/application/ports/flight-provider.port';
import { SearchFlightPriceInput } from './search-flight-price.input';

@Injectable()
export class SearchFlightPriceUseCase {
  constructor(private readonly flightProvider: FlightProviderPort) {}

  async execute(input: SearchFlightPriceInput): Promise<FlightOffer[]> {
    return this.flightProvider.searchFlight({
      origin: input.origin,
      destination: input.destination,
      departureDate: input.departureDate,
    });
  }
}
