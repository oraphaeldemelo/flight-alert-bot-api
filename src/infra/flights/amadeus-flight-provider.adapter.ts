import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  FlightOffer,
  FlightProviderPort,
  SearchFlightInput,
} from 'src/application/ports/flight-provider.port';
import { getAmadeusConfig } from 'src/shared/config/amadeus.config';
import { AppError } from 'src/shared/errors/app-error';

type AmadeusTokenResponse = {
  access_token: string;
  expires_in: number;
};

type AmadeusFlightOfferResponse = {
  data: Array<{
    price: {
      total: string;
      currency: string;
    };
  }>;
};

@Injectable()
export class AmadeusFlightProviderAdapter implements FlightProviderPort {
  private accesToken: string | null = null;
  private tokenExpiresAt: Date | null = null;

  constructor(private readonly httpService: HttpService) {}

  async searchFlight(input: SearchFlightInput): Promise<FlightOffer[]> {
    const token = await this.getAccessToken();

    const config = getAmadeusConfig();

    try {
      const response = await firstValueFrom(
        this.httpService.get<AmadeusFlightOfferResponse>(
          `${config.baseUrl}/v2/shopping/flight-offers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              originLocationCode: input.origin.toUpperCase(),
              destinationLocationCode: input.destination.toUpperCase(),
              departureDate: this.formatDate(input.departureDate),
              adults: 1,
              currencyCode: 'BRL',
              max: 5,
            },
          },
        ),
      );

      return response.data.data.map((offer) => ({
        origin: input.origin.toUpperCase(),
        destination: input.destination.toUpperCase(),
        departureDate: input.departureDate,
        price: Number(offer.price.total),
        currency: offer.price.currency,
        provider: 'Amadeus',
      }));
    } catch {
      throw new AppError({
        message: 'Não foi possivel consultar preços na Amadeus',
        statusCode: 502,
        code: 'AMADEUS_SEARCH_ERROR',
      });
    }
  }

  private async getAccessToken(): Promise<string> {
    if (this.accesToken && this.tokenExpiresAt > new Date()) {
      return this.accesToken;
    }

    const config = getAmadeusConfig();

    try {
      const body = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: config.clientId,
        client_secret: config.clientSecret,
      });

      const response = await firstValueFrom(
        this.httpService.post<AmadeusTokenResponse>(
          `${config.baseUrl}/v1/security/oauth2/token`,
          body,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        ),
      );

      this.accesToken = response.data.access_token;
      this.tokenExpiresAt = new Date(
        Date.now() + response.data.expires_in * 1000 - 60_000,
      );

      return this.accesToken;
    } catch {
      throw new AppError({
        message: 'Não foi possível autenticar na Amadeus',
        statusCode: 502,
        code: 'AMADEUS_AUTH_ERROR',
      });
    }
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
