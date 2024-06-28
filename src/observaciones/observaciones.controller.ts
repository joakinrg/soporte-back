import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateObservacionDto } from './dtos/CreateObservacion.dto';
import { ObservacionesService } from './observaciones.service';

@ApiTags('Observaciones Module')
@Controller('observaciones')
export class ObservacionesController {
  //* Constructor
  constructor(private readonly observacionesService: ObservacionesService) {}

  //* Create Observacion
  @Post('create/:ticketId')
  async addObservacion(
    @Param('ticketId') ticketId: string,
    @Body() createObservacion: CreateObservacionDto,
  ) {
    return await this.observacionesService.addObservacion(
      ticketId,
      createObservacion,
    );
  }

  //* Get Observaciones
  @Get('list')
  async getObservaciones() {
    return await this.observacionesService.getObservaciones();
  }

  //* Get Observaciones by Ticket
  @Get('list/:ticketId')
  async getObservacionesByTicket(@Param('ticketId') ticketId: string) {
    return await this.observacionesService.getObservacionesByTicket(ticketId);
  }

  //* Get Observacion

  @Get('get/:id')
  async getObservacion(@Param('id') id: string) {
    return await this.observacionesService.getObservacion(id);
  }
}
