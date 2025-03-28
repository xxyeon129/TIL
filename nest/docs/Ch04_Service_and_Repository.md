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
