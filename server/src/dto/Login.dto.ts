import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  account: string;

  @IsNotEmpty()
  password: string;
}
