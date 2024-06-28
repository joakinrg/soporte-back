import { IsString, Length, Matches } from 'class-validator';

export class CreateTemasDto {
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'El tipo del Ticket solo puede contener letras',
  })
  @Length(3, 50)
  tipoTicket: string;
}
