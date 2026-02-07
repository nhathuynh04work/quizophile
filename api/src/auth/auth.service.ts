import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(payload: CreateUserDto) {
    const passwordDigest = await bcrypt.hash(payload.password, 10);

    const user = await this.usersService.create({
      name: payload.name,
      email: payload.email,
      passwordDigest: passwordDigest,
    });

    return user;
  }
}
