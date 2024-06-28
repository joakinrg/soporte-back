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
import { CreateTemasDto } from './dtos/CreateTema.dto';
import { UpdateTemaDto } from './dtos/UpdateTema.dto';
import { TemasService } from './temas.service';

@ApiTags('Temas Module')
@Controller('temas')
export class TemasController {
  //* Constructor
  constructor(private readonly temasService: TemasService) {}

  //* Create a new Tema
  @Post('create')
  async createTema(@Body() createTemas: CreateTemasDto) {
    return await this.temasService.createTema(createTemas);
  }

  //* Get all Temas
  @Get('list')
  async getTemas() {
    return await this.temasService.getTemas();
  }

  //* Get a single Tema
  @Get(':id')
  async getTemaById(id: number) {
    return await this.temasService.getTemaById(id);
  }

  //* Update a Tema
  @Patch('update/:id')
  async updateTema(
    @Param('id') id: number,
    @Body() updateTema: Partial<UpdateTemaDto>,
  ) {
    return await this.temasService.updateTema(id, updateTema);
  }

  //* Delete a Tema
  @Delete(':id')
  async deleteTema(@Param('id') id: number) {
    return await this.temasService.deleteTema(id);
  }
}
