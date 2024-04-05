import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { CvsModule } from '../cvs/cvs.module';
import { SkillsModule } from '../skills/skills.module';
import { SeedService } from './seed.service';

@Module({
  imports: [CvsModule, SkillsModule, UsersModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
