import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export default class AuthDto {
  @IsNotEmpty()
  @Type(() => String)
  username: string;

  @IsNotEmpty()
  @Type(() => String)
  password: string;
}
