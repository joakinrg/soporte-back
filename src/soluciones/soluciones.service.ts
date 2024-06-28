import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemasEntity } from '../temas/entity/Temas.entity';
import { CreateSolutionDto } from './dtos/CreateSolution.dto';
import { SolucionEntity } from './entity/Soluciones.entity';

@Injectable()
export class SolucionesService {
  //* Constructor
  constructor(
    @InjectRepository(SolucionEntity)
    private readonly solucionesRepository: Repository<SolucionEntity>,
    @InjectRepository(TemasEntity)
    private readonly temasRepository: Repository<TemasEntity>,
  ) {}

  //* Create a new solution
  async createSolution(createSolution: CreateSolutionDto) {
    const tema = await this.temasRepository.findOneBy({
      tipoTicket: createSolution.tipoTicket,
    });

    if (!tema) {
      return new BadRequestException('El tipo de ticket no existe');
    }

    return await this.solucionesRepository.save({
      ...createSolution,
      tema,
    });
  }

  //* Get All solutions
  async getAllSolutions() {
    const solutions = await this.solucionesRepository.find();
    if (!solutions[0]) {
      return new NotFoundException('No se encontraron soluciones');
    }

    return solutions;
  }
  //* Get a single solution
  async getSolutionById(id: string) {
    const solution = await this.solucionesRepository.findOneBy({ id });
    if (!solution) {
      return new NotFoundException('No se encontró la solución');
    }

    return solution;
  }
}
