import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { EstadoEntity } from './entities/estado.entity';

@Injectable()
export class EstadoService {
  //* Constructor
  constructor(
    @InjectRepository(EstadoEntity)
    private estadoRepository: Repository<EstadoEntity>,
  ) {}

  //* Create New Status
  async createStatus(createEstado: CreateEstadoDto) {
    const alreadyExists = await this.estadoRepository.findOneBy({
      tipoEstado: createEstado.tipoEstado,
    });

    if (alreadyExists) {
      throw new BadRequestException('El estado ya existe');
    }
    const status = { ...createEstado };

    const newStatus = await this.estadoRepository.save(status);

    if (!newStatus) {
      throw new BadRequestException('Error al crear el estado');
    }

    return newStatus;
  }

  //* Get All Status
  async findAllStatus() {
    const status = await this.estadoRepository.find();

    if (!status[0]) {
      throw new NotFoundException('No se encontraron estados');
    }

    return status;
  }

  //* Get One Status
  async findOneStatus(id: number) {
    const status = await this.estadoRepository.findOneBy({ id });

    if (!status) {
      throw new NotFoundException('Estado no encontrado');
    }

    return status;
  }

  //* Update Status
  async updateStatus(id: number, updateEstado: Partial<UpdateEstadoDto>) {
    const status = await this.estadoRepository.findOneBy({ id });

    if (!status) {
      throw new NotFoundException('Estado no encontrado');
    }

    Object.assign(status, updateEstado);

    const updatedStatus = await this.estadoRepository.save(status);

    if (!updatedStatus) {
      throw new BadRequestException('Error al actualizar el estado');
    }

    return updatedStatus;
  }

  //* Remove Status
  async removeStatus(id: number) {
    const status = await this.estadoRepository.findOneBy({ id });

    if (!status) {
      throw new NotFoundException('Estado no encontrado');
    }

    return this.estadoRepository.remove(status);
  }
}
