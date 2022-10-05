import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [
    {
      provider: 'local',
      id: '1',
      username: 'john',
      password: 'changeme',
      email: 'test1@test.com',
    },
    {
      provider: 'local',
      id: '2',
      username: 'maria',
      password: 'guess',
      email: 'test2@test.com',
    },
  ];

  async findOne(username: string): Promise<UserDto | undefined> {
    return this.users.find(user => user.username === username);
  }

  async save(user: UserDto): Promise<UserDto> {
    this.users.push(user)
    return user;
  }
}
