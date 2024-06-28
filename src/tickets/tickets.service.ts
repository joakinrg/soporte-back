import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoEntity } from '../estado/entities/estado.entity';
import { TemasEntity } from '../temas/entity/Temas.entity';
import { UsuarioEntity } from '../usuarios/entity/Usuario.entity';
import { AsignateUserDto } from './dtos/AsignateUser.dto';
import { CreateTicketDto } from './dtos/CreateTicket.dto';
import { UpdateTicketStatusDto } from './dtos/UpdateTicketStatus.dto';
import { TicketEntity } from './entity/Ticket.entity';

@Injectable()
export class TicketsService {
  //* Constructor
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
    @InjectRepository(TemasEntity)
    private readonly temasRepository: Repository<TemasEntity>,
    @InjectRepository(EstadoEntity)
    private readonly estadoRepository: Repository<EstadoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  //* Create Ticket
  async addTicket(createTicket: CreateTicketDto) {
    const tema = await this.temasRepository.findOneBy({
      tipoTicket: createTicket.tipoTicket,
    });

    if (!tema) {
      throw new NotFoundException('El tipo de ticket no existe');
    }

    const status = await this.estadoRepository.findOneBy({
      tipoEstado: 'en espera',
    });

    if (!status) {
      throw new NotFoundException('El estado no existe');
    }

    let prioridad: number = null;

    if (createTicket.tipoTicket === 'error') {
      prioridad = 0;
    }

    if (createTicket.tipoTicket === 'reporte') {
      prioridad = 1;
    }

    if (createTicket.tipoTicket === 'queja') {
      prioridad = 2;
    }

    if (createTicket.tipoTicket === 'sugerencia') {
      prioridad = 3;
    }

    if (createTicket.tipoTicket === 'otro') {
      prioridad = 4;
    }

    const ticket = {
      ...createTicket,
      tema,
      estado: status,
      prioridad,
    };

    if (!ticket) throw new BadRequestException('No se pudo crear el ticket');

    const newTicket = await this.ticketRepository.save(ticket);

    return newTicket;
  }

  //* Asignate Ticket
  async asignateTicket(ticketId: string, { userId }: AsignateUserDto) {
    const ticket = await this.ticketRepository.findOneBy({ id: ticketId });
    if (!ticket) {
      throw new NotFoundException('El ticket no existe');
    }

    if (ticket.usuario) {
      throw new BadRequestException('El ticket ya tiene un usuario asignado');
    }

    const user = await this.usuarioRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }

    Object.assign(ticket, { usuario: user });

    const updatedTicket = await this.ticketRepository.save(ticket);

    if (!updatedTicket) {
      throw new BadRequestException('No se pudo asignar el ticket');
    }

    return updatedTicket;
  }

  //* Get All Tickets

  async getAllTickets(): Promise<TicketEntity[]> {
    const tickets = await this.ticketRepository.find();

    if (!tickets[0]) throw new NotFoundException('No se encontraron tickets');

    return tickets;
  }

  //* Get All Tickets By Status
  async getAllTicketsByStatus(status: string): Promise<TicketEntity[]> {
    const tickets = await this.ticketRepository.find({
      where: { estado: { tipoEstado: status } },
    });

    if (!tickets[0]) throw new NotFoundException('No se encontraron tickets');

    return tickets;
  }

  //* Get Tickets By User
  async getTicketsByUser(userId: string): Promise<TicketEntity[]> {
    const tickets = await this.ticketRepository.find({
      where: { usuario: { id: userId } },
    });

    if (!tickets[0]) throw new NotFoundException('No se encontraron tickets');

    return tickets;
  }

  //* Get Ticket By Id

  async getTicketById(id: string): Promise<TicketEntity> {
    const ticket = await this.ticketRepository.findOneBy({ id });

    if (!ticket) throw new NotFoundException('No se encontró el ticket');

    return ticket;
  }

  //* Update Ticket Status
  async updateTicketStatus(
    id: string,
    newStatus: Partial<UpdateTicketStatusDto>,
  ) {
    const ticket = await this.ticketRepository.findOneBy({ id });

    if (!ticket) throw new NotFoundException('No se encontró el ticket');

    const status = await this.estadoRepository.findOneBy({
      tipoEstado: newStatus.estado,
    });

    if (!status) throw new NotFoundException('No se encontró el estado');

    if (ticket.estado.tipoEstado === 'resuelto') {
      throw new BadRequestException(
        'El ticket ya está resuelto, no se puede cambiar su estado',
      );
    }

    Object.assign(ticket, { estado: status });

    const updatedTicket = await this.ticketRepository.save(ticket);

    if (!updatedTicket) throw new BadRequestException('No se pudo actualizar');

    return updatedTicket;
  }

  //* Count Tickets

  async countTickets() {
    const totalTickets = await this.ticketRepository.count();

    const solvedTickets = await this.ticketRepository.count({
      where: { estado: { tipoEstado: 'resuelto' } },
    });

    const pendingTickets = await this.ticketRepository.count({
      where: { estado: { tipoEstado: 'pendiente' } },
    });

    const inProgressTickets = await this.ticketRepository.count({
      where: { estado: { tipoEstado: 'en proceso' } },
    });

    const waitingTickets = await this.ticketRepository.count({
      where: { estado: { tipoEstado: 'en espera' } },
    });

    return {
      totalTickets,
      solvedTickets,
      pendingTickets,
      inProgressTickets,
      waitingTickets,
    };
  }
}
