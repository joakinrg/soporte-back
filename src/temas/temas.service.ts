import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTemasDto } from './dtos/CreateTema.dto';
import { UpdateTemaDto } from './dtos/UpdateTema.dto';
import { TemasEntity } from './entity/Temas.entity';

@Injectable()
export class TemasService {
  //* Constructor
  constructor(
    @InjectRepository(TemasEntity)
    private readonly temasRepository: Repository<TemasEntity>,
  ) {}

  //* Create a new Tema
  async createTema(createTema: CreateTemasDto) {
    const alreadyExists = await this.temasRepository.findOneBy({
      tipoTicket: createTema.tipoTicket,
    });

    if (alreadyExists) {
      throw new BadRequestException('El tipo de Ticket ya existe');
    }

    const tema = { ...createTema };

    const newTema = this.temasRepository.save(tema);

    if (!newTema) {
      throw new BadRequestException('Error al Crear el tipo de Ticket');
    }

    return newTema;
  }

  //* Get all Temas
  async getTemas() {
    const temas = await this.temasRepository.find();

    if (!temas[0]) {
      return new NotFoundException('No se encontraron temas');
    }

    return temas;
  }

  //* Get a single Tema
  async getTemaById(id: number) {
    const tema = await this.temasRepository.findOneBy({ id });

    if (!tema) {
      return new NotFoundException('No se encontró el tema');
    }

    return tema;
  }

  //* Update a Tema
  async updateTema(id: number, updateTema: Partial<UpdateTemaDto>) {
    const tema = await this.temasRepository.findOneBy({ id });

    if (!tema) {
      return new NotFoundException('No se encontró el tema');
    }

    Object.assign(tema, updateTema);

    const updatedTema = await this.temasRepository.save(tema);

    if (!updatedTema) {
      throw new BadRequestException('Error al actualizar el tema');
    }

    return updatedTema;
  }

  //* Delete a Tema
  async deleteTema(id: number) {
    const tema = await this.temasRepository.findOneBy({ id });

    if (!tema) {
      return new NotFoundException('No se encontró el tema');
    }

    return await this.temasRepository.remove(tema);
  }
}
