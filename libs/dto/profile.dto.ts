import { IsEmail, IsString } from 'class-validator';

export class ProfileDataDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;
}
