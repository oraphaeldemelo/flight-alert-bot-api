import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { CreateUserInput } from './create-user.input';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    const existingUser = await this.userRepository.findByTelegramChatId(
      input.telegramChatId,
    );

    if (existingUser) {
      return existingUser;
    }

    const user = new User({
      telegramChatId: input.telegramChatId,
      firstName: input.firstName,
      username: input.username,
    });

    return this.userRepository.create(user);
  }
}
