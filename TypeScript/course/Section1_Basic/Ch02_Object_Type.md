# 객체 타입

타입스크립트가 객체 타입을 추론하는 방법

![Untitled](https://github.com/user-attachments/assets/516b5100-183a-4961-a619-41c25de36656)

`:` 뒤에 있는 내용이 person에 저장된 데이터 타입이라고 추론함

- JS 객체가 아님! 타입스크립트가 추론한 객체 타입임.
  - JS 객체처럼 보일 수 있는데, JS 객체와는 다르게 `;`을 붙인 걸 보면 타입 추론이라는 것을 알 수 있음. JS 객체는 `,`를 붙임.
  - `key: value` 쌍이 아니라, `key: type` 쌍임
- `object`가 할당된 상수에 타입을 number나 string 등 타입을 명시적으로 할당할 수 있음

  ```tsx
  const person: object = {
    name: 'Max',
    age: 30,
  };

  console.log(person.name); // error
  // 이미 name이 존재하기 때문에 오류뜸
  // 타입스크립트는 어떤 정보도 주지 않는 객체가 있다고 이해함
  // -> 타입스크립트는 객체에 대한 정보가 없으므로 어떤 타입의 속성도 지원하지 않음
  // -> 더 구체적인 객체 타입을 지정해서 추론할 수 있게 해야 함
  ```

- 더 상세하게 객체 타입 지정하기

  - 새로운 JS 객체를 만드는게 아님 → 컴파일러 JS 코드에서 제거됨
  - 그저 특정 객체 타입의 TS 표기법. 객체 구조(타입)에 대한 정보 제공
  - 빈 중괄호 쌍만 타입으로 할당해도 ( `const person: {} = { name: ‘Max’, age: 30 }` ) object로 타입 지정한 것 ( `const person: object = { name: ‘Max’, age: 30 }` ) 과 동일한 작업으로 봄

  ```tsx
  const person: {
    name: string;
    age: number;
    // ❌ age: 30; -> 타입스크립트를 명시적으로 지정하는 건 좋은 방식이 아님!
    // number type이라고 알려줘야 함
    // 특정 숫자로 제한하면 JS 객체의 age 값을 30이 아닌 값으로 변경하는 즉시 문제가 생김
  } = {
    name: 'Max',
    age: 30,
  };

  console.log(person.name);
  ```

> [!NOTE]
>
> 타입과 타입 배정은 JS가 아닌 TS에만 해당된다.

- 이게 더 나은 구문 (타입스크립트가 추론)

  ```tsx
  const person = {
    name: 'Max',
    age: 30,
  };

  console.log(person.name);
  ```

## 중첩된 객체 및 타입

객체 타입은 중첩 객체에도 생성할 수 있음

```ts
// JS 객체

const product = {
  id: 'abc1',
  price: 12.99,
  tags: ['great-offer', 'hot-and-new'],
  details: {
    title: 'Red Carpet',
    description: 'A great carpet - almost brand-new!'
  }
}

// 위 객체의 타입

{
  id: string;
  price: number;
  tags: string[];
  details: {
    title: string;
    description: string;
  }
}
```
