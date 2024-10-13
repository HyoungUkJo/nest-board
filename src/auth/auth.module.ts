import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { authProviders } from './auth.providers';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

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
  providers: [AuthService, ...authProviders]
})
export class AuthModule {}
