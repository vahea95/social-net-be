import { IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class SignInDto {
  @IsString()
  id: string;

  @IsString()
  email: string;
}
