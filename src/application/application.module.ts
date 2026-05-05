import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateUserUseCase } from './use-cases/create-user/create-user.usecase';
import { CreateFlightAlertUseCase } from './use-cases/create-flight-alert/create-flight-alert.usecase';
import { ListFlightAlertUseCase } from './use-cases/list-flight-alert/list-flight-alert.usecase';
import { RemoveFlightAlertUseCase } from './use-cases/remove-flight-alert/remove-flight-alert.usecase';
import { FlightsModule } from 'src/infra/flights/flights.module';
import { SearchFlightPriceUseCase } from './use-cases/search-flight-price/search-flight-price.usecase';
import { CheckFlightPricesUseCase } from './use-cases/check-flight-prices/check-flight-prices.usecase';
import { NotificationsModule } from 'src/infra/notifications/notifications.module';

@Module({
  imports: [DatabaseModule, FlightsModule, NotificationsModule],
  providers: [
    CreateUserUseCase,
    CreateFlightAlertUseCase,
    ListFlightAlertUseCase,
    RemoveFlightAlertUseCase,
    SearchFlightPriceUseCase,
    CheckFlightPricesUseCase,
  ],
  exports: [
    CreateUserUseCase,
    CreateFlightAlertUseCase,
    ListFlightAlertUseCase,
    RemoveFlightAlertUseCase,
    SearchFlightPriceUseCase,
    CheckFlightPricesUseCase,
  ],
})
export class ApplicationModule {}
