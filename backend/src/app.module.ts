import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BudgetModule } from './budget/budget.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './database.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BudgetModule, ConfigModule.forRoot(), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useClass: TypeOrmConfigService,
}),
AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
