import { Injectable } from '@nestjs/common';
import { FlightAlert } from 'src/domain/entities/flight-alert.entity';
import { FlightAlertRepository } from 'src/domain/repositories/flight-alert.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaFlightAlertRepository implements FlightAlertRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(flightAlert: FlightAlert): Promise<FlightAlert> {
    const createdFlightAlert = await this.prisma.flightAlert.create({
      data: {
        userId: flightAlert.userId,
        origin: flightAlert.origin,
        destination: flightAlert.destination,
        departureDate: flightAlert.departureDate,
        targetPrice: flightAlert.targetPrice,
        lastPrice: flightAlert.lastPrice,
        active: flightAlert.active,
      },
    });

    return new FlightAlert({
      id: createdFlightAlert.id,
      userId: createdFlightAlert.userId,
      origin: createdFlightAlert.origin,
      destination: createdFlightAlert.destination,
      departureDate: createdFlightAlert.departureDate,
      targetPrice: createdFlightAlert.targetPrice
        ? Number(createdFlightAlert.targetPrice)
        : null,
      lastPrice: createdFlightAlert.lastPrice
        ? Number(createdFlightAlert.lastPrice)
        : null,
      active: createdFlightAlert.active,
      createdAt: createdFlightAlert.createdAt,
      updatedAt: createdFlightAlert.updatedAt,
    });
  }

  async findByUserId(userId: string): Promise<FlightAlert[]> {
    const alerts = await this.prisma.flightAlert.findMany({
      where: {
        userId,
        active: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return alerts.map(
      (alert) =>
        new FlightAlert({
          id: alert.id,
          userId: alert.userId,
          origin: alert.origin,
          destination: alert.destination,
          departureDate: alert.departureDate,
          targetPrice: alert.targetPrice ? Number(alert.targetPrice) : null,
          lastPrice: alert.lastPrice ? Number(alert.lastPrice) : null,
          active: alert.active,
          createdAt: alert.createdAt,
          updatedAt: alert.updatedAt,
        }),
    );
  }

  async findById(id: string): Promise<FlightAlert | null> {
    const alert = await this.prisma.flightAlert.findUnique({
      where: {
        id,
      },
    });

    if (!alert) return null;

    return new FlightAlert({
      id: alert.id,
      userId: alert.userId,
      origin: alert.origin,
      destination: alert.destination,
      departureDate: alert.departureDate,
      targetPrice: alert.targetPrice ? Number(alert.targetPrice) : null,
      lastPrice: alert.lastPrice ? Number(alert.lastPrice) : null,
      active: alert.active,
      createdAt: alert.createdAt,
      updatedAt: alert.updatedAt,
    });
  }

  async remove(id: string): Promise<FlightAlert> {
    const alertRemoved = await this.prisma.flightAlert.update({
      where: {
        id,
      },
      data: {
        active: false,
        updatedAt: new Date(),
      },
    });

    return new FlightAlert({
      id: alertRemoved.id,
      userId: alertRemoved.userId,
      origin: alertRemoved.origin,
      destination: alertRemoved.destination,
      departureDate: alertRemoved.departureDate,
      targetPrice: alertRemoved.targetPrice
        ? Number(alertRemoved.targetPrice)
        : null,
      lastPrice: alertRemoved.lastPrice ? Number(alertRemoved.lastPrice) : null,
      active: alertRemoved.active,
      createdAt: alertRemoved.createdAt,
      updatedAt: alertRemoved.updatedAt,
    });
  }

  async findAll(userId: string): Promise<FlightAlert[]> {
    const alerts = await this.prisma.flightAlert.findMany({
      where: {
        userId,
        active: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return alerts.map(
      (alert) =>
        new FlightAlert({
          id: alert.id,
          userId: alert.userId,
          origin: alert.origin,
          destination: alert.destination,
          departureDate: alert.departureDate,
          targetPrice: alert.targetPrice ? Number(alert.targetPrice) : null,
          lastPrice: alert.lastPrice ? Number(alert.lastPrice) : null,
          active: alert.active,
          createdAt: alert.createdAt,
          updatedAt: alert.updatedAt,
        }),
    );
  }

  async findActive(): Promise<FlightAlert[]> {
    const alerts = this.prisma.flightAlert.findMany({
      where: { active: true },
      orderBy: { createdAt: 'asc' },
    });

    return (await alerts).map(
      (alert) =>
        new FlightAlert({
          id: alert.id,
          userId: alert.userId,
          origin: alert.origin,
          destination: alert.destination,
          departureDate: alert.departureDate,
          targetPrice: alert.targetPrice ? Number(alert.targetPrice) : null,
          lastPrice: alert.lastPrice ? Number(alert.lastPrice) : null,
          active: alert.active,
          createdAt: alert.createdAt,
        }),
    );
  }

  async updateLastPrice(id: string, lastPrice: number): Promise<void> {
    await this.prisma.flightAlert.update({
      where: {
        id,
      },
      data: { lastPrice },
    });
  }
}
