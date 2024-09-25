# 조합(union) 타입

서로 다른 두 종류의 값을 사용해야 하는 애플리케이션에서 **union(`|`)을 사용**해서 타입스크립트에게 number나 string 타입 중 하나를 사용해도 괜찮다는 걸 알려줄 수 있다.

```tsx
// function add(n1: number, n2: number) {
//     const result = n1 + n2;
//     return result;
// }

function combine(n1: number, n2: number) {
  const result = n1 + n2;
  return result;
}

const combinedAges = combine(30, 26);
console.log(combinedAges);

const combinedNames = combine('Max', 'Anna'); // ERROR - number 타입이 아님
```

```tsx
function combine(input1: number | string, input2: number | string) {
  const result = input1 + input2;
  return result;
}

const combinedAges = combine(30, 26);
console.log(combinedAges);

const combinedNames = combine('Max', 'Anna');
```

- 필요한 만큼 타입을 사용할 수 있음 `input1: number | string | boolean`
- 그러면 아래와 같은 + 연산자 오류가 뜸

> Operator '+' cannoot be applied to types 'string | number' and 'string | number'.

- 원래는 string과 number 타입 더할 수 있는데, 타입스크립트는 union 타입만 이해할 뿐, union 타입 내에 무엇이 있는지는 분석하지 못하기 때문에 오류가 나는 것(연산자를 사용할 수 없는 타입도 있으니까)
- 런타임 검사를 실행해서 해결할 수 있음

  ```tsx
  function combine(input1: number | string, input2: number | string) {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
      result = input1 + input2;
    } else {
      result = input1.toString() + input2.toString();
    }
    return result;
  }

  const combinedAges = combine(30, 26);
  console.log(combinedAges);

  const combinedNames = combine('Max', 'Anna');
  console.log(combinedNames);
  ```

- union 타입을 사용하면 매개변수를 유연하게 사용할 수 있기 때문에, union 타입을 사용할 때 위 코드처럼 추가적인 런타임 타입 검사가 종종 필요함
- 물론 프로그램에 따라 런타임 검사를 수행하지 않고 union 타입을 사용할 수 있는 경우도 있음 → 구성하는 로직에 따라 다름
