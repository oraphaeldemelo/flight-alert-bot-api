import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        telegramChatId: user.telegramChatId,
        firstName: user.firstName,
        username: user.username,
      },
    });

    return new User({
      id: createdUser.id,
      telegramChatId: createdUser.telegramChatId,
      firstName: createdUser.firstName,
      username: createdUser.username,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    });
  }

  async findByTelegramChatId(telegramChatId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        telegramChatId,
      },
    });

    if (!user) return null;

    return new User({
      id: user.id,
      telegramChatId: user.telegramChatId,
      firstName: user.firstName,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return null;

    return new User({
      id: user.id,
      telegramChatId: user.telegramChatId,
      firstName: user.firstName,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
