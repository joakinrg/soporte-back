import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUsuarioDto {
  @IsEmail()
  @MinLength(5)
  @Transform(({ value }) => value.trim())
  @MaxLength(255)
  @IsOptional()
  email: string;

  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#"'-_()/])[A-Za-z\d@$!%*?&#"'-_()/]{8,}$/,
    {
      message:
        'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial',
    },
  )
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @Length(2, 50)
  @IsOptional()
  nombre: string;

  @IsString()
  @Length(2, 50)
  @IsOptional()
  apellido: string;
}
