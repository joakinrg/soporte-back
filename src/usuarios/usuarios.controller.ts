import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateUsuarioDto } from './dtos/CreateUsuario.dto';
import { UpdateUsuarioDto } from './dtos/UpdateUsuario.dto';
import { UserDtoInterceptor } from './dtos/Usuario.dto';
import { UsuariosService } from './usuarios.service';

@ApiTags('User Module')
@Controller('user')
@Serialize(UserDtoInterceptor)
export class UsuariosController {
  //* Constructor
  constructor(private readonly usuariosService: UsuariosService) {}

  //* Create New User
  @Post('create')
  async createUser(@Body() createUser: CreateUsuarioDto) {
    return await this.usuariosService.createUser(createUser);
  }

  //* Get All Users
  @Get('list')
  async findAll() {
    return await this.usuariosService.getAllUsers();
  }

  //* Get User By ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.getUserById(id);
  }

  //* Get User By Email
  @Get('get/email/:email')
  async findByEmail(@Param('email') email: string) {
    return await this.usuariosService.getUserByEmail(email);
  }

  //* Update User
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<UpdateUsuarioDto>,
  ) {
    return await this.usuariosService.updateUser(id, data);
  }

  //* Delete User
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usuariosService.deleteUser(id);
  }

  //* Count Users in DB
  @Get('list/count')
  async count() {
    return await this.usuariosService.countSupport();
  }
}
