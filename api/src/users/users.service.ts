import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
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
      this.logger.error(e);

      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException('Email already exists');
        }
      }

      throw new InternalServerErrorException();
    }
  }

  async findOneByEmailForAuth(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
