import { ValidationError } from 'src/shared/errors/validation.error';

export type FlightAlertProps = {
  id?: string;
  userId: string;
  origin: string;
  destination: string;
  departureDate: Date;
  targetPrice?: number | null;
  lastPrice?: number | null;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export class FlightAlert {
  private readonly props: FlightAlertProps;

  constructor(props: FlightAlertProps) {
    this.props = {
      ...props,
      origin: props.origin.toUpperCase(),
      destination: props.destination.toUpperCase(),
      active: props.active ?? true,
    };

    this.validate();
  }

  private validate(): void {
    if (this.props.origin.length !== 3) {
      throw new ValidationError('Origin airport code must have 3 characters');
    }

    if (this.props.destination.length !== 3) {
      throw new ValidationError(
        'Destination airport code must have 3 characters',
      );
    }

    if (this.props.origin === this.props.destination) {
      throw new ValidationError('Origin and destination cannot be the same');
    }

    if (this.props.targetPrice && this.props.targetPrice <= 0) {
      throw new ValidationError('Target price must be greater than zero');
    }
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get origin(): string {
    return this.props.origin;
  }

  get destination(): string {
    return this.props.destination;
  }

  get departureDate(): Date {
    return this.props.departureDate;
  }

  get targetPrice(): number | null | undefined {
    return this.props.targetPrice;
  }

  get lastPrice(): number | null | undefined {
    return this.props.targetPrice;
  }

  get active(): boolean {
    return this.props.active ?? true;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
}
