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
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { EstadoService } from './estado.service';

@ApiTags('Estado Module')
@Controller('status')
export class EstadoController {
  constructor(private readonly estadoService: EstadoService) {}

  @Post('create')
  async createStatus(@Body() createEstado: CreateEstadoDto) {
    return await this.estadoService.createStatus(createEstado);
  }

  @Get('list')
  async findAll() {
    return await this.estadoService.findAllStatus();
  }

  @Get('get/:id')
  async findOne(@Param('id') id: string) {
    return await this.estadoService.findOneStatus(+id);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateEstadoDto: Partial<UpdateEstadoDto>,
  ) {
    return await this.estadoService.updateStatus(+id, updateEstadoDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return await this.estadoService.removeStatus(+id);
  }
}
