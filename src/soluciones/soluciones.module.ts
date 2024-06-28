import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemasModule } from '../temas/temas.module';
import { TemasService } from '../temas/temas.service';
import { SolucionEntity } from './entity/Soluciones.entity';
import { SolucionesController } from './soluciones.controller';
import { SolucionesService } from './soluciones.service';

@Module({
  imports: [TypeOrmModule.forFeature([SolucionEntity]), TemasModule],
  providers: [SolucionesService, TemasService],
  controllers: [SolucionesController],
})
export class SolucionesModule {}
