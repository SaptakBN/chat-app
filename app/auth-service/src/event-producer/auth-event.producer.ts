import { Injectable } from '@nestjs/common';
import { RedisService } from '@chat-app/redis';
import { AUTH_EVENTS, AuthUserCreatedEvent } from '@chat-app/contracts';

@Injectable()
export class AuthEventProducer {
  constructor(private readonly redis: RedisService) {}

  async userCreated(event: AuthUserCreatedEvent) {
    const client = this.redis.getClient();

    await client.xadd(
      AUTH_EVENTS.USER_CREATED,
      '*',
      'data',
      JSON.stringify(event),
    );
  }
}
