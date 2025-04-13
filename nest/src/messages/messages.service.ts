// Service: business logic
// repository를 사용하여 데이터를 조작

import { MessagesRepository } from './messages.repository';
import { Message, Messages } from './messages.repository';

export class MessagesService {
  messagesRepo: MessagesRepository;

  constructor() {
    // DON'T DO THIS: 생성자에서 직접 인스턴스 생성 → Repository가 없으면 Service가 제대로 작동할 수 없음
    this.messagesRepo = new MessagesRepository();
  }

  // Service 안에서 Repository의 instance 생성
  // Service의 메서드들은 Repository에 있는 메서드를 단순히 가져오기만 하는 것처럼 보일 수 있음. 불필요하게 느껴질 수 있음.
  findOne(id: string): Promise<Message | undefined> {
    return this.messagesRepo.findOne(id);
  }

  findAll(): Promise<Messages> {
    return this.messagesRepo.findAll();
  }

  create(content: string): Promise<void> {
    return this.messagesRepo.create(content);
  }
}
