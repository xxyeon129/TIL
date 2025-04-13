// Controllers: Handle incoming requests and outgoing responses

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

// @Controller: class decorator
@Controller('messages')
export class MessagesController {
  // @Get, @Post: method decorator
  @Get()
  listMessages() {}

  @Post()
  // @Body: argument decorator
  // Nest는 request body를 자동으로 추출하고 @Body 라우트 핸들러에 인수로 전달
  createMessage(@Body() body: CreateMessageDto) {
    console.log(body);
  }

  @Get('/:id')
  // @Param: argument decorator
  getMessage(@Param('id') id: string) {
    console.log(id);
  }
}
