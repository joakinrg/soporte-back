import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateEstadoDto {
  @IsString()
  @Matches(/^[a-zA-Z\s]*$/, { message: 'El estado solo puede contener letras' })
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  tipoEstado: string;
}
