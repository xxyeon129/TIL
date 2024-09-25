# 리터럴(literal) 타입

단순한 특정 변수나 매개변수가 아님. 숫자나 문자열도 아니고 정확한 값을 가지는 타입.

```ts
function combine(
  input1: number | string,
  input2: number | string,
  resultConversion: 'as-number' | 'as-text'
) {
  let result;
  if (
    (typeof input1 === 'number' && typeof input2 === 'number') ||
    resultConversion === 'as-number'
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
  // if (resultConversion === 'as-number') {
  //     return +result;
  // } else {
  //     return result.toString();
  // }
}

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

const combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);

const combinedNames = combine('Max', 'Anna', 'as-text');
console.log(combinedNames);
```

- 단점은 개발자가 이 값들을 기억해야 함
- enum을 쓸 수도 있지만, as-text와 as-number 두 값만 있다면, 리터럴 타입의 사용을 고려할 수 있음
- 오타가 생기면 IDE가 알려줌

> [!NOTE]
> 리터럴 타입은 특정 문자열이나 숫자만 특정하여 허용하는 것. 다른 값은 허용되지 않음
