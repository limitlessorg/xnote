import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * 部门创建
 */
export class DepartmentCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsOptional()
  abbreviation: string;

  @IsString()
  @IsOptional()
  logo: string;

  @IsString()
  @IsOptional()
  remark: string;

  @IsOptional()
  corporationId?: string;

  @IsString()
  @IsNotEmpty()
  parentId: string;
}
