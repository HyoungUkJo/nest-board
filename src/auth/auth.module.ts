import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { authProviders } from './auth.providers';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config'; // config 모듈 import 필요

const jwtConfig = config.get('jwt')

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: process.env.JWT_SECRET || jwtConfig.expiresIn,
      }
    }),
    DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, ...authProviders, JwtStrategy],
  // 다른 모듈에서도 JWT관련된 인증을 사용할 수 있도록
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
