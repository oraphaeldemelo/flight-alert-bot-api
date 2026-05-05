import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ApplicationModule } from 'src/application/application.module';
import { FlightPriceScheduler } from './flight-price.scheduler';

@Module({
  imports: [ScheduleModule.forRoot(), ApplicationModule],
  providers: [FlightPriceScheduler],
})
export class SchedulerModule {}
