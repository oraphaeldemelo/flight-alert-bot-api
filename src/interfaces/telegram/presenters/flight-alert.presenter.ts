import { FlightOffer } from 'src/application/ports/flight-provider.port';
import { FlightAlert } from 'src/domain/entities/flight-alert.entity';

export class FlightAlertPresenter {
  static created(flightAlert: FlightAlert): string {
    return [
      '✈️ Alerta criado com sucesso!',
      '',
      `ID: ${flightAlert.id}`,
      `Origem: ${flightAlert.origin}`,
      `Destino: ${flightAlert.destination}`,
      `Data: ${flightAlert.departureDate.toLocaleDateString('pt-BR')}`,
      `Preço alvo: ${flightAlert.targetPrice ? `R$ ${flightAlert.targetPrice.toFixed(2)}` : 'Não informado'}`,
    ].join('\n');
  }

  static list(flightAlerts: FlightAlert[]): string {
    if (flightAlerts.length === 0) {
      return 'Você ainda não possui alertas de passagem cadastrados.';
    }

    const alerts = flightAlerts.map((alert, index) => {
      return [
        `${index + 1}. ✈️ ${alert.origin} → ${alert.destination}`,
        `ID: ${alert.id}`,
        `Data: ${alert.departureDate.toLocaleDateString('pt-BR')}`,
        `Preço alvo: ${alert.targetPrice ? `R$ ${alert.targetPrice.toFixed(2)}` : 'não informado'}`,
      ].join('\n');
    });

    return ['Seus alertas ativos:', '', alerts.join('\n\n')].join('\n');
  }

  static remove(flightAlert: FlightAlert): string {
    return `🗑️ Alerta de ID: ${flightAlert.id} removido com sucesso.`;
  }

  static searchResult(offers: FlightOffer[]): string {
    if (offers.length === 0) {
      return 'Nenhuma oferta encontrada para essa busca.';
    }

    const formattedOffers = offers.map((offer, index) => {
      return [
        `${index + 1}. ✈️ ${offer.origin} → ${offer.destination}`,
        `Data: ${offer.departureDate.toLocaleDateString('pt-BR')}`,
        `Preço: ${offer.currency} ${offer.price.toFixed(2)}`,
        `Fonte: ${offer.provider}`,
      ].join('\n');
    });

    return ['Ofertas encontradas: ', '', formattedOffers.join('\n\n')].join(
      '\n',
    );
  }
}
