import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CheckFlightPricesUseCase } from 'src/application/use-cases/check-flight-prices/check-flight-prices.usecase';

@Injectable()
export class FlightPriceScheduler {
  constructor(
    private readonly checkFlightPricesUseCase: CheckFlightPricesUseCase,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron(): Promise<void> {
    await this.checkFlightPricesUseCase.execute();
  }
}
