import { IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  password: string;
}
