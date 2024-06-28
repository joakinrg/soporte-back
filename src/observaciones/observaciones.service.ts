import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketEntity } from '../tickets/entity/Ticket.entity';
import { CreateObservacionDto } from './dtos/CreateObservacion.dto';
import { ObservacionesEntity } from './entity/Observaciones.entity';

@Injectable()
export class ObservacionesService {
  //* Constructor
  constructor(
    @InjectRepository(ObservacionesEntity)
    private readonly observacionesRepository: Repository<ObservacionesEntity>,
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  //* Create Observacion
  async addObservacion(
    ticketId: string,
    createObservacion: CreateObservacionDto,
  ) {
    const ticket = await this.ticketRepository.findOneBy({ id: ticketId });
    if (!ticket) {
      throw new NotFoundException('El ticket no existe');
    }

    const observacion = { ...createObservacion, ticket };

    const newObservacion = await this.observacionesRepository.save(observacion);

    if (!newObservacion) {
      throw new BadRequestException('No se pudo crear la observacion');
    }

    return newObservacion;
  }

  //* Get Observaciones
  async getObservaciones() {
    const observaciones = await this.observacionesRepository.find();

    if (!observaciones) {
      throw new NotFoundException('No hay observaciones');
    }

    return observaciones;
  }

  //* Get Observaciones by Ticket
  async getObservacionesByTicket(id: string) {
    const observaciones = await this.observacionesRepository.find({
      where: { ticket: { id: id } },
    });

    if (!observaciones) {
      throw new NotFoundException('No hay observaciones');
    }

    return observaciones;
  }

  //* Get Observacion
  async getObservacion(id: string) {
    const observacion = await this.observacionesRepository.findOneBy({ id });

    if (!observacion) {
      throw new NotFoundException('La observacion no existe');
    }

    return observacion;
  }
}
