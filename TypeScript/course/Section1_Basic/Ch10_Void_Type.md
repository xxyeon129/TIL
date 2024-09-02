## void 타입

```tsx
function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number) {
  console.log('Result: ' + num);
}

printResult(add(5, 12));
```

- printResult 함수는 아무것도 return하지 않고 console.log만 하니까 `void`라는 특수한 반환 타입을 가짐 → 함수에 반환문이 없다는 뜻

- TS에서 undefined도 타입으로 사용할 수 있음

  ```tsx
  let someValue: undefined;
  ```

- 함수가 undefined를 비롯해 아무것도 반환하지 않는다면, void를 사용해야 함.

  ```tsx
  // ❌ ERROR
  function printResult(num: number): undefined {
    console.log('Result: ' + num);
  }

  // ⭕️
  function printResult(num: number): undefined {
    console.log('Result: ' + num);
    return;
  }

  // ⭕️
  function printResult(num: number): void {
    console.log('Result: ' + num);
  }

  // ⭕️
  function printResult(num: number): void {
    console.log('Result: ' + num);
    return;
  }
  ```

  - undefined로 타입을 설정하면, 타입스크립트는 값을 반환하지 않는 반환문(그냥 return 하나만 있는)이 있을 거라고 생각
  - JS에서는 `return;`이 없어도 그냥 undefined를 반환하는데, TS는 다르게 봄
  - 근데 이 경우는 매우 드문 경우임

- 값을 반환하지 않는 함수 사용 → `void` 사용 / 타입스크립트가 추론

- let으로 변수를 선언하면 디폴트로 any 타입이 됨. 하지만 any는 유용하지 않다

```tsx
function add(n1: number, n2: number) {
  return n1 + n2;
}

let combineValues;

combineValues = add;

console.log(combineValues(8, 8));
```

- 이렇게 하면 any 타입을 가진 변수(combineValues)로 함수를 실행하게 됨
  → any 타입이라서 문제가 있음
- combineValues에 숫자를 재할당하면 → 타입스크립트가 오류를 잡을 수 없어서, 컴파일 시 오류가 안 뜨고 런타임에서 오류가 뜸
  → combineValues가 함수 타입을 지니게 된다고 명시하면 됨

      ```tsx
      function add(n1: number, n2: number) {
          return n1 + n2;
      }

      let combineValues: Function;

      combineValues = add;

      console.log(combineValues(8, 8));
      ```

- 하지만 함수 타입으로 명시를 해도, 인자를 가지지 않는 함수를 재할당할 경우 에러를 잡아내지 못해서 런타임에서 오류가 생기는 문제가 있음

  ```tsx
  function printResult(num: number) {
    console.log('Result: ' + num);
  }

  printResult(add(5, 12));

  let combineValues: Function;

  combineValues = add;
  combineValues = printResult;

  console.log(combineValues(8, 8));
  ```

- 위 문제를 해결하기 위해 함수의 매개변수, 반환값 타입도 지정할 수 있음
  매개변수 a, b 이름은 임의로 정해도 됨

```ts
function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number) {
  console.log('Result: ' + num);
}

printResult(add(5, 12));

let combineValues: (a: number, b: number) => number;

combineValues = add;
combineValues = printResult; // ERROR - 컴파일 오류

console.log(combineValues(8, 8));
```
