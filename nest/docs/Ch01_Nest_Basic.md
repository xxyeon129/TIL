# 01 Project Setup

Nest Application을 만들 때는 `Nest CLI` 툴을 사용한다. (Tool for generating + running projects)

## CLI 없이 최소 설정으로 진행

```bash
npm init -y  # package.json 설치

npm install @nestjs/common@7.6.17 @nestjs/core@7.6.17 @nestjs/platform-express@7.6.17 reflect-metadata@0.1.13 @typescript@4.3.2
```

# 02 TypeScript Setting

## package.json 내 패키지들

- `@nestjs/common`: Contains vast majority of functions, classes, etc, that we need from Nest
- `@nestjs/platform-express`: Lets Nest use ExpressJS for handling HTTP requests
  - Express와 Nest 간 어댑터 설치
  - Nest 자체는 유입되는 요청을 처리하지 않음 (Express.js나 Fastify 등 라이브러리가 HTTP 요청을 대신 처리 → default값은 Express)
  - Nest는 유입되는 모든 HTTP 요청을 처리하기 위해 Express 사용
- `reflect-metadata`: Helps make decorators work
- `typescript`: Write Nest apps with TypeScript

# 03 Controller & Module

요청-응답 사이클

## NestJS tools

NestJS에서는 Request-Response Cycle의 각 단계들을 처리하는 데 도움이 되는 특수한 도구를 얻게 됨

1. `Pipe`: Validate data contained in the request
   - 요청에 있는 데이터 검증
2. `Guard`: Make sure the user is authenticated
   - 요청이 인증/인가된 사용자인지 확인
3. `Controller`: Route the request to a particular function
4. `Service`: Run some business logic
5. `Repository`: Access a database

**[이외 Tools]**

모든 Nest 애플리케이션은 내부에 최소 1개의 Controller, 1개의 Module을 가지고 있어야 함

- ⭐ `Controllers`: Handles incoming requests
- `Services`: Handles data access and business logic
- ⭐ `Modules`: Groups together code
- `Pipes`: Validates incoming data
- `Filters`: Handles errors that occur during request handling
- `Guards`: Handles authentication
- `Interceptors`: Adds extra logic to incoming requests or outgoing responses
- `Repositories`: Handles data stored in DB

## Make Controller

```tsx
import { Controller, @Get } from '@nestjs/common';

// decorator: 애플리케이션 안에서 Controller 역할을 할 class를 생성한다고 Nest에게 알려줌
@Controller()
class AppController { // 해당 클래스는 유입되는 요청을 처리하고, 라우팅할 클래스
  @Get() // @Get decorator: GET HTTP metod를 갖는 요청에 대응하는 라우트 핸들러
  getRootRoute() { // 애플리케이션 루트 경로에 요청을 할 때마다 그 요청을 메서드로 라우팅
	  return 'hi there!';
  }

  @Get('/bye') // @Controller('/app')이라면, /app/bye 경로에 해당
  getByeThere() {
	  return 'bye there!';
  }
}
```

- `@Controller` decorator, `@Get` decorator에 아무 인수도 제공하지 않으면 root 경로에 응답하는 Route handler를 설정하게 됨

## Make Module

```tsx
import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

@Module({
  // @Module decorator 사용 시 설정 옵션이나 객체를 넣어줘야 함
  controllers: [AppController], // 사용하는 Controller 추가 (AppController에 대해 AppModule에게 알려줌)
})
class AppModule {}

// 애플리케이션이 시작될 때마다 실행될 함수
// 이름은 반드시 bootstrap일 필요는 없지만, 흔하게 사용하는 규약
async function bootstrap() {
  // AppModule로부터 새로운 Nest 애플리케이션 생성 (Nest 애플리케이션의 instance 생성)
  const app = await NestFactory.create(AppModule);

  // app이 3000번 포트로 유입되는 트래픽을 리스닝
  await app.listen(3000);
}
bootstrap(); // 함수 호출
```

Nest는 `AppModule`을 확인하고 → 나열된 모든 Controller를 검색함 → 그리고 나열된 Controller Class의 instance들을 자동으로 생성 → 그러고 나서 사용한 모든 decorator를 펴보고, 사용한 모든 decorator에 대해 Route handler를 설정

**실행 확인**

```tsx
npx ts-node-dev src/main.ts
```

# 04 NestJs Naming Rules (Conventions)

보통 Nest 애플리케이션에서는 파일 하나에 클래스를 하나만 만듦

- **One class per file** (some exceptions)
- Class names should **include the kind of thing** we are creating
- Name of class and name of file should always match up
  - 파일 이름이나 class 이름을 보면 그 목적을 즉시 알 수 있어야 함
- Filename template: `name.type_of_thing.ts`

### 예시

- main.ts
  - function bootstrap
- app.controller.ts
  - class AppController {}
- app.module.ts
  - class AppModule {}
