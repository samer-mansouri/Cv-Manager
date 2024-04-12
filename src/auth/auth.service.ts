import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user/user';
import { RegisterDto } from './dto/register.dto/register.dto';
import { LoginDto } from './dto/login.dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { username, email, password, role } = registerDto;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      salt,
      role,
    });
    return this.userRepository.save(user);
  }

  async validateUser(loginDto: LoginDto): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { username: loginDto.username },
    });
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      return user;
    }
    return null;
  }
}
