import { NestFactory } from '@nestjs/core';
import { SeedService } from './seed/seed.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seeder = app.get(SeedService);

  await seeder.seedUsers();
  await seeder.seedCvs();
  await seeder.seedSkills();

  await app.close();
}

bootstrap();
