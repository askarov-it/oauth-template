import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/common/users/users.module';
import { LocalStrategyService } from './strategies/local-strategy/local-strategy.service';
import { GoogleStrategyService } from './strategies/google-strategy/google-strategy.service';
import { constants } from './constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: constants.jwt.SECRET,
      signOptions: { expiresIn: constants.jwt.EXPIRES_IN },
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategyService,
    GoogleStrategyService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
