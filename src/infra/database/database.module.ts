import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { PrismaUserRepository } from './repositories/prisma-user.repository';
import { FlightAlertRepository } from 'src/domain/repositories/flight-alert.repository';
import { PrismaFlightAlertRepository } from './repositories/prisma-flight-alert.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: FlightAlertRepository,
      useClass: PrismaFlightAlertRepository,
    },
  ],
  exports: [PrismaService, UserRepository, FlightAlertRepository],
})
export class DatabaseModule {}
