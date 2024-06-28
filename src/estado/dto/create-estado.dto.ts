import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateEstadoDto {
  @IsString()
  @Matches(/^[a-zA-Z\s]*$/, { message: 'El estado solo puede contener letras' })
  @MinLength(3)
  @MaxLength(50)
  tipoEstado: string;
}
