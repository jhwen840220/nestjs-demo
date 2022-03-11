import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entitiy/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(user: CreateUserDto): Promise<UserEntity> {
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
