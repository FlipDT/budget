import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { UserDecorator } from 'src/auth/user.decorator';
import { BudgetService } from './budget.service';
import { CreateOperationDto } from './dtos/create-operation.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Category } from './entities/category.entity';
import { UpdateOperationDto } from './dtos/update-operation.dto';
import { CreateCategoryDto } from './dtos/create-categorie.dto';

@Controller('budget')
@UseGuards(AuthGuard)
export class BudgetController {
  constructor(private budgetService: BudgetService) {}
  // http://localhost:3000/budget/operations

  @Get('operations')
  getAllOperations(@UserDecorator() user: User) {
    return this.budgetService.getAllOperations(user);
  }

  @Post('operations')
  createNewOperation(
    @Body() createOperationDto: CreateOperationDto,
    @UserDecorator() user: User,
  ) {
    return this.budgetService.createNewOperation(createOperationDto, user);
  }

  @Patch('operations/:id')
  update(
    @Param('id') id: string,
    @Body() updateOperationDto: UpdateOperationDto,
    @UserDecorator() user: User,
  ) {
    return this.budgetService.update(+id, updateOperationDto, user);
  }

  @Delete('operations/:id')
  delete(@Param('id') id: string, @UserDecorator() user: User) {
    return this.budgetService.delete(+id, user);
  }

  // http://localhost:3000/budget/category/:id

  // Get Category
  @Get('category/:id')
  async getCategory(@Param('id') id: number): Promise<Category> {
    const category = await this.budgetService.getCategoryById(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return this.budgetService.getCategoryById(+id);
  }

  // Get AllCategories

  @Get('categories')
  getAllCategories() {
    return this.budgetService.getAllCategories();
  }

  @Post('categories')
  createNewCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.budgetService.createNewCategory(createCategoryDto);
  }

  // @Get('operations')
  // getOperationsByDate(@UserDecorator() user: User, @Query('startDate') startDate: Date, @Query('endDate') endDate: Date) {
  //   return this.budgetService.getOperationsByDate(user, startDate, endDate);
  //   }
}

