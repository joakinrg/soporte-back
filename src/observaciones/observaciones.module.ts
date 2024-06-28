import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsModule } from '../tickets/tickets.module';
import { ObservacionesEntity } from './entity/Observaciones.entity';
import { ObservacionesController } from './observaciones.controller';
import { ObservacionesService } from './observaciones.service';

@Module({
  imports: [TypeOrmModule.forFeature([ObservacionesEntity]), TicketsModule],
  providers: [ObservacionesService],
  controllers: [ObservacionesController],
})
export class ObservacionesModule {}
