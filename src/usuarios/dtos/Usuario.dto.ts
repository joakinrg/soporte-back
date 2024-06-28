import { Exclude } from 'class-transformer';

class UserDtoInterceptor {
  id: string;

  email: string;

  fechaCreacion: Date;

  nombre: string;

  apellido: string;

  @Exclude()
  password: string;
}

export { UserDtoInterceptor };
