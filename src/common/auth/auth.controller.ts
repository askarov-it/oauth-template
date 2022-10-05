import { Controller, UseGuards, Post, Body, Get, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard, GoogleStrategyGuard } from './guards';
import { AuthService } from './auth.service';
import { LoginResponseDto, LoginRequestDto } from './dto';
import { OAuthRequest } from './types';
import { constants } from './constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginLocal(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(body);
  }

  @Get('google')
  @UseGuards(GoogleStrategyGuard)
  async googleAuth(@Req() req: OAuthRequest<unknown>) {
    return req.user;
  }

  @UseGuards(GoogleStrategyGuard)
  @Get('google/redirect')
  async googleAuthRedirect(@Req() req: OAuthRequest<unknown>, @Res() res: Response) {
    const { accessToken } = await this.authService.login(req.user);

    res.cookie(constants.jwt.SESSION_COOKIE_KEY, accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });

    return res.redirect('/profile');
  }
}
