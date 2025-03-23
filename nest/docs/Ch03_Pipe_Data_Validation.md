# 01 Decorator로 Request data access

## HTTP Request

### Start line

POST /messages/5?validate=true HTTP/1.1

- 유입되는 요청의 URL로부터 와일드카드(/:id) 값 추출: `@Param('id')` decorator 사용 → 5
- query string 부분 추출: `@Query()` decorator 사용 → validate=true
  - → 프로젝트에서 사용하는 경우는 많지 않음

### Headers

Host: localhost:3000

Content-Type: application/json

- 유입되는 요청의 Header 부분에 access: `@Headers()` decorator 사용
  - → 프로젝트에서 사용하는 경우는 많지 않음

### Body

{”content”: “hi there”}

- 요청의 body 부분 access: `@Body()` decorator 사용

## Decorator

```tsx
import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {}

  @Post()
  createMessage(@Body() body: any) {
    // Nest는 request body를 자동으로 추출,
    // @Body 라우트 핸들러에 인수로 전달
    console.log(body);
  }

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    console.log(id);
  }
}
```

- `@Controller`: class decorator
- `@Get`, `@Post`: method decorator
- `@Body`, `@Param` : argument decorator

# 02 ValidationPipe

Request → Pipe → … → Controller(route) → Service(business logic) → Repository(access DB)

body data를 검증하기 위해 Pipe가 필요함

- 데이터가 무효하다면 (ex. 속성이 없거나 타입이 다르다면) → Pipe를 사용해 request를 거부
  - request가 Controller에 도착하기 전에 요청자에게 반환해야 함

직접 Pipe를 만들 수 있지만, 보통은 그러지 않고 NestJS가 제공하는 Pipe를 사용함

→ ValidationPipe (Nest에 내장된 Pipe)

```tsx
// src/main.ts

import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
	...
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(3000);
}
bootstrap();
```

- main.ts에 설정하여 유입되는 모든 요청을 검증 (Pipe를 전역적으로 사용)
- ValidationPipe(): 애플리케이션에 유입되는 모든 요청을 검증하려 함
  - 모든 route handler에 검증 규칙을 추가해야 하는 건 아님
  - 만일 특정한 handler에 검증 규칙을 추가하지 않으면 → ValidationPipe는 그 handler에서 작동하지 않게 됨
  - → 사용 설정을 해야 함
  - app.useGlobalPipes(new ValidationPipe())를 실행하지만, 결국은 특정한 경로에서만 검증

## Setting Up Automatic Validation

특정한 request handler에 대한 자동 검증 설정

1. Tell Nest to use global validation → ValidationPipe 자체를 연결

Route handler에서 그 ValidationPipe를 사용하려 할 때마다 2단계~4단계까지 매번 반복

1. Create a class that describes the different properties that the request body should have

   - 만들 class를 Data transfer object라고 부름 = DTO

   ```tsx
   // src/messages/dtos/create-message.dto.ts

   export class CreateMessageDto {
     content: string;
   }
   ```

   > [!NOTE]
   >
   > ### DTO (Data Transfer Object)
   >
   > Request → DTO (Carries data between two places) → Route Handler
   >
   > - 네트워크 형태로 옮기게 됨
   > - DTO에는 어떤 functionality type도 연계되어 있지 않음 → 그냥 몇 가지 속성을 나열하는 simple class
   > - DTO = request 안에서 전송되고 있는 데이터가 어떤 형태인지를 설명하는 Object

2. Add validation rules to the class

   - `class-validator` 라이브러리 사용해서 class 자체에 검증 규칙 적용
   - `npm install class-validator class-transformer`

   ```tsx
   // src/messages/dtos/create-message.dto.ts

   import { IsString } from 'class-validator'

   export class CreateMessageDto {
   	@IsString(); // CreateMessageDto의 인스턴스를 생성할 때마다 해당 validator가 type 확인
   	content: string;
   }
   ```

   > [!NOTE]
   >
   > ### [github.com/typestack/class-validator](https://github.com/typestack/class-validator)
   >
   > Validation decorators 확인 가능
   >
   > ### [github.com/typestack/class-transformer](https://github.com/typestack/class-transformer)
   >
   > JSON object나 plain js object를 받아서 → 훨씬 더 많은 기능이 있는(method 사용 등) class의 instance로 변환하는 간단한 패키지
   >
   > How to make a `users` array of instances of `User` objects instead of plain javascript objects? Solution is to create new instances of User object and manually copy all properties to new objects. But things may go wrong very fast once you have a more complex object hierarchy.
   >
   > Alternatives? Yes, you can use class-transformer. Purpose of this library is to help you to map your plain javascript objects to the instances of classes you have.

3. Apply that class to the request handler

   ```tsx
   // src/messages/controller.ts
   import { CreateMessageDto } from './dtos/create-message.dto';

   @Controller('messages')
   export class MessagesController {
     @Get()
     listMessages() {}

     @Post()
     createMessage(@Body() body: CreateMessageDto) {
       console.log(body);
     }
   }
   ```

## Validation 흐름 정리

Request가 Server로 들어옴 → Validation Pipe

Validation Pipe는 내부적으로 class-transformer, class-validator를 사용해서 모든 검증을 자동으로 수행

1. Use `class-transformer` / to turn the body → into an instance of the DTO class
   - body에 있는 plain JSON object를 받아서 → 모든 검증 정보가 들어간 DTO(코드에서는 CreateMessageDto)의 instance로 변환
2. Use `class-validator` / to validate the instance
   - instance를 받아서 decorator의 정보를 사용해 검증하고, 검증 결과를 다시 ValidationPipe에 제공
3. If there are validation errors → respond immediately, otherwise provide body to request handler

# 03 Type 정보가 JavaScript에서도 보존되는 이유

- TypeScript 코드를 직접 실행하는 엔진은 없다.
- Nest 애플리케이션을 실행할 때마다 TypeScript가 → plain JavaScript로 변환된 후에 실행된다.
- 따라서 애플리케이션이 실행될 때 모든 decorator와 모든 type annotation은 삭제된다.

그렇다면, ValidationPipe는 request body를 type annotation과 어떻게 비교해서 검증할까?

→ 답은 tsconfig.json의 `emitDecoratorMetadata`, `experimentalDecorators` option에 있다.

## emitDecoratorMetadata

very small amount의 type information이 TypeScript world에서 → JavaScript world로 넘어가도록 해줌

- 해당 옵션을 true로 설정하면 → 아주 적은 양의 type annotation과 information이 JavaScript로 변환됨
- dist 폴더 내 파일을 통해 실제 서버를 구동하는 코드를 확인할 수 있음
  ```tsx
  __decorate(
    [
      (0, common_1.Post)(),
      __metadata('design:type', Function),
      __metadata('design:paramtypes', [create_message_dto_1.CreateMessageDto]),
      __metadata('design:returntype', void 0),
    ],
    MessagesController.prototype,
    'createMessage',
    null,
  );
  ```
  - JavaScript 자체에는 decorator가 don’t exist → decorator 기능을 JavaScript world에서 작동시키기 위한 우회책
  - `metadata`: 어떤 type 정보나 코드에 관해 전달되는 고수준 정보(high level information)
  - `__metadata("design:paramtypes", …`): JavaScript world에서 인수의 type annotation이 무엇이었는지를 알려줌 → 해당 코드 덕분에, 아주 적은 양의 type 정보가 JavaScript에서도 지속됨
