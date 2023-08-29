import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * 群组创建
 */
export class GroupCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  logo: string;

  @IsBoolean()
  openRead: boolean;

  @IsString()
  @IsOptional()
  remark: string;
}
