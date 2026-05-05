import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { ApplicationModule } from 'src/application/application.module';
import { TelegramUpdate } from './telegram.update';
import { AddFlightAlertCommand } from './commands/add-flight-alert.command';
import { ListFlightAlertsCommand } from './commands/list-flight-alerts.command';
import { RemoveFlightAlertCommand } from './commands/remove-flight-alert.command';
import { SearchFlightPriceCommand } from './commands/search-flight-price.command';

@Module({
  imports: [
    ApplicationModule,
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN'),
      }),
    }),
  ],
  providers: [
    TelegramUpdate,
    AddFlightAlertCommand,
    ListFlightAlertsCommand,
    RemoveFlightAlertCommand,
    SearchFlightPriceCommand,
  ],
})
export class TelegramModule {}
