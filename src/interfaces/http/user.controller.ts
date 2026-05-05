import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/use-cases/create-user/create-user.usecase';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.createUserUseCase.execute({
      telegramChatId: body.telegramChatId,
      firstName: body.firstName,
      username: body.username,
    });

    return {
      id: user.id,
      fistname: user.firstName,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
