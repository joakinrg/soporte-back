import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateTicketDto {
  @IsEmail()
  emisor: string;

  @IsString()
  @MinLength(3)
  tipoTicket: string;

  @IsString()
  @MinLength(10)
  descripcionTicket: string;
}
