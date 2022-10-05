import { Module } from '@nestjs/common';
import { UsersModule } from './common/users/users.module';
import { AuthModule } from './common/auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
})
export class AppModule {}
