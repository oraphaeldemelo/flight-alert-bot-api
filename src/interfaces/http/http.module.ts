import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { FlightAlertController } from './flight-alert.controller';
import { UserController } from './user.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [FlightAlertController, UserController],
})
export class HttpModule {}
