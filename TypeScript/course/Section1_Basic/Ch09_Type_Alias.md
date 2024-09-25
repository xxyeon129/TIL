# 사용자 정의 타입 (type alias)

union 타입을 중복해서 반복하는 건 번거로움. → 반복되는 union 타입을 저장할 수 있는 type alias 만들기 (재사용성, 코드양 줄이기)

JS에서는 지원하지 않는 TS 문법

```tsx
type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';
// 이름이 JS나 TS에 내장된 기능과 겹치지 말아야 함

function combine(input1: Combinable, input2: Combinable, resultConversion: ConversionDescriptor) {
  let result;
  return result;
}
```

<br />

객체 타입 type alias

```tsx
type User = { name: string; age: number };
const u1: User = { name: 'Max', age: 30 };
```

```tsx
function greet(user: { name: string; age: number }) {
  console.log('Hi, I am ' + user.name);
}

function isOlder(user: { name: string; age: number }, checkAge: number) {
  return checkAge > user.age;
}

// type alias를 이용해 위 코드를 단순화

type User = { name: string; age: number };

function greet(user: User) {
  console.log('Hi, I am ' + user.name);
}

function isOlder(user: User, checkAge: number) {
  return checkAge > user.age;
}
```
