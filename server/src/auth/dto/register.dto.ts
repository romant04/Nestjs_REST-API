import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { Match } from '../../decorators/match.decorator';

export class RegisterDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 0,
    minSymbols: 0,
  })
  password: string;
  @IsString()
  @Match(RegisterDto, (o) => o.password)
  passwordConfirmation: string;
}
