import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { ApplicationModule } from './application/application.module';
import { HttpModule } from './interfaces/http/http.module';
import { TelegramModule } from './interfaces/telegram/telegram.module';
import { SchedulerModule } from './infra/scheduler/scheduler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ApplicationModule,
    HttpModule,
    TelegramModule,
    SchedulerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
