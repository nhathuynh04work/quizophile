import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          include: {
            options: true,
          },
        },
      },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    return quiz;
  }
}
