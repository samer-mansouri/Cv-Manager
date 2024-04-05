import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  server.use('/public/uploads', express.static('public/uploads'));
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.listen(3000);
}
bootstrap();
