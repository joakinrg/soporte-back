import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateTemaDto {
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'El tipo del Ticket solo puede contener letras',
  })
  @Length(3, 50)
  @IsOptional()
  tipoTicket: string;
}
