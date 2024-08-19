> **Execution Context(실행 컨텍스트)**
> : 실행할 코드에 제공할 환경 정보들을 모아놓은 객체

JS는 실행 컨텍스트가 활성화되는 시점에 다음 현상이 발생한다.

- 호이스팅 발생 (선언된 변수를 위로 끌어올림)
- 외부 환경 정보(outer) 구성
- this 값 설정

# 실행 컨텍스트 구성

실행 컨텍스트는 다음과 같은 것들을 이용할 경우 call stack에 쌓인다.

- 전역 공간은 자동으로 컨텍스트로 구성된다.
- 함수를 실행한다.
- eval() 함수를 실행한다.
- block을 만든다.

실행 컨텍스트 객체는 활성화 되는 시점에 `VariableEnvironment`, `LexicalEnvironment`, `ThisBinding` 세 가지 정보를 수집한다.

## VariableEnvironment

- 현재 컨텍스트 내의 식별자(변수)들에 대한 정보 **→ environmentRecord**
- 외부 환경 정보 **→ outerEnvironmentReference**
- 선언 시점의 LexicalEnvironment의 스냅샷(변경사항이 반영되지 않음)
  - 최초 실행 시의 스냅샷을 그대로 유지한다는 점에서 LexicalEnvironment와 다르다.
  - 스냅샷: 실행 중인 코드의 **실행 컨텍스트의 상태**를 특정 시점에 포착한 것

실행 컨텍스트를 생성할 때 VariableEnvironment에 정보를 먼저 담은 후, 이를 복사해 LexicalEnvironment를 만든다. 주로 LexicalEnvironment를 활용하기 때문에 VariableEnvironment는 스냅샷 유지를 목적으로 사용한다.

## LexicalEnvironment

- 현재 컨텍스트 내의 식별자(변수)들에 대한 정보 **→ environmentRecord**
- 외부 환경 정보 **→ outerEnvironmentReference**
- 처음에는 VariableEnvironment와 같지만, 변경 사항이 실시간으로 계속해서 반영됨

### VE, LE의 구성요소

> [!NOTE]
>
> **`environmentRecord`**
>
> 현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장된다.
>
> 컨텍스트 내부를 처음부터 끝까지 순서대로 훑어가며 수집한다. → **호이스팅** 발생
>
> - 함수의 매개변수 식별자
> - 함수 자체
> - 함수 내부의 변수 식별자

> [!NOTE]
>
> **`outerEnvironmentReference`**
>
> 현재 호출된 함수가 선언될 당시의 LexicalEnvironment를 참조한다. (전역 컨텍스트 등)
> outerEnvironmentReference로 인해 **scope**와 **scopeChain(외부 환경의 참조정보)**이 형성된다.
>
> scopeChain을 통해 상위 컨텍스트의 environmentRecord를 읽어올 수 있다.

## ThisBinding

this 식별자가 바라봐야 할 대상 객체(this로 지정된 객체가 저장됨)

실행 컨텍스트가 생성될 때(함수를 호출할 때) this가 결정된다.

- 전역 객체(window / global)
- 메서드로서 호출 시 호출 주체 객체

# 실행 컨텍스트 원칙

- 코드를 실행하는 순간 모든 것을 관리하는 환경인 `전역 컨텍스트`가 생긴다. (전역 컨텍스트는 페이지가 종료될 때까지 유지)
- 함수를 호출할 때마다 함수 컨텍스트를 생성한다.
- 컨텍스트 생성 시 컨텍스트 안에 `변수 객체(arguments, variable)`, `scope chain`, `this`가 생성된다.
  - arguments: 함수의 인자 → environmentRecord
  - variable: 해당 스코프의 변수들 → environmentRecord
  - scope chain: 자신과 상위 스코프들의 변수 객체 → outerEnvironmentReference
- 컨텍스트 생성 후 함수가 실행되는데, 사용되는 변수들은 변수 객체 안에서 값을 찾고, 없다면 scope chain을 따라 올라가며 변수를 찾는다.
- 함수 실행이 마무리되면 해당 컨텍스트는 사라진다. (클로저 제외) 페이지가 종료되면 전역 컨텍스트가 사라진다.

아래 코드로부터 전역 컨텍스트, A함수 컨텍스트, B함수 컨텍스트를 객체 형식으로 확인해보자.

```tsx
var value = 'string value';

function bFunc(word) {
  console.log(word + ' ' + value);
}

function aFunc() {
  var value = 'aFunc string';
  console.log(value); // aFunc string
  bFunc('hello');
}

aFunc();
```

## 전역 컨텍스트

```tsx
'전역 컨텍스트': {
	변수 객체(environmentRecord): {
		arguments: null,
		variable: ['value', 'aFunc', 'bFunc']
		// 호이스팅 때문에 함수는 선언과 동시에 대입
		// value는 이후 값이 대입됨
		// [{value: 'string value'}, {aFunc: Function}, {bFunc: Function}]
	},
	scopeChain: ['전역 변수객체'],
	this: window,
}
```

- this는 따로 설정되어 있지 않으면 window
- this를 바꾸는 방법 → new를 호출하거나, 함수에 다른 this 값을 bind
- this는 기본적으로 window고, new나 bind 같은 상황에서 this가 바뀜

## A함수 컨텍스트

```tsx
'aFunc 컨텍스트': {
	변수 객체(environmentRecord): {
		arguments: null,
		variable: ['value'], // 초기화 후 [{value: 'aFunc string'}]이 됨
	},
	scopeChain: ['aFunc 변수객체', '전역 변수객체'],
	this: window,
}
```

- A함수 안에서 (전역 위치에 있는) B함수를 호출할 경우 A함수 컨텍스트 안에서 B 변수를 찾을 수 없음. 이럴 경우 scope chain을 따라 올라가 상위 변수객체(전역 변수객체)에서 찾는다. 전역 변수객체의 variable에 B함수가 있으므로 이걸 호출함.
- B함수가 호출되면서 B 함수 컨텍스트도 생기게 됨

## B함수 컨텍스트

```tsx
'bFunc 컨텍스트': {
	변수 객체(environmentRecord): {
		arguments: [{word: 'hello'}],
		variable: null,
	},
	scopeChain: ['bFunc 변수객체', '전역 변수객체'],
	this: window,
}
```

- B 함수 컨텍스트에는 전역에 있는 변수(`value`)가 없으니, scope chain을 따라 전역 스코프에서 해당 변수를 찾는다.
- B 함수 컨텍스트에 따르면 B 함수는 A 함수 컨텍스트와 관련이 없음. A 함수 컨텍스트 내부의 변수(value)를 불러올 수 없음.

## 순서 요약

1. 코드 실행
2. 전역 컨텍스트 생성
3. aFunc 함수 컨텍스트 생성
4. bFunc 함수 컨텍스트 생성
5. bFunc 함수 종료 → bFunc 함수 컨텍스트 사라짐
6. aFunc 함수 종료 → aFunc 함수 컨텍스트 사라짐
7. 전역 컨텍스트 사라짐
8. 코드 종료
