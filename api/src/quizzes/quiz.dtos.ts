import { IsString, IsOptional } from 'class-validator';
import { QuizStatus } from 'src/generated/prisma/enums';

export class SaveQuizDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsOptional()
  content?: any;

  @IsString()
  @IsOptional()
  status: QuizStatus;
}
