import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSolutionDto } from './dtos/CreateSolution.dto';
import { SolucionesService } from './soluciones.service';

@ApiTags('Solutions Module')
@Controller('solution')
export class SolucionesController {
  //* Constructor
  constructor(private readonly solucionesService: SolucionesService) {}

  //* Create a new solution
  @Post('create')
  async createSolution(@Body() createSolution: CreateSolutionDto) {
    return await this.solucionesService.createSolution(createSolution);
  }

  //* Get All solutions
  @Get('list')
  async getAllSolutions() {
    return await this.solucionesService.getAllSolutions();
  }

  //* Get a single solution
  @Get(':id')
  async getSolutionById(@Param('id') id: string) {
    return await this.solucionesService.getSolutionById(id);
  }
}
