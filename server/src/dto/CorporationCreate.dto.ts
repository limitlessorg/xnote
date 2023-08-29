import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * 企业创建
 */
export class CorporationCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  corporationCode: string;

  @IsString()
  @IsOptional()
  abbreviation: string;

  @IsString()
  @IsOptional()
  logo: string;

  @IsString()
  @IsOptional()
  remark: string;
}
