import { Injectable } from '@nestjs/common';
import { FlightProviderPort } from 'src/application/ports/flight-provider.port';
import { NotificationPort } from 'src/application/ports/notification.port';
import { FlightAlertRepository } from 'src/domain/repositories/flight-alert.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class CheckFlightPricesUseCase {
  constructor(
    private readonly flightAlertRepository: FlightAlertRepository,
    private readonly userRepository: UserRepository,
    private readonly flightProvider: FlightProviderPort,
    private readonly notificationPort: NotificationPort,
  ) {}

  async execute(): Promise<void> {
    const alerts = await this.flightAlertRepository.findActive();

    for (const alert of alerts) {
      const offers = await this.flightProvider.searchFlight({
        origin: alert.origin,
        destination: alert.destination,
        departureDate: alert.departureDate,
      });

      const cheapestOffer = offers.sort((a, b) => a.price - b.price)[0];

      if (!cheapestOffer) {
        continue;
      }

      await this.flightAlertRepository.updateLastPrice(
        alert.id!,
        cheapestOffer.price,
      );

      const shouldNotifyByTargetPrice =
        alert.targetPrice && cheapestOffer.price <= alert.targetPrice;

      const shouldNotifyByPriceDrop =
        alert.lastPrice && cheapestOffer.price < alert.lastPrice;

      if (!shouldNotifyByTargetPrice && !shouldNotifyByPriceDrop) {
        continue;
      }

      const user = await this.userRepository.findById(alert.userId);

      if (!user) {
        continue;
      }

      await this.notificationPort.sendMessage({
        chatId: user.telegramChatId,
        message: [
          '🚨 Alerta de preço encontrado!',
          '',
          `✈️ ${alert.origin} → ${alert.destination}`,
          `Data: ${alert.departureDate.toLocaleDateString('pt-BR')}`,
          `Preço atual: R$ ${cheapestOffer.price.toFixed(2)}`,
          `Preço alvo: ${
            alert.targetPrice
              ? `R$ ${alert.targetPrice.toFixed(2)}`
              : 'não informado'
          }`,
          `Fonte: ${cheapestOffer.provider}`,
        ].join('\n'),
      });
    }
  }
}
