import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AsignateUserDto } from './dtos/AsignateUser.dto';
import { CreateTicketDto } from './dtos/CreateTicket.dto';
import { UpdateTicketStatusDto } from './dtos/UpdateTicketStatus.dto';
import { TicketsService } from './tickets.service';

@ApiTags('Tickets Module')
@Controller('tickets')
export class TicketsController {
  //* Constructor
  constructor(private readonly ticketsService: TicketsService) {}

  //* Create Ticket
  @Post('add')
  async addTicket(@Body() createTicket: CreateTicketDto) {
    return await this.ticketsService.addTicket(createTicket);
  }

  //* Asignate Ticket
  @Patch('asignate/:id')
  async asignateTicket(
    @Param('id') id: string,
    @Body() userId: AsignateUserDto,
  ) {
    return await this.ticketsService.asignateTicket(id, userId);
  }

  //* Get All Tickets
  @Get('list')
  async getAllTickets() {
    return await this.ticketsService.getAllTickets();
  }

  //* Get Tickets By Status
  @Get('list/:status')
  async getTicketsByStatus(@Param('status') status: string) {
    return await this.ticketsService.getAllTicketsByStatus(status);
  }

  //* Get Tickets By User
  @Get('list/user/:id')
  async getTicketsByUser(@Param('id') id: string) {
    return await this.ticketsService.getTicketsByUser(id);
  }

  //* Get Ticket By Id
  @Get('get/:id')
  async getTicketById(@Param('id') id: string) {
    return await this.ticketsService.getTicketById(id);
  }

  //* Update Ticket Status
  @Patch('update/:id')
  async updateTicketStatus(
    @Param('id') id: string,
    @Body() newStatus: Partial<UpdateTicketStatusDto>,
  ) {
    return await this.ticketsService.updateTicketStatus(id, newStatus);
  }

  //* Count Tickets
  @Get('count')
  async countTickets() {
    return await this.ticketsService.countTickets();
  }
}
