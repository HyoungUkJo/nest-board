import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  createUser(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.createUser(authCredentialDto);
  }
  @Post('signin')
  signIn(@Body(ValidationPipe)authCredentialDto:AuthCredentialDto) : Promise<{accessToken: string}>{
    return this.authService.singIn(authCredentialDto);
  }
  @Post('test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User){
    console.log('user:', user);
  }
}
