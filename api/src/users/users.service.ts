import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(payload: Prisma.UserCreateInput) {
    try {
      const user = await this.prisma.user.create({
        data: payload,
        omit: {
          passwordDigest: true,
        },
      });

      return user;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException('Email already exists');
        }
      }

      throw new InternalServerErrorException();
    }
  }
}
