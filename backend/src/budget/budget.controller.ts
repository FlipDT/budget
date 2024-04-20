import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { UserDecorator } from 'src/auth/user.decorator';
import { BudgetService } from './budget.service';
import { CreateOperationDto } from './dtos/create-operation.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Category } from './entities/category.entity';

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

  // Le + converti un string en number
  //   @Patch('operations/:id')
  //   update(
  //     @Param('id') id: string,
  //     @Body() updateTodoDto: UpdateTodoDto,
  //     @UserDecorator() user: User,
  //   ) {
  //     return this.todoService.update(+id, updateTodoDto, user);
  //   }

  //   @Delete('operations/:id')
  //   delete(@Param('id') id: string, @UserDecorator() user: User) {
  //     return this.todoService.delete(+id, user);
  //   }

  // @Get('operations/?startDate=xxx&endDate=yyy')
  // getAllOperations(@UserDecorator() user: User) {
  //     return this.budgetService.getAllOperations(user);
  //   }

  // Get User
  // @Get('users/:id')

  // Get Category
  // @Get('category/:id')
}
