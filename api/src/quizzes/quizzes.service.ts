import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SaveQuizDto } from './quiz.dtos';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    return quiz;
  }

  async save(currentUserId: string, payload: SaveQuizDto) {
    const { id } = payload;

    try {
      const quiz = await this.findById(id);

      if (quiz.userId !== currentUserId) {
        throw new ForbiddenException('Can only edit your own quizzes');
      }

      const updated = await this.prisma.quiz.update({
        where: {
          id: id,
        },
        data: {
          title: payload.title || 'Untitled',
          content: payload.content,
          status: payload.status,
        },
      });

      return updated;
    } catch (err) {
      // create new quiz when no quiz found
      if (err instanceof NotFoundException) {
        const quiz = await this.prisma.quiz.create({
          data: {
            id: id,
            userId: currentUserId,
            title: payload.title || 'Untitled',
            content: payload.content,
            status: payload.status,
          },
        });

        return quiz;
      }

      throw new InternalServerErrorException();
    }
  }
}
