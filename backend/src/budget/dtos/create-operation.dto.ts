import { IsNotEmpty } from 'class-validator';

export class CreateOperationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  categoryId: number;
}
