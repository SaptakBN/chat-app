import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthEventProducer } from '../../event-producer/auth-event.producer';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthEventProducer],
})
export class AuthModule {}
