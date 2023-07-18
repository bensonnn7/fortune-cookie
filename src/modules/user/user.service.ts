import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { genSaltSync, hashSync } from 'bcrypt';
const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async emailSignup(createUserDto: CreateUserDto) {
    const foundUser = await this.findByEmail(createUserDto.email);
    if (foundUser) {
      throw new BadRequestException('Email already exists');
    }
    const newUser = new User();
    newUser.email = createUserDto.email;
    newUser.name = createUserDto.name;
    const salt = genSaltSync(SALT_ROUNDS);
    newUser.password = hashSync(createUserDto.password, salt);

    try {
      await this.userRepository.save(newUser);
      return newUser;
    } catch (e) {
      Logger.error(e);
      return '注册失败';
    }
  }

  signin() {
    return 'signin';
  }
  getAllUser() {
    return this.userRepository.find();
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
}
