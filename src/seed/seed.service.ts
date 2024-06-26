import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CvsService } from '../cvs/cvs.service';
import { SkillsService } from '../skills/skills.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateCvDto } from '../cvs/dto/create-cv.dto';
import { CreateSkillDto } from '../skills/dto/create-skill.dto';
import {
  randFullName,
  randEmail,
  randPassword,
  randJobTitle,
  randNumber,
} from '@ngneat/falso';

@Injectable()
export class SeedService {
  constructor(
    private readonly userService: UsersService,
    private readonly cvService: CvsService,
    private readonly skillService: SkillsService,
  ) {}

  async seedUsers(count: number = 10) {
    for (let i = 0; i < count; i++) {
      const userDto: CreateUserDto = {
        username: randFullName(),
        email: randEmail(),
        password: randPassword(),
      };
      await this.userService.create(userDto);
    }
  }

  async seedSkills(count: number = 5) {
    for (let i = 0; i < count; i++) {
      const skillDto: CreateSkillDto = {
        designation: randJobTitle(),
      };
      await this.skillService.create(skillDto);
    }
  }

  async seedCvs(count: number = 10) {
    const userIds = await this.generateUserIds(count);
    const skillIds = await this.generateSkillIds(count);

    for (let i = 0; i < count; i++) {
      const cvDto: CreateCvDto = {
        name: randFullName(),
        firstname: randFullName(),
        age: randNumber({ min: 20, max: 50 }),
        cin: `A${randNumber({ min: 100000, max: 999999 })}`,
        job: randJobTitle(),
        path: `cv-${i}.pdf`,
        userId: userIds[randNumber({ min: 0, max: userIds.length - 1 })],
        skillsIds: skillIds,
      };
      await this.cvService.create(cvDto);
    }
  }

  async generateUserIds(count: number): Promise<number[]> {
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  async generateSkillIds(count: number): Promise<number[]> {
    return Array.from({ length: count }, (_, i) => i + 1);
  }
}
