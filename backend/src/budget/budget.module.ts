import { Module } from '@nestjs/common';
import { BudgetController } from './budget.controller';
import { BudgetService } from './budget.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Operation } from './entities/operation.entity';
import { Category } from './entities/category.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User, Operation, Category]), ConfigModule],
  controllers: [BudgetController],
  providers: [BudgetService, JwtService],
  exports: [JwtService],
})
export class BudgetModule {}
