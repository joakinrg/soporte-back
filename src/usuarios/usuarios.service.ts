import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dtos/CreateUsuario.dto';
import { UpdateUsuarioDto } from './dtos/UpdateUsuario.dto';
import { UsuarioEntity } from './entity/Usuario.entity';

@Injectable()
export class UsuariosService {
  //* Constructor
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  //* Create New User
  async createUser(createUser: CreateUsuarioDto): Promise<UsuarioEntity> {
    const alreadyExists = await this.getUserByEmail(createUser.email);

    if (alreadyExists[0]) {
      throw new BadRequestException(
        'El correo ingresado ya se encuentra registrado',
      );
    }

    const salt = bcrypt.genSaltSync();

    createUser.password = await bcrypt.hash(createUser.password, salt);

    const user = { ...createUser };

    return await this.usuarioRepository.save(user);
  }

  //* Get All Users
  async getAllUsers(): Promise<UsuarioEntity[]> {
    const users = await this.usuarioRepository.find();

    if (!users[0]) {
      throw new NotFoundException('Usuarios no encontrados');
    }

    return users;
  }

  //* Get User By ID
  async getUserById(id: string): Promise<UsuarioEntity> {
    const user = await this.usuarioRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  //* Get User By Email
  async getUserByEmail(email: string): Promise<UsuarioEntity[]> {
    const user = await this.usuarioRepository.find({ where: { email } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  //* Update User
  async updateUser(id: string, data: Partial<UpdateUsuarioDto>) {
    const user = await this.getUserById(id);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (data.email) {
      const alreadyExists = await this.getUserByEmail(data.email);

      if (alreadyExists) {
        throw new BadRequestException('Admin email is already registered');
      }
    }

    Object.assign(user, data);

    await this.usuarioRepository.save(user);

    return user;
  }

  //* Delete User
  async deleteUser(id: string): Promise<void> {
    const user = await this.usuarioRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.usuarioRepository.remove(user);
  }

  //* Count Users In DB
  async countSupport(): Promise<number> {
    const count = await this.usuarioRepository.count();

    if (!count) {
      throw new NotFoundException(
        'Error al contar los usuarios en la base de datos',
      );
    }

    return count;
  }
}
