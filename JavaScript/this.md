> 이 문서는 아래 출처를 토대로 작성했습니다.
>
> - [<You Don't Know JS: this와 객체 프로토타입, 비동기와 성능>](https://product.kyobobook.co.kr/detail/S000001057934)
> - [this 바인딩 엄격모드](https://kwangsunny.tistory.com/40)
> - [this 바인딩 규칙](https://seungtaek-overflow.tistory.com/21)

JavaScript 함수는 호출될 때 매개변수 인자값 이외에 arguments 객체, this를 암묵적으로 전달 받는다.

함수 호출 방식에 의해 this에 바인딩할 어떤 객체가 동적으로 결정된다. 즉 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아니라, 함수를 호출하는 시점에 함수가 어떤 방식으로 호출되었냐에 따라 this에 바인딩할 객체가 동적으로 결정된다.

> [!NOTE]
>
> **바인딩**
>
> - 값과 식별자 사이의 연관 관계
> - 함수 또는 메소드를 호출한 대상에 실제 함수를 연결해주는 것
>   → 함수를 호출하는 부분에 **함수가 위치한 메모리 번지**를 연결시켜주는 것
>
> ### 정적 바인딩
>
> 바인딩이 코드 실행 전 컴파일 단계에서 이루어지는 것
>
> 함수가 선언된 순간 코드상으로 바로 바깥쪽에 있는 스코프의 this를 사용
>
> - JavaScript의 경우 ES6에서 import문을 통해 모듈을 임포트하는 경우 가져온 모듈의 함수, 변수 등을 정적으로 바인딩한다.
> - 화살표 함수
>
> ### 동적 바인딩
>
> 바인딩이 런타임 도중에 이루어지는 것 (JavaScript에서 대부분의 바인딩)
>
> - 함수 리터럴, 함수 표현식으로 정의된 함수 내에서 this가 가리키는 값
> - JS에서 변수 선언 시 변수 선언문에 도달해야 실제 값 할당이 이루어짐

<br />

# 엄격모드 “use strict”

엄격모드에 따라 this가 가리키는 값이 상황에 따라 달라진다.

> [!NOTE] > **엄격모드**
>
> JS는 계속 업데이트되고 있는 언어이기 때문에, 새로운 문법들과 기능들이 추가되고 변경된다. 이렇게 수정된 기능들을 바로 적용하면 레거시 코드를이 오작동을 일으키기 때문에, 이를 방지하고자 엄격모드에서만 변경 사항들이 적용되도록 설계했다.

</aside>

엄격모드를 적용하는 방법은 스크립트 가장 상단에 `"use strict"`를 명시하면 된다.

특정 함수에서만 엄격모드를 적용하고 싶다면, 함수 내부의 가장 상단에 `"use strict"`를 명시하면 된다.

모듈 스크립트는 엄격모드가 기본값이라 `"use strict"`를 따로 명시할 필요가 없다.

```jsx
<script type="module">
  // 엄격모드로 실행됨
</script>

<script>
  'use strict' // 스크립트 최상단에 명시해야 엄격모드 적용됨
</script>
```

# this 바인딩 (default, implicit, explicit, new, arrow function)

JS에서 this가 참조하는 것은 함수가 호출되는 방식에 따라 결정되는데(동적 바인딩), 이걸 this binding이라고 한다.

this 바인딩은 기본 바인딩, 암시적 바인딩, 명시적 바인딩, new 바인딩, 화살표 함수(ES6) 5가지 규칙이 있다.

<br />

## 1️⃣ 기본 바인딩 (Default Binding)

4가지 규칙 중 해당하는 것이 없을 때 적용되는 기본 규칙이다. 기본 바인딩에서 this는 전역 객체에 바인딩된다.

전역 객체는 런타임 환경에 따라 브라우저 환경인 경우 `window`, Node.js 환경인 경우 `global`이다.

```jsx
function foo() {
  const a = 1;
  console.log(this.a);
}

foo(); // undefined
```

```jsx
window.a = 10;

function foo() {
  console.log(this.a);
}

foo(); // 10
```

```jsx
"use strict";
window.a = 20;

function foo() {
  console.log(this.a);
}

foo(); // TypeError: Cannot read property 'a' of undefined
```

엄격 모드에서는 기본 바인딩 대상에서 전역 객체가 제외된다. 전역 객체를 참조해야 할 this가 있다면 그 값은 undefined가 된다.

<br />

## 2️⃣ 암시적 바인딩 (Implicit Binding)

함수가 객체의 메서드로서 호출되는 상황에서는 호출 주체를 명시할 수 있기 때문에 → this는 함수를 호출한 객체(context 객체)에 바인딩된다. 즉, 호출을 누가 했는지에 대한 정보가 this에 담긴다.

```jsx
const obj = {
  a: 20,
  method: function () {
    console.log(this.a);
  },
};

obj.method(); // 20
```

```jsx
const obj = {
  methodA: function () {
    console.log(this);
  },
  inner: {
    methodB: function () {
      console.log(this);
    },
  },
};

obj.methodA(); // this === obj
obj.inner.methodB(); // this === obj.inner
```

객체의 메서드 내부 함수에서의 this는 메서드가 아닌 함수로서 호출하는 것이기 때문에 this는 전역객체를 의미한다.

```jsx
const obj1 = {
  outer: function () {
    const innerFunc = function () {
      console.log(this); // window
    };
    innerFunc();
  },
};
obj1.outer();
```

암시적 바인딩 사용 시 함수를 매개변수(콜백)로 넘겨서 실행하면 문제가 발생한다.

```jsx
const obj = {
  a: 20,
  method: function () {
    console.log(this.a);
  },
};

setTimeout(obj.method, 1); // undefined
```

그 이유는 setTimeout 함수 안에 전달한 콜백은 method 함수의 레퍼런스일 뿐, obj의 콘텍스트를 갖고 있지 않기 때문이다. 이 상황을 암시적 바인딩이 소실되었다고 한다.

setTimeout 내부에서 호출되는 콜백은 obj 객체의 콘텍스트에서 실행되는 것이 아니기 때문에, this는 기본 바인딩이 적용되어 전역 객체에 바인딩된다.

```jsx
function setTimeout(cb, delay) {
  cb(); // 기본 바인딩. obj.metod()가 아닌 method()와 같다
}
```

콜백 함수도 함수기 때문에, 함수가 인자로 전달될 때 함수 자체로 전달해 this는 전역 객체를 참조한다. 하지만 콜백함수를 넘겨받은 함수에서 콜백 함수에 별도로 this를 지정한 addEventListener와 같은 경우 예외적으로 그 대상을 참조한다.

```tsx
document.body.innerHTML += '<button id="a">CLICK</button>';
document.body.querySelector("#a").addEventListener("click", function (e) {
  console.log(this, e);
});
// this는 호출한 주체 element인 button을 의미
```

<br />

## 3️⃣ 명시적 바인딩 (Explicit Binding)

JavaScript의 모든 함수는 `call()`, `apply()`, `bind()`라는 내장 메서드를 가지고 있다. 함수는 new Function()에 의해 만들어진 객체이고, Function의 프로토타입에 call, apply, bind가 이미 정의되어 있기 때문에 모든 함수는 call, apply, bind 메서드를 기본으로 사용할 수 있다. 이 3가지 메서드 중 하나를 호출해 this 바인딩을 코드에서 명시하는 것을 **명시적 바인딩**이라고 한다. 명시적 바인딩을 할 때 this는 명시한 객체에 바인딩된다.

자동으로 부여되는 상황별 this의 규칙을 깨고 this에 명시한 별도의 값을 저장하는 방법이라고 할 수 있다.

### call(), apply()

```tsx
const obj = { a: 20 };

function func() {
  console.log(this.a);
}

func.call(obj); // 20
func.apply(obj); // 20
```

매개변수에 this로 바인딩할 객체를 넣어주면 명시적 바인딩을 할 수 있다.

`call()`과 `apply()` 메서드는 동일하지만, this에 바인딩할 객체를 넣고 나머지 매개변수를 넣는 형식만 차이가 있다. `apply()`는 나머지 매개변수를 배열 형태로 넘겨준다.

```tsx
const func = function (a, b, c) {
  console.log(this, a, b, c);
};
func.call({ x: 1 }, 4, 5, 6); // { x: 1 } 4 5 6
func.apply({ x: 1 }, [4, 5, 6]); // { x: 1 } 4 5 6

const obj = {
  a: 1,
  method: function (x, y) {
    console.log(this.a, x, y);
  },
};

obj.method.call({ a: 4 }, 5, 6); // 4 5 6
obj.method.apply({ a: 4 }, [5, 6]); //  4 5 6
```

- call / apply 메서드 활용

  - 유사배열객체(array-like-object)에 배열 메서드 적용 → Array.from(ES6) 등장으로 잘 쓰지 않음
  - 생성자 함수 내부에서 다른 생성자 함수를 호출해 공통된 내용의 반복 제거

    ```tsx
    function Person(name, gender) {
      this.name = name;
      this.gender = gender;
    }

    function Employee(name, gender, company) {
      Person.apply(this, [name, gender]); // this는 employee 인스턴스
      this.company = company;
    }

    function Student(name, gender, school) {
      Person.call(this, name, gender); // this는 student 인스턴스
      this.school = school;
    }

    const inst = new Employee("sunny", "female", "Google");
    ```

  - 배열의 값들을 여러 인자로 전달할 때 → spread operation으로 잘 쓰지 않음
  - 상위 컨텍스트의 this를 내부함수나 콜백 함수에 전달

    ```tsx
    const obj = {
      outer: function () {
        console.log(this); // obj
        const innerFunc = function () {
          console.log(this);
        };

        innerFunc.call(this); // obj
      },
    };

    obj.outer();
    ```

### bind()

```tsx
const obj = { a: 20 };

function func() {
  console.log(this.a);
}

const bound = func.bind(obj);

bound(); // 20
```

bind 메서드는 매개변수로 전달받은 객체로 this가 바인딩된 함수를 반환한다. 이를 하드 바인딩이라고 하는데, 하드 바인딩된 함수는 이후 호출될 때마다 처음 정해진 this 바인딩을 가지고 호출된다.

call / apply와는 다르게 즉시 호출하지 않고 함수에 this를 미리 적용해 넘겨받은 this 및 인자들을 바탕으로 새로운 함수를 반환하는 메서드이다.

- bind 메서드의 인수 고정을 이용해 특정 기능을 수행하는 함수를 만들어낼 수 있는데, 이를 `부분적용`이라고 부른다.

  ```tsx
  function add(a, b) {
    console.log(a + b);
  }
  const add3 = add.bind(null, 3);
  const add5 = add.bind(null, 5);

  add3(10); // 13
  add5(10); // 15
  ```

- 하드 바인딩된 함수를 name 프로퍼티로 확인할 경우 ‘bound’ 접두어가 붙는다.

  ```tsx
  const func = function (a, b, c, d) {
    console.log(this, a, b, c, d);
  };
  const bindFunc = func.bind({ x: 1 }, 4, 5);

  console.log(func.name); // func
  console.log(bindFunc.name); // bound func
  ```

- bind 메서드를 통해 반환된 함수는 다시 bind를 해도 this값이 바뀌지 않고, 처음 바인딩된 객체를 가리킨다.

  ```tsx
  function func() {
    console.log(this);
  }
  const bindFunc = func.bind({ a: "a" }).bind({ b: "b" });
  bindFunc(); // {a: 'a'}
  ```

- 상위 컨텍스트의 this를 내부함수나 콜백 함수에 전달할 때 bind 메서드 사용

  ```tsx
  const obj = {
    outer: function () {
      console.log(this);

      const innerFunc = function () {
        console.log(this);
      }.bind(this);

      innerFunc(); // obj
    },
  };
  obj.outer();
  ```

- 콜백 함수의 this 유실에 bind 메서드 사용

  ```tsx
  const obj = {
    method: function () {
      console.log(this);
    },
    method1: function () {
      // this 유실
      setTimeout(this.method, 300);
    },
    method2: function () {
      // 명시적 this 바인딩으로 인해 정상 작동
      setTimeout(this.method.bind(this), 600);
    },
  };

  obj.method1(); // window { ... }
  obj.method2(); // obj
  ```

<br />

## 4️⃣ new 바인딩 (new Binding)

JavaScript에서는 함수를 호출할 때 함수 앞에 new 키워드를 명시해 객체를 초기화하는 것이 가능하다. 이때 사용되는 함수를 생성자 함수라고 한다. (컨벤션으로 생성자 함수는 대문자로 시작한다)

생성자 함수는 객체를 반환하고, 생성자 함수 내부에 사용된 this는 반환된 객체를 가리킨다.

생성자 함수에서는 this 키워드를 해당 생성자를 이용해 생성할 객체에 대한 참조로 사용한다. 즉 새로 생성된 객체가 this로 바인딩된다.

```tsx
function Person() {
  // this = {} // 빈 객체가 할당된 this가 암묵적으로 만들어짐
  this.name = "sunny";
  this.func = function () {
    console.log(this);
  };
  // return this; // 암묵적으로 this를 리턴함
}

let me = new Person();
me.func(); // Person { name: 'sunny', func: f }
// this는 생성된 객체 자신
```

<br />

## 5️⃣ 화살표 함수 (Arrow Function)

화살표 함수는 함수 내부에서 this가 전역 객체를 바라보는 문제로 ES6에 도입되었다. 따라서 실행 컨텍스트 생성 시 this 바인딩 과정이 제외되어 앞 4가지 규칙들이 적용되지 않고, this에 Lexical scope가 적용된다. 즉, 화살표 함수를 정의하는 시점의 컨텍스트 객체가 this에 바인딩된다.

지금까지 봤던 this 바인딩은 함수가 호출되는 시점에 발생하는 동적 바인딩이지만, 화살표 함수는 정적 바인딩이다. 함수 내부에 this 할당 과정(바인딩 과정) 자체가 없고, 접근할 때 scopeChain에서 가장 가까운 this에 접근하게 된다.

```tsx
const obj = {
  outer: function () {
    console.log(this); // obj

    const innerFunc = () => {
      console.log(this); // obj
    };
    innerFunc();
  },
};

obj.outer();
```

화살표 함수로 선언했을 때 Lexical scope를 통해 바인딩된 this는 apply, bind 등의 함수나 new 함수로 오버라이드할 수 없어 주로 콜백 함수로 화살표 함수를 사용할 때 유용하다.

```tsx
const obj = {
  a: 20,
  method: function () {
    setTimeout(() => {
      console.log(this.a);
    }, 1);
  },
};

obj.method(); // 20
```
