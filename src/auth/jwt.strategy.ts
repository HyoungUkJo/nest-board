import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as config from 'config'; // config 모듈 import 필요

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_REPOSITORY')
    private authRepository: Repository<User>,
  ) {
    super({
      secretOrKey: jwtConfig.secret, // 토큰 유효 확인
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 토큰이 어디에서 오냐 -> extractJwt에 bearertoken 타입으로 온다.
    });
  }
  // 토큰이 유효한지 확인 후 실행되는 methdod
  // 실제 유저가 있는지 확인 -> 이걸로 유저의 권한을 확인해서 처리
  async validate(payload) {
    const { username } = payload;
    const user: User = await this.authRepository.findOneBy({
      username: username,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
