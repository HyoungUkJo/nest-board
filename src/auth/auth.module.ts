import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { authProviders } from './auth.providers';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret:'JWTKey123',
      signOptions: {
        expiresIn: 3600,
      }
    }),
    DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, ...authProviders, JwtStrategy],
  // 다른 모듈에서도 JWT관련된 인증을 사용할 수 있도록
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
