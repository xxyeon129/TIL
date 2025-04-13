// Controllers: Handle incoming requests and outgoing responses

import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

// @Controller: class decorator
@Controller('messages')
export class MessagesController {
  messagesService: MessagesService;

  constructor() {
    // DON'T DO THIS: 생성자에서 직접 인스턴스 생성 → Service가 없으면 Controller가 제대로 작동할 수 없음
    this.messagesService = new MessagesService();
  }

  // @Get, @Post: method decorator
  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  // @Body: argument decorator
  // Nest는 request body를 자동으로 추출하고 @Body 라우트 핸들러에 인수로 전달
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  // @Param: argument decorator
  getMessage(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }
}
