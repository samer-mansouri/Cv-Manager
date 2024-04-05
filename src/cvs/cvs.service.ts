import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  findAll() {
    return `This action returns all cvs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cv`;
  }

  update(id: number, updateCvDto: UpdateCvDto) {
    return `This action updates a #${id} cv`;
  }

  remove(id: number) {
    return `This action removes a #${id} cv`;
  }
}
