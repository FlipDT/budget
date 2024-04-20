import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { Operation } from './entities/operation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateOperationDto } from './dtos/create-operation.dto';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Operation) private operationsRepo: Repository<Operation>,
    @InjectRepository(Category) private categorysRepo: Repository<Category>,
  ) {}
  async createNewOperation(
    createOperationDto: CreateOperationDto,
    user: User,
  ): Promise<Operation> {
    const { title, description, amount, categoryId } = createOperationDto;
    const createdDate = new Date();
    const operation = this.operationsRepo.create({
      title,
      description,
      amount,
      createdDate,
      userId: user.id,
      categoryId
    });
    return await this.operationsRepo.save(operation);
  }
  async getAllOperations(user: User): Promise<Operation[]> {
    return await this.operationsRepo.find({ where: { userId: user.id } });
  }
}
