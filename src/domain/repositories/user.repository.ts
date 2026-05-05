import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;

  abstract findByTelegramChatId(telegramChatId: string): Promise<User | null>;

  abstract findById(id: string): Promise<User | null>;
}
