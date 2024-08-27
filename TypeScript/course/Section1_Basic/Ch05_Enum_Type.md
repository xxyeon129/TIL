# 열거형(enum) 타입

`Enum` JS에 없는 TS의 타입

> `enum {NEW, OLD}` Added by TypeScript: Automatically enumerated global constant identifiers

- 0,1,2.. 숫자 식별자보다 인간이 읽을 수 있는 식별자 ‘READ ONLY USER’ → 대시가 있었는지, 띄어쓰기였는지, 카멜케이스였는지.. 기억해야 하는 문제가 있음 그래서 바닐라 JS에서는 식별할 수 있는 변수에 숫자를 담아 사용함.( `const ADMIN = 0;` `const READ_ONLY = 1;` )
  → 하지만 이 방법도 타입이 숫자로 추론되고, 모든 변수를 정의하고 관리해야 하는 문제가 있음.
  → 이 문제를 enum이 해결!
- enum은 사용자 지정 타입이기 때문에 대문자로 지정

```tsx
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}
// 꼭 대문자로 해야하는 건 아님 you can go with ANY value names.
// 순서에 따라 각각 0, 1, 2가 할당됨 (커서를 올리면 저장된 숫자가 표시됨)
// 숫자가 증가하기 시작하는 기본값이 0

// 다른 숫자를 할당할 수도 있음
// enum Role { ADMIN = 5, READ_ONLY, AUTHOR };
// 이렇게 하면 순서대로 5,6,7이 할당
// enum Role { ADMIN = 'ADMIN', READ_ONLY = 100, AUTHOR = 200 };
// 이렇게 하면 각각 할당 텍스트 할당도 가능. 어떤 것이든 할당 가능

const person = {
  name: 'Max',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: Role.ADMINs,
};

if (person.role === Role.AUTHOR) {
  console.log('is admin');
}
```

> [!NOTE]
> enum은 human readable, 값이 있는 식별자가 필요할 때 훌륭한 구성이다.
