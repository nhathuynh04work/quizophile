import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt.guard';
import { CurrentUser } from './common/decorators/user.decorator';
import { type JwtPayload } from './auth/auth.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(@CurrentUser() currentUser: JwtPayload) {
    return currentUser;
  }
}
