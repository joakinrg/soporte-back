import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSolutionDto {
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  solucionador: string;

  @IsString()
  descripcionProblema: string;

  @IsString()
  descripcionSolucion: string;

  @MinLength(3)
  @IsString()
  tipoTicket: string;

  @IsString()
  fechaProblema: Date;
}
