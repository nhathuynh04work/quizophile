import { IsEmail, IsString } from 'class-validator';
import { ToLowerCase } from 'src/common/decorators/transform.decorators';

export class LoginDto {
  @IsEmail()
  @ToLowerCase()
  email: string;

  @IsString()
  password: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
}
