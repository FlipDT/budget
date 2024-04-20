import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { Operation } from './entities/operation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateOperationDto } from './dtos/create-operation.dto';
import { UpdateOperationDto } from './dtos/update-operation.dto';

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
      categoryId,
    });
    return await this.operationsRepo.save(operation);
  }
  async getAllOperations(user: User): Promise<Operation[]> {
    return await this.operationsRepo.find({ where: { userId: user.id } });
  }

  async update(
    id: number,
    updateOperationDto: UpdateOperationDto,
    user: User,
  ): Promise<Operation> {
    const operation = await this.operationsRepo.findOneBy({
      id,
      userId: user.id,
    });
    const updatedOperation = this.operationsRepo.merge(
      operation,
      updateOperationDto,
    );
    try {
      return await this.operationsRepo.save(updatedOperation);
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id: number, user: User): Promise<{ success: boolean }> {
    const result = await this.operationsRepo.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException('Todo not deleted');
    } else {
      return { success: true };
    }
  }
}
