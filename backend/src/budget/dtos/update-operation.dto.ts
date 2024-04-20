import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateOperationDto {
    
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  amount?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  categoryId?: number;
}
