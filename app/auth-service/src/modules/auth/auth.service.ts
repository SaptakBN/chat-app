import { Injectable } from '@nestjs/common';
import { PrismaService } from '@chat-app/prisma';
import { AuthEventProducer } from '../../event-producer/auth-event.producer';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly events: AuthEventProducer,
  ) {}

  async createUser(email: string, password?: string) {
    const user = await this.prisma.user.create({
      data: { email, password },
    });

    await this.events.userCreated({
      userId: user.id,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    });

    return user;
  }
}
