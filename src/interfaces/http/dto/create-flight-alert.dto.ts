import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateFlightAlertDto {
  @IsString()
  userId: string;

  @IsString()
  @Length(3, 3)
  origin: string;

  @IsString()
  @Length(3, 3)
  destination: string;

  @IsDateString()
  departureDate: string;

  @IsOptional()
  @IsNumber()
  targetPrice?: number;
}
