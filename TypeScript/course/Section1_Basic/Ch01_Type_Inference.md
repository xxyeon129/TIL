# 타입 할당 및 타입 추론하기

```tsx
function add(n1: number, n2: number, showResult: boolean) {}
```

- 항상 매개변수 `이름`과 `:`, `type명`을 명시적으로 할당해야 함 (타입 배정)
- 이건 타입스크립트로 추가된 특별한 구문(syntax), 기능이지, 컴파일된 JS 코드의 일부가 아님. 타입스크립트 컴파일러가 이걸 이해하는 거임

```tsx
function add(n1: number, n2: number, showResult: boolean) {
  const result = n1 + n2;
}

const number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = 'Result is: ';

add(number1, number2, printResult, resultPhrase);
```

- 아래 변수들에 타입 배정을 하지 않아도 add 함수 안 result를 계산하는데, 타입스크립트에는 `타입 추론(type inference)`이라는 내장 기능을 활용하기 때문임.
  → 특정 변수나 상수에 어떤 타입을 사용했는지 타입스크립트가 잘 이해함
- 변수들에 타입 배정을 할 수 있음. 근데 어차피 타입스크립트가 추론할 수 있기 때문에 좋은 방법이 아님.
  ```tsx
  // const number1 = 5; // 어차피 이렇게 처음에 숫자를 할당하면 number 타입이라고 추론함
  let number1: number = 5;
  ```
- 위 방법(타입 추론)은 처음에 타입을 설정하지 않고 나중에 설정해 값을 할당하는 경우에 적합함

  ```tsx
  let number1: number;
  // 이렇게 하면 number1에 number 타입이 올 것이라는 걸 타입스크립트에 알려줄 수 있음

  number1 = 5;
  number1 = '5'; // error
  ```

- 어차피 처음에 값을 할당하면, 그 값에 따라 타입스크립트가 이 변수는 어떤 타입이 들어가는 거구나 추론함 (명시적 타입 할당)
  ```tsx
  let resultPhrase = 'Result is: '; // 여기서 string 타입이구나 추론
  resultPhrase = 0; // error
  ```

<br />

> [!NOTE]
> 이렇듯 TypeScript는 타입을 잘못 사용하고 있는지 확인하고 에러를 통해 알려주는 역할을 함
> TS는 컴파일 중에 타입이 확인되는 반면, JS 타입은 런타임 중에 타입이 확인됨
