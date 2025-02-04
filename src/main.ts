import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerWinston } from './logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: new LoggerWinston()});
  await app.listen(3000);
}
bootstrap();
