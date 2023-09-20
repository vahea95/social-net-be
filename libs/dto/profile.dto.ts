import { IsString } from 'class-validator';

export class ProfileDataDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  email: string;
}
