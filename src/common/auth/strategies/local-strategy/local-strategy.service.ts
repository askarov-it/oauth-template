import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/common/auth/auth.service';
import { constants } from '../../constants';
import { UserDto } from 'src/common/users/dto/user.dto';

@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy, constants.provider.LOCAL) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserDto> {
    const user = await this.authService.validate(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      provider: constants.provider.LOCAL,
      ...user
    };
  }
}
