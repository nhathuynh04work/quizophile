import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/user.dto';
import { LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async register(@Body() payload: CreateUserDto) {
    const user = await this.authService.register(payload);
    return { user };
  }

  @Post('/login')
  async login(@Body() payload: LoginDto) {
    const result = await this.authService.login(payload);
    return result;
  }
}
