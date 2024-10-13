import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_REPOSITORY')
    private authRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const salt = await bcrypt.genSalt(); // salt 생성
    const hashedPassword = await bcrypt.hash(password, salt); // password와 salt를 이용해 hash 생성

    const user = this.authRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.authRepository.save(user);
    } catch (error) {
      console.log('error:', error);
      if (error.errno === 1062) {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async singIn(authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
    //성공 여부를 return함으로 string으로
    const { username, password } = authCredentialDto;
    const user = await this.authRepository.findOneBy({ username: username });
    if (user && (await bcrypt.compare(password, user.password))) {
        // 유저 토큰 생성 (Secret+Payload)
        const payload = {username}; //username으로 보내는건 취약하지 않나?
        const accessToken = await this.jwtService.sign(payload);

      return {accessToken};
    } else {
      throw new UnauthorizedException('login fail');
    }
  }
}
