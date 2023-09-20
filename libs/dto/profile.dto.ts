import { IsEmail, IsString } from 'class-validator';

export class ProfileDTO {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;
}
