# Intro

## 테스트 코드 사용 이유

1. 수동으로 모든 기능 확인하는 시간 줄여줌
2. 버그 발생 줄여주거나 발생한 버그가 다시 발생하지 않도록 해줌
3. 코드 수정 시 수정한 코드가 다른 코드에 영향을 주어 버그를 발생시키는지 간단히 확인 가능
4. 신뢰할 수 있는 코드 → 서비스 안정적 유지

## ✨ Jest 장점

Jest는 페이스북에서 개발/관리하는 JS 테스트 프레임워크 → React 개발/관리하는 페이스북에서 Jest를 만들었기 때문에 React에서는 Jest가 많이 쓰임

### 1️⃣ Zero 설정

Jest는 테스트를 위한 많은 설정을 지양하고, 테스트를 쉽게 시작하고 테스트에 집중하도록 제로 설정을 지향하고 있다.

### 2️⃣ Snapshot

값 확인이 어려운(값을 일일이 확인하기 어려운) 큰 object를 그대로 저장한 후 추후에 값이 변경되면 ERROR를 표시하는 스냅샷 기능을 제공한다.

React에서는 스냅샷 기능을 통해 렌더링된 컴포넌트의 변경 사항이 있는지 체크한다.

### 3️⃣ Mocking

테스트 범위를 벗어나는 객체들을 간단하게 Mocking(모의 객체)로 만들어 실제로 테스트해야 할 부분을 집중해서 테스트할 수 있도록 돕는다.

### 4️⃣ Test code 분리

Jest의 테스트 코드는 완전히 분리되어 있어 → 동시에 실행할 수 있어 → 빠른 성능을 제공한다.

### 5️⃣ 간단한 API

쉽고 간단하게 테스트할 수 있는 API

`--coverage` 옵션을 통해 Code coverage를 간단하게 확인 가능

<br />

# Jest 환경설정

## ✅ 설치

```tsx
npm install --save-dev jest
```

## ✅ 스크립트 추가

```json
// package.json

"scripts": {
	"test": "jest --watch"
}.
```

- `watch` 옵션: 파일을 감시하고 있다가 → 파일이 변경되면 → 해당 파일의 테스트 코드를 다시 실행하기 위한 옵션
  - watch 옵션 때문에 자동으로 테스트가 실행되지만, 명령 프롬프트에 표시된 키를 눌러 동작 실행 가능 (ex. Press a to run all tests)

## ✅ 명령어 실행

```tsx
npm run test
```

## ✅ Jest 사용 방법

Jest는 파일 확장자가 `.test.js`로 끝나는 파일들을 테스트 파일로 인식하고 해당 파일을 실행한다.

→ `.test.js` 테스트 파일에 테스트하고자 하는 파일에 관한 테스트를 작성한다.

<br />

# Jest 활용

```jsx
// index.js
const sum = (a, b) => {
  return a + b;
};

module.exports = {
  sum,
};
```

```jsx
// index.test.js
const { sum } = require("./index");

describe("test index.js file", () => {
  it("sums 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
```

- `describe` 함수: 여러 테스트를 한 그룹으로 묶고 설명을 붙이기 위해 사용
  - 매개변수 1: 명령 프롬프트에 표시할 내용
  - 매개변수 2: 여러 테스트를 그룹으로 묶을 콜백함수
- `it` 함수: 실제 테스트가 실행되는 테스트 명세를 작성할 때 사용
  - 매개변수 1: 테스트 명세의 설명
  - 매개변수 2: 실제로 테스트를 실행하는 테스트 코드

<br />

# Matcher

Matcher는 Jest가 제공하는 함수로, 결과값을 비교하여 테스트의 성공 여부를 판단할 때 사용

## ✅ toEqual

Object를 비교할 때 사용되는 Matcher

```jsx
// index.js
const person = (name, age) => {
  return { name, age };
};

module.exports = {
  ...person,
};
```

```jsx
// index.test.js
const {..., person} = require('./index');

describe('test index.js file', () => {
	...
	it('makes a person', () => {
		expect(person('Kim', 20)).toEqual({
			name: 'Kim',
			age: 20,
		})
	})
})
```

- person 함수를 통해 생성한 값과 object를 단순 비교(`===`)하면 다른 값이라고 판단하게 되므로 → Jest에서 object를 테스트할 때는 `toEqual`을 사용하여 테스트한다.
- `toBe`를 사용하면 단순히 값을 비교하므로 에러가 발생해 테스트가 통과하지 못한다.

## ✅ toBeTruthy, toBeFalsy

Boolean값을 체크할 때 사용하는 Matcher

```jsx
// index.js
const toggle = (a) => {
  return !a;
};

module.exports = {
  ...toggle,
};
```

```jsx
// index.test.js
const {..., toggle} = require('./index');

describe('test index.js file', () => {
	...
	it('returns false', () => {
		expect(toggle(true)).toBeFalsy();
		expect(toggle(true)).not.toBeTruthy();
	});
});
```

## ✅ toContain

Array에 특정값이 포함되어 있는지 확인

```jsx
// index.js
const range = (start, end) => {
  let result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};

module.exports = {
  ...range,
};
```

```jsx
// index.test.js
const {..., range} = require('./index');

describe('test index.js file', () => {
	...
	it('has 2', () => {
		expect(range(1,3)).toContain(2);
	});
});
```

이외에도 Jest에는 많은 Matcher가 존재한다.

[Expect · Jest](https://jestjs.io/docs/expect)

<br />

# Code coverage

테스트에서 코드 커버리지: 테스트 대상이 되는 소스코드 중 **테스트 코드를 통해 검증된 코드의 비율**

- 테스트 수행 결과를 정량적으로 나타내는 수치
- 이 지표를 통해 테스트 코드가 작성되지 않은 코드를 확인 가능

Jest에서는 다음 명령어를 통해 코드 커버리지를 확인할 수 있다.

```bash
npx jest --coverage
```
