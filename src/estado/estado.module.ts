import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoEntity } from './entities/estado.entity';
import { EstadoController } from './estado.controller';
import { EstadoService } from './estado.service';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoEntity])],
  controllers: [EstadoController],
  providers: [EstadoService],
  exports: [TypeOrmModule],
})
export class EstadoModule {}
