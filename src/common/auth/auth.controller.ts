import { Controller, UseGuards, Post, Body, Get, Res, Req } from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard, GoogleStrategyGuard } from './guards';
import { AuthService } from './auth.service';
import { LoginResponseDto, AccessTokenBodyDto } from './dto';
import { OAuthRequest } from './types';
import { constants } from './constants';
import { UserDto } from 'src/common/users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginLocal(@Body() body: AccessTokenBodyDto): Promise<LoginResponseDto> {
    return this.authService.generateAccessToken(body);
  }

  @Get('google')
  @UseGuards(GoogleStrategyGuard)
  async googleAuth(@Req() req: OAuthRequest<UserDto>) {
    return req.user;
  }

  @UseGuards(GoogleStrategyGuard)
  @Get('google/redirect')
  async googleAuthRedirect(@Req() req: OAuthRequest<UserDto>, @Res() res: Response) {
    const { accessToken } = await this.authService.getAccessToken(req.user);

    res.cookie(constants.jwt.SESSION_COOKIE_KEY, accessToken, {
      httpOnly: true,
    });

    return res.redirect('/profile');
  }
}
