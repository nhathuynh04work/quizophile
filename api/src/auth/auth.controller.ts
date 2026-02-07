import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { type CreateUserDto } from 'src/dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async register(@Body() payload: CreateUserDto) {
    const user = await this.authService.register(payload);
    return user;
  }
}
