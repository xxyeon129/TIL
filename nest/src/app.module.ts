import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { MessagesModule } from './messages/messages.module';
import { MessagesController } from './messages/messages.controller';

@Module({
  imports: [MessagesModule],
  controllers: [UsersController, MessagesController],
  providers: [UsersService],
})
export class AppModule {}
