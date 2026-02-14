import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsUUID,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { QuizStatus } from 'src/generated/prisma/enums';

export class OptionDto {
  @IsUUID()
  id: string;

  @IsString()
  text: string;

  @IsBoolean()
  isCorrect: boolean;
}

export class QuestionDto {
  @IsUUID()
  id: string;

  @IsString()
  text: string;

  @IsNumber()
  points: number;

  @IsNumber()
  timeLimitMs: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options: OptionDto[];
}

export class SaveQuizDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  content?: QuestionDto[];

  @IsEnum(QuizStatus)
  @IsOptional()
  status: QuizStatus;
}
