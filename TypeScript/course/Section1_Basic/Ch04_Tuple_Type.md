# 튜플(tuple) 타입

`Tuple` JS에 없는 TS의 타입

- `[1, 2]` Added by TypeScript: Fixed-length array
- 배열인데 길이와 타입이 고정된 배열
- 튜플은 항상 고정된 개수의 요소만 지녀야 함

  ```tsx
  const person = {
    name: 'Max',
    age: 30,
    hobbies: ['Sports', 'Cooking'], // Array
    role: [2, 'author'], // Tuple
  };

  // role에 커서 갖다대면 타입스크립트가 아래와 같이 추론한다는 걸 알 수 있음
  // role: (string | number)[]

  // 사용할 수 있는 타입이 뭔지 지정했고
  // 타입스크립트는 그냥 string, number면 되는구나 이래서 아래 코드 오류 안 남
  person.role.push('admin');
  person.role[1] = 10;
  ```

  - 첫 번째 요소는 항상 숫자 식별자
  - 두 번째 요소는 항상 문자열 식별자
  - 타입스크립트는 string, number 유형의 값이 포함된 배열이어야 한다고 이해함

<br />

- 어떤 role이어야 하는지 타입을 명시적으로 설정해서 타입스크립트에게 인식 시키기

  ```tsx
  const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: [number, string];
  } = {
    name: 'Max',
    age: 30,
    hobbies: ['Sports', 'Cooking'], // Array
    role: [2, 'author'], // Tuple
  };

  person.role.push('admin'); // push는 예외적으로 튜플에서 허용돼서, TS가 에러를 잡지 못함
  person.role[1] = 10; // ERROR

  person.role = []; // ERROR - 길이가 맞지 않음. 두 개의 요소가 있어야 함
  person.role = [0, 'admin'];
  person.role = [0, 'admin', 'user']; // ERROR - 길이가 맞지 않음. 두 개의 요소가 있어야 함
  ```

  - 튜플 타입은 JS에서는 일반 배열로 인식되지만, TS로 개발 도중 에러를 잡을 수 있음
