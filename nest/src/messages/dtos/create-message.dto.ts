// DTO: Data Transfer Object
// request body 유효성 검사
// request 데이터가 어떤 형식으로 들어오는지 타입 정의

import { IsString } from 'class-validator'; // install class-validator class-transformer

export class CreateMessageDto {
  @IsString()
  content: string;
}
