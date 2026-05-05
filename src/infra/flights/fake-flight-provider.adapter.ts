import { Injectable } from '@nestjs/common';
import {
  FlightOffer,
  FlightProviderPort,
  SearchFlightInput,
} from 'src/application/ports/flight-provider.port';

@Injectable()
export class FakeFlightProviderAdapter implements FlightProviderPort {
  async searchFlight(input: SearchFlightInput): Promise<FlightOffer[]> {
    const basePrice = 2850;
    const variation = Math.random() * 1000;
    const offers = [
      {
        origin: input.origin.toUpperCase(),
        destination: input.destination.toUpperCase(),
        departureDate: input.departureDate,
        price: Math.round(basePrice + variation),
        currency: 'BRL',
        provider: 'FakeFlightProvider',
      },
    ];

    const trend = Math.random();

    if (trend > 0.7) {
      offers[0].price -= 500;
    }

    return offers;
  }
}
