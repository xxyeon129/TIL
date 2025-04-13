// Controllers: Handle incoming requests and outgoing responses

import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

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
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);

    if (!message) {
      // NotFoundException: Nest 자체 내부에 정의된 오류
      // request에서 오류가 나면 Nest가 자동으로 오류를 포착해서 response를 보냄
      throw new NotFoundException('message not found');
    }

    return message;
  }
}
