import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: ['http://localhost:4200'] });
  await app.listen(3000);
  process.on('SIGINT', () => {
    app.close();
    process.exit(0);
  });
  process.on('exit', () => {
    app.close();
    process.exit(0);
  });
}

bootstrap();
