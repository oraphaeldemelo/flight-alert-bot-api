import { Module } from '@nestjs/common';
import { FlightProviderPort } from 'src/application/ports/flight-provider.port';
import { FakeFlightProviderAdapter } from './fake-flight-provider.adapter';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: FlightProviderPort,
      useClass: FakeFlightProviderAdapter,
    },
  ],
  exports: [FlightProviderPort],
})
export class FlightsModule {}
