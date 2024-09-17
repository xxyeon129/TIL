> [!NOTE]
>
> **콜백 함수**
>  
> 다른 함수의 파라미터로써 전달되는 함수
> 
> 다른 함수가 실행이 끝난 뒤 실행되기를 원하는 함수 (어떤 작업이 완료된 후에 실행되어야 할 함수)

<br />

# 콜백 함수가 필요한 이유

JS는 비동기 프로그래밍을 하기 때문에, 코드가 순차적으로 실행되지 않을 때가 있다. 여기서 콜백 함수를 사용하면 “태스크가 끝나기 전에 함수가 실행되지 않는 것을 보장한다.” 원문에서 해당 문장을 가져왔는데, 콜백 함수를 인자로 받는 함수(A함수라고 하자)에서 A함수 코드 이후에 콜백함수가 호출된다면 → A함수 내부의 코드가 모두 실행된 후 콜백 함수 스코프로 들어가서 콜백 함수의  코드들이 실행되는 것으로 이해했다.

정리하자면, JS에서 콜백 함수를 만들어서 어떤 함수의 파라미터로 함수를 넘기고, 어떤 행위나 태스크가 완료된 직후에 콜백 함수를 호출하는 것이다.

## 콜백 지옥

지금은 Promise나 async await으로 비동기 제어를 주로 하기 때문에 콜백 함수로 순서를 보장한다는 점이 와닿지 않을 수 있지만, Promise나 async await이 나오기 이전에는 콜백함수로 순서를 보장하는 프로그래밍을 했다고 한다. 

콜백 지옥 문제로 Promist나 async await을 사용하지만, JS에서 비동기 처리의 가장 기본적인 방법은 콜백 함수를 사용하는 것이었다.

![image](https://github.com/user-attachments/assets/2fc482a2-f41f-4d73-82e5-33c645cf0ba6)

주로 이벤트 처리나 서버 통신과 같은 비동기적 작업을 수행할 때 콜백 함수를 전달하는 과정이 반복되어 코드 들여쓰기, depth 수준이 깊어지는 경우를 콜백 지옥이라고 한다. 가독성이 떨어지고, 유지 보수 측면에서 문제가 된다.

# 콜백 함수의 제어권

콜백 함수를 파라미터로 받는 함수는 콜백 함수의 제어권을 넘겨받게 되고, 콜백 함수 호출 시점에 대한 제어권을 가진다.

일반 함수의 경우 호출 주체와 제어권 모두 사용자가 가지고 있지만, 콜백 함수의 호출 주체와 제어권은 콜백 함수를 파라미터로 받는 함수가 가지게 된다. 그렇기 때문에 setTimeout이나 map 함수를 사용할 때 콜백 함수 내부의 각 인자를 순서에 맞게 정의된 규칙대로 작성해야 한다. 콜백 함수를 받는 코드(setTimeout이나 map 메서드)가 제어권이 있기 때문이다.

# 콜백 함수 활용

## setTimeout

```tsx
const message = function () {
	console.log("3초 후 실행되는 코드")
}

setTimeout(message, 3000);

// 익명 함수가 콜백 함수로 들어갈 경우
setTimeout(function () {
	console.log("3초 후 실행되는 코드")
}, 3000);
```

setTimeout함수가 message 함수를 콜백 함수로 받아 실행하는 예시 코드이다.

## 이벤트 처리

```tsx
<button id="callback-btn">Click here</button>

document.queryselector('#callback-btn')
	.addEventListener("click", function() {
		console.log("버튼 클릭");
});
```

addEventListener 메소드(이벤트 리스너 함수)는 첫 번째 파라미터로 이벤트 타입인 “클릭”을 받고, 두 번째 파라미터로 버튼이 클릭되었을 때 실행할 콜백 함수를 받는다.

## map

```tsx
const arr = [1, 4, 9, 16];
const mapArr = arr.map((currentValue, index) => currentValue * 2);
```

첫 번째 파라미터로 각 배열 요소를 받고, 두 번째 파라미터로 인덱스 값을 받는다.

# 콜백 함수에서의 this

## this 바인딩 문제

콜백 함수 내부에 this가 있는 채로 콜백 함수로 전달하면 this 바인딩에 문제가 발생한다.

```tsx
const obj = {
	a: 20,
	method: function () {
		console.log(this.a);
	}
}

setTimeout(obj.method, 1000) // undefined
```

setTimeout 안에 전달한 콜백은 함수일 뿐인지, obj의 콘텍스트를 갖고 있지 않다.(암시적 바인딩 소실) 따라서 this는 기본 바인딩이 적용되어 전역 객체에 바인딩된다.

## 문제 해결 > 명시적 this 바인딩

```tsx
const obj = {
	a: 20,
	method: function () {
		console.log(this.a);
	}
}

setTimeout(obj.method.bind(obj), 1000); // obj
```

bind 메서드를 활용해 this가 원하는 객체를 바라보도록 할 수 있다.