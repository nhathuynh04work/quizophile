import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload, LoginDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(payload: CreateUserDto) {
    const passwordDigest = await bcrypt.hash(payload.password, 10);

    const user = await this.usersService.create({
      name: payload.name,
      email: payload.email,
      passwordDigest: passwordDigest,
    });

    return user;
  }

  async login(payload: LoginDto) {
    const user = await this.usersService.findOneByEmailForAuth(payload.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      payload.password,
      user.passwordDigest,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const jwtPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.email,
    };

    const access_token = await this.jwtService.signAsync(jwtPayload);

    return { access_token: access_token };
  }
}
