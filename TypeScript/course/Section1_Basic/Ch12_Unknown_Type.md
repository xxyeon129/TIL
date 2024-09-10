# unknown 타입

어떤 사용자가 무엇을 입력할지 알 수 없기 때문에 `unknonwn` 타입

- 에러 발생 없이 어떤 값이든 저장할 수 있음. number든 string이든 모든 것이 허용됨
- `any` 타입과 비슷해보이지만, `any` 타입과는 다르게 작동함

  - `unknown` 타입의 변수는 다른 타입에 할당할 수 없음

  ```tsx
  let userInput: unknown;
  let userName: string;

  userInput = 5;
  userInput = 'Max';
  userName = userInput; // ERROR
  ```

  ```tsx
  // any 타입은 가능. 가장 유연한 타입임
  let userInput: any;
  let userName: string;

  userInput = 5;
  userInput = 'Max';
  userName = userInput;
  ```

  - unknown 타입의 변수를 사용하고 싶다면, if문으로 조건 걸어서 추가적인 타입 검사하면 할당 가능

  ```tsx
  let userInput: unknown;
  let userName: string;

  userInput = 5;
  userInput = 'Max';

  if (typeof userInput === 'string') {
    userName = userInput;
  }
  ```

> [!NOTE]
> unknown이 any보다 나은 이유는 할 수 없는 작업에 대한 타입 검사를 수행할 수 있기 때문
