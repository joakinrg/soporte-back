import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemasEntity } from './entity/Temas.entity';
import { TemasController } from './temas.controller';
import { TemasService } from './temas.service';

@Module({
  imports: [TypeOrmModule.forFeature([TemasEntity])],
  providers: [TemasService],
  controllers: [TemasController],
  exports: [TypeOrmModule],
})
export class TemasModule {}
