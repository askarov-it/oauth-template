import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategyService extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${process.env.HOST}/v1/auth/google/redirect`,
      scope: ['email', 'profile'],
    });
  }

  async validate (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<void> {
    const { name, emails } = profile
    const user = {
      provider: 'google',
      id: profile.id,
      email: emails[0].value,
      username: `${name.givenName} ${name.familyName}`,
      accessToken
    }

    done(null, user);
  }


}
