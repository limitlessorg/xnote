import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * 团队创建
 */
export class TeamCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  teamType: string;

  @IsString()
  @IsOptional()
  logo: string;

  @IsString()
  @IsOptional()
  remark: string;
}
