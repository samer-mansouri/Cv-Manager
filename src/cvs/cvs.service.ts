import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindCvsDto } from './dto/find-cvs.dto';

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
  ) {}

  create(createCvDto: CreateCvDto): Promise<Cv> {
    const cv = new Cv();
    cv.name = createCvDto.name;
    cv.firstname = createCvDto.firstname;
    cv.age = createCvDto.age;
    cv.cin = createCvDto.cin;
    cv.job = createCvDto.job;
    cv.path = createCvDto.path;
    cv.user = { id: createCvDto.userId } as any;

    return this.cvRepository.save(cv);
  }

  findAll(): Promise<Cv[]> {
    return this.cvRepository.find();
  }

  async findAllWithParams(findCvsDto: FindCvsDto): Promise<Cv[]> {
    const { search, age } = findCvsDto;
    if (search || age) {
      return this.cvRepository
        .createQueryBuilder('cv')
        .where(
          search
            ? 'LOWER(cv.name) LIKE LOWER(:search) OR LOWER(cv.firstname) LIKE LOWER(:search) OR LOWER(cv.job) LIKE LOWER(:search)'
            : 'TRUE',
          { search: `%${search}%` },
        )
        .andWhere(age ? 'cv.age = :age' : 'TRUE', { age })
        .getMany();
    }
    return this.cvRepository.find();
  }

  findOne(id: number): Promise<Cv> {
    const cv = this.cvRepository.findOneBy({ id });
    if (!cv) {
      throw new Error(`Cv with id ${id} not found`);
    }
    return cv;
  }

  findOneByIdAndUserId(id: number, userId: number): Promise<Cv> {
    return this.cvRepository.findOneOrFail({
      where: { id, user: { id: userId } },
    });
  }

  update(id: number, updateCvDto: UpdateCvDto): Promise<Cv> {
    const cv = this.cvRepository.preload({
      id: id,
      ...updateCvDto,
    });

    if (!cv) {
      throw new Error(`Cv with id ${id} not found`);
    }

    return cv;
  }

  updateByIdAndUserId(
    id: number,
    userId: number,
    updateCvDto: UpdateCvDto,
  ): Promise<Cv> {
    const cv = this.cvRepository.preload({
      id: id,
      ...updateCvDto,
      user: { id: userId } as any,
    });

    if (!cv) {
      throw new Error(`Cv with id ${id} not found`);
    }

    return cv;
  }

  async remove(id: number): Promise<void> {
    const result = await this.cvRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Cv with id ${id} not found`);
    }
  }
}
