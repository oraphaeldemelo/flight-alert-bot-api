import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateFlightAlertUseCase } from 'src/application/use-cases/create-flight-alert/create-flight-alert.usecase';
import { CreateFlightAlertDto } from './dto/create-flight-alert.dto';
import { RemoveFlightAlertUseCase } from 'src/application/use-cases/remove-flight-alert/remove-flight-alert.usecase';
import { ListFlightAlertUseCase } from 'src/application/use-cases/list-flight-alert/list-flight-alert.usecase';

@Controller('flight-alerts')
export class FlightAlertController {
  constructor(
    private readonly createFlightAlertUseCase: CreateFlightAlertUseCase,
    private readonly listFlightAlertUseCase: ListFlightAlertUseCase,
    private readonly removeFlightAlertUseCase: RemoveFlightAlertUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateFlightAlertDto) {
    const flightAlert = await this.createFlightAlertUseCase.execute({
      userId: body.userId,
      origin: body.origin,
      destination: body.destination,
      departureDate: new Date(body.departureDate),
      targetPrice: body.targetPrice,
    });

    return {
      id: flightAlert.id,
      userId: flightAlert.userId,
      origin: flightAlert.origin,
      destination: flightAlert.destination,
      departureDate: flightAlert.departureDate,
      targetPrice: flightAlert.targetPrice,
      active: flightAlert.active,
    };
  }

  @Get('user/:id')
  async findAll(@Param('id') id: string) {
    const list = await this.listFlightAlertUseCase.execute(id);
    return list;
  }

  @Delete('/:id')
  async remove(@Param('id') flightAlertId: string) {
    const remove = await this.removeFlightAlertUseCase.execute(flightAlertId);
    return {
      id: remove.id,
      active: remove.active,
      updatedAt: remove.updatedAt,
    };
  }
}
