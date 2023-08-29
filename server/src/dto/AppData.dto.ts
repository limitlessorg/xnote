import { IsNotEmpty } from 'class-validator';

export class AppDataDto {
  @IsNotEmpty()
  curSpace: string;
}
