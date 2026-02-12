import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindQuizOptions } from './interfaces/quiz-find-options.interface';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string, options: FindQuizOptions = {}) {
    const {
      withQuestions = false,
      withOptions = false,
      withAnswers = false,
    } = options;

    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: withQuestions
          ? {
              orderBy: { order: 'asc' },
              include: {
                options: withOptions
                  ? {
                      omit: {
                        isCorrect: !withAnswers,
                      },
                    }
                  : false,
              },
            }
          : false,
      },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    return quiz;
  }
}
