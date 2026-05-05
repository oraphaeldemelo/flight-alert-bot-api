export type CreateFlightAlertInput = {
  userId: string;
  origin: string;
  destination: string;
  departureDate: Date;
  targetPrice?: number | null;
};
