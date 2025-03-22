# 01 App Setup

```tsx
sudo npm install -g @nestjs/cli

nest new 프로젝트이름
```

## message Project

- Request: GET localhost:3000/messages
  - (요청에 데이터 없음 → Validate X) Pipe X
  - (사용자 인증/인가처리 X) Guard X
  - (요청을 특정 함수로 라우팅 필요) **`Controller`**
  - (DB나 repository에 access하고 모든 메세지의 리스트를 받기 위한 logic 필요) **`Service`**
  - (모든 메시지를 저장하는 DB 필요) **`Repository`**
- Request: POST localhost:3000/messages
  { “content”: “hi there” } - (요청 데이터 Validate → string type, length check… ) **`Pipe`** - (사용자 인증/인가처리 X) Guard X - (요청을 특정 함수로 라우팅 필요) **`Controller`** - (메시지 생성할 서비스 필요) **`Service`** - (메시지 자체 저장할 DB 필요) **`Repository`**

그렇다고 2개의 Controller, 2개의 Service, 2개의 Repository를 만드는 건 아님

→ Controller, Service, Repository 각각 하나씩 만들어서 요청 처리

- Request: GET localhost:3000/messages/:id
  - (요청에 데이터 없음 → Validate X) Pipe X
  - (사용자 인증/인가처리 X) Guard X
  - (요청을 특정 함수로 라우팅 필요) **`Controller`**
  - (DB나 repository에 access하고 모든 메세지의 리스트를 받기 위한 logic 필요) **`Service`**
  - (모든 메시지를 저장하는 DB 필요) **`Repository`**

해당 프로젝트에서 필요한 건 Pipe, Controller, Service, Repository

→ 메시지 처리/메시지 관련 요청 처리에 관련된 것이라는 것을 확실히 하기 위해 이름 설정

- MessageModule
  - Pipe
  - MessagesController
  - MessagesService
  - MessagesRepository

# 02 Nest CLI

### package.json

```tsx
"scripts": {
	...
	"start:dev": "nest start --watch",
}
```

- start:dev 스크립트: 개발 모드에서 프로젝트 시작 → 프로젝트 변경할 때마다 서버가 자동으로 재시작됨

## Nest CLI

Nest CLI는 우리를 대신해서 여러 class 파일을 생성하고, 그 안에 시작 코드를 넣어줌 → 프로젝트를 빠르게 구성할 수 있는 기능

```bash
# 모듈이름이 message인 파일 추가
nest generate module message

# controller 추가, module 파일에 자동으로 controller 연결
nest generate controller messages/messages --flat
```

- `nest generate`
- `controller`: Type of class to generate
- `messages`: Place the file in the messages folder
- `/messages`: Call the class (or controller) ‘messages’
- `--flat`: Don’t create an extra folder called ‘controllers’ (없다면 src/messages/controller 경로에 생성)

# 03 Routing Logic

### Option #1

- @Controller()
- export class Messages Controller {
  - @Get(’/messages’)
    listMessages()
  - @Post(’/messages’)
    createMessages()
  - @Get(’/messages/:id’)
    getMessages()

### ✔️ Option #2

- @Controller(’/messages’)
- export class Messages Controller {
  - @Get()
    listMessages()
  - @Post()
    createMessages()
  - @Get(’/:id’)
    getMessages()

```bash
import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
	@Get()
	listMessages() {}

	@Post()
	createMessage() {}

	@Get('/:id')
	getMessage() {}
}
```

# 04 API Clients

- POSTMAN
- VSCode REST Client Extension
  ```bash
  ### List all messages
  GET http://localhost:3000/messages

  ### Create a new message
  POST http://localhost:3000/messages
  Content-Type: application/json

  {
      "content": "hi there"
  }

  ### Get a message by id
  GET http://localhost:3000/messages/123123
  ```
