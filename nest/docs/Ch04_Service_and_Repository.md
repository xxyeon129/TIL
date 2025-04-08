# Service and Repository

| **Services** | **Repositories** |
| ------------ | ---------------- |
| class        | class            |

| business logic
Repository로부터 데이터를 가져올 때도 Service 사용 | storage-related logic
DB와 상호작용, 파일 작성 등
(Access a DB) |
| 데이터를 찾고 저장하기 위해 하나나 여러 개의 Repositories 사용 | 다른 Storage library를 감싸는 wrapper → 독립된 Repository를 갖는 게 아니라, TypeORM entity나 Mongoose schema 등을 가짐 |

Controller ↔ Service ↔ Repository

# Repository

```tsx
import { readFile, writeFile } from 'fs/promises'; // DB(or mockdata)의 콘텐츠를 읽거나 씀

export class MessagesRepository {
  async findOne(id: string) {}

  async findAll() {}

  async create(message: string) {}
}
```

## mock data 생성

- 모든 메세지를 객체 안에 저장
- key는 id 속성에 해당

```tsx
// messages.json 예시 코드
{
	"12": {
		"content": "hi there!",
		"id": 12
	},
	"13": {
		"content": "hi there!",
		"id": 13
	},
	"14": {
		"content": "hi there!",
		"id": 14
	}
}
```

## Repository method 구현

```tsx
import { readFile, writeFile } from 'fs/promises'; // DB(or mockdata)의 콘텐츠를 읽거나 씀

export class MessagesRepository {
	async findOne(id: string) {
		const contents = awiat readFile('messages.json', 'utf8');
		const messages = JSON.parse(contents); // 문자열을 파싱해 객체로 변환

		return messages[id];
	}

	async findAll() {
		const contents = awiat readFile('messages.json', 'utf8');
		const messages = JSON.parse(contents);

		return messages;
	}

	async create(content: string) {
		const contents = awiat readFile('messages.json', 'utf8');
		const messages = JSON.parse(contents);

		const id = Math.floor(Math.random() * 999);
		messages[id] = { id, content };

		await writeFile('messages.json', JSON.stringify(messages));
	}
}
```

# Service

Service 생성 → Controller에 Service 연결

## 💩 own dependencies를 가지고 있는 MessageService

```tsx
// messages.service.ts

import { MessageRepository } from './messages.repository';

export class MessagesService {
  messagesRepo: MessagesRepository;

  constructor() {
    // DONT DO THIS ON REAL APPS
    // Service is creating its own dependencies
    this.messagesRepo = new MessagesRepository();
  }

  // Service 안에서 Repository의 instance 생성
  // Service의 메서드들은 Repository에 있는 메서드를 단순히 가져오기만 하는 것처럼
  // 보일 수 있음. 불필요하게 느껴질 수 있음.
  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }

  findAll() {
    return this.messagesRepo.findAll();
  }

  create(content: string) {
    return this.messagesRepo.create(content);
  }
}
```

- 이 경우 Repository가 없으면 Service가 제대로 작동할 수 없음

# Controller 수동 test

> [!NOTE]
>
> Pipe(validate data) → Controller(route) → Service(business logic) → Repository(access DB)

- Service의 instance를 생성해서 → Controller에 제공해야 함
- Controller는 request를 받아서 → 어떤 handler를 호출했는지에 맞춰 / Service로부터 받은 데이터를 사용해 request에 응답
  - Service의 instance를 받고, 그걸 사용해서 request에 응답

## 💩  Controller 안에 Service instance 생성

```tsx
// messages.controller.ts

import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  messagesService: MessagesService;

  constructor() {
    // DONT DO THIS ON REAL APP
    // USE DEPENDENCY INJECTION
    this.messagesService = new MessagesService();
  }

  @Get()
  listMessages() {
    // return값이 없으면 요청자에게 아무것도 반환하지 않음
    return this.messagesService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    return this.messagesService;
  }
}
```
