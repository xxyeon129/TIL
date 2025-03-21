import { CreateUserDto } from './users/dto/create-user.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './users/entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  create(createUserDto: CreateUserDto): User {
    const { email, name, password } = createUserDto;

    // 가입된 이메일인지 확인
    const existUser = this.users.find((user) => user.email === email);
    if (existUser) {
      throw new ConflictException('Email already exists');
    }

    // 유저 생성
    const newUser: User = {
      id: this.idCounter++,
      email,
      name,
      password, // 해시화 필요 (bcrypt)
    };

    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }
}
