import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoModule } from '../estado/estado.module';
import { TemasModule } from '../temas/temas.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { TicketEntity } from './entity/Ticket.entity';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketEntity]),
    EstadoModule,
    TemasModule,
    UsuariosModule,
  ],

  providers: [TicketsService],
  controllers: [TicketsController],
  exports: [TypeOrmModule],
})
export class TicketsModule {}
