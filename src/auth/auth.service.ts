import { ConflictException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { error } from 'console';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_REPOSITORY')
    private authRepository: Repository<User>,
  ) {}
  async createUser(
    authCredentialDto: AuthCredentialDto,
  ): Promise<void> {
    const { username, password } = authCredentialDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = this.authRepository.create({ username, password:hashedPassword });

    try {
        await this.authRepository.save(user);
    } catch(error) {
        console.log('error:', error);
        if(error.errno === 1062){
            throw new ConflictException('Existing username');
        }else {
            throw new InternalServerErrorException();
        }
    }

  }
}
