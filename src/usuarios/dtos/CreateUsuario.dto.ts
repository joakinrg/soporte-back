import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail()
  @MinLength(5)
  @Transform(({ value }) => value.trim())
  @MaxLength(255)
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
  password: string;

  @IsString()
  @Length(2, 50)
  @Matches(/^[A-Za-z\s]+$/, { message: 'El nombre solo puede contener letras' })
  nombre: string;

  @IsString()
  @Length(2, 50)
  @Matches(/^[A-Za-z\s]+$/, { message: 'El nombre solo puede contener letras' })
  apellido: string;
}
