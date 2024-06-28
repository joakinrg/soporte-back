import { IsString } from 'class-validator';

export class AsignateUserDto {
  @IsString()
  userId: string;
}
