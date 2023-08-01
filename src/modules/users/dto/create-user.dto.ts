import { IsNotEmpty, IsEmail, MinLength, IsEnum } from 'class-validator';

enum SourceType {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  EMAIL = 'email',
}

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsEnum(SourceType)
  source: string;

  @IsNotEmpty()
  isAdmin: boolean;
}
