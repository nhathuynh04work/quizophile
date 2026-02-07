import { IsEmail, IsString, MinLength } from 'class-validator';
import { ToLowerCase, Trim } from 'src/common/decorators/transform.decorators';

export class CreateUserDto {
  @IsString()
  @Trim()
  name: string;

  @IsEmail()
  @ToLowerCase()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
