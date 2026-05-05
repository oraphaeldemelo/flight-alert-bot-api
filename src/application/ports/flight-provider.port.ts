export type SearchFlightInput = {
  origin: string;
  destination: string;
  departureDate: Date;
};

export type FlightOffer = {
  origin: string;
  destination: string;
  departureDate: Date;
  price: number;
  currency: string;
  provider: string;
};

export abstract class FlightProviderPort {
  abstract searchFlight(input: SearchFlightInput): Promise<FlightOffer[]>;
}
