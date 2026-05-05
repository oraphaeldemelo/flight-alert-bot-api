import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  telegramChatId: string;

  @IsString()
  firstName: string;

  @IsString()
  username: string;
}
