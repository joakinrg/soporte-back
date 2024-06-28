import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTicketStatusDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  estado: string;
}
