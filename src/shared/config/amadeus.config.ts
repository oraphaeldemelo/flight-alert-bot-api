export type AmadeusConfig = {
  baseUrl: string;
  clientId: string;
  clientSecret: string;
};

export const getAmadeusConfig = (): AmadeusConfig => ({
  baseUrl: process.env.AMADEUS_BASE_URL ?? 'https://test.api.amadeus.com',
  clientId: process.env.AMADEUS_CLIENT_ID ?? '',
  clientSecret: process.env.AMADEUS_CLIENT_SECRET ?? '',
});
