// Repository: 데이터베이스 조작 로직을 캡슐화
// access DB(or mockdata)

import { readFile, writeFile } from 'fs/promises'; // DB(or mockdata)의 콘텐츠를 읽거나 씀

export interface Message {
  id: number;
  content: string;
}

export interface Messages {
  [key: number]: Message;
}

export class MessagesRepository {
  async findOne(id: string): Promise<Message | undefined> {
    const contents = await readFile('messages.json', 'utf-8');
    const messages: Messages = JSON.parse(contents);

    return messages[parseInt(id)];
  }

  async findAll(): Promise<Messages> {
    const contents = await readFile('messages.json', 'utf-8');
    const messages: Messages = JSON.parse(contents);

    return messages;
  }

  async create(content: string): Promise<void> {
    const contents = await readFile('messages.json', 'utf-8');
    const messages: Messages = JSON.parse(contents);

    const id = Math.floor(Math.random() * 999);
    messages[id] = { id, content };

    await writeFile('messages.json', JSON.stringify(messages));
  }
}
