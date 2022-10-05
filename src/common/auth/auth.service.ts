import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/common/users/users.service';
import { AccessTokenDto, AccessTokenBodyDto } from './dto';
import { UserDto } from 'src/common/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  generateAccessToken(user: AccessTokenBodyDto): AccessTokenDto {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async registerUser(user: UserDto): Promise<AccessTokenDto> {
    const newUser: UserDto = await this.usersService.save(user);
    return this.generateAccessToken({
      id: newUser.id,
      email: newUser.email,
      provider: newUser.provider,
      username: newUser.username,
    });
  }
}
