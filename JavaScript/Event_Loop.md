# Event loop

JavaScript의 싱글 스레드 특성(한 번에 하나의 작업만 수행 가능) 때문에 
- JS 작업을 멀티 스레드로 돌려 작업을 동시에 처리하거나
- 여러 작업 중 어떤 작업을 우선으로 동작시킬지
제어하기 위해서 이벤트 루프가 필요하다.

> [!NOTE]
> 이벤트 루프는 JavaScript가 동시에 여러 작업을 수행하는 것처럼 보이도록 한다.
>
> 브라우저의 동작 타이밍을 제어하는 관리자로 볼 수 있다.
>
> 브라우저 내부의 Call Stack, Callback Queue, Web APIs 등의 요소를 모니터링하면서 비동기적으로 실행되는 작업들을 관리하고, 이 요소들을 순서대로 처리해서 프로그램의 실행 흐름을 제어한다.

<br />

파일 다운, 네트워크 요청, 타이머, 애니메이션 등 오래 걸리고 반복적인 작업들은 JS 엔진이 아닌, 브라우저 내부의 멀티 스레드인 Web APIs에서 비동기 + 논블로킹으로 처리된다.

> **비동기 + 논블로킹 (Async + Non blocking)**
> - 메인 스레드가 작업을 다른 곳에 요청해 대신 실행
> - 작업이 완료되면 이벤트나 콜백 함수를 받아 결과를 실행
> - 백그라운드 작업으로 전이해 동시에 처리가 가능하도록 함
> - 비동기 작업을 요청하면 브라우저에 내장된 멀티 스레드로 이루어진 Web API에 작업이 인가되어 메인 CallStack과 작업이 동시에 처리되게 됨
> - 대표적인 비동기 작업: 애니메이션 실행, 네트워크 통신, 마우스 키보드 입력, 타이머 등

<br />

## 이벤트 루프의 동작 과정

1. JS의 setTimeout이나 fetch와 같은 비동기 코드를 브라우저 Web APIs에게 맡기고,
2. 백그라운드 작업이 끝난 결과를 콜백 함수 형태로 Callback Queue에 넣고
3. 처리 준비가 되면 Call Stack에 넣어 마무리 작업을 진행한다.

이벤트 루프를 이용한 프로그램 방식 == 이벤트 기반(Event) 프로그래밍 == 프로그램 흐름이 이벤트에 의해 결정되는 방식
ex) 클릭, 키보드 입력 이벤트 발생 → 콜백 함수 실행(addEventListener(이벤트명, 콜백함수))

1. Call Stack이 비었는지 지속적으로 확인

2. Call Stack이 비면 → Microtask Queue를 확인 → 가장 오래된 태스크부터 꺼내서 → Call Stack으로 전달 (Microtask Queue가 텅 비어있을 때까지 수행)

3. 모든 마이크로 태스크가 처리된 후 → 렌더링 작업이 필요하면 렌더링 수행

4. Macrotask Queue 확인 → 가장 오래된 태스크부터 꺼내서 → Call Stack으로 전달
    - 매크로 태스크 하나를 처리할 때마다 (또다른 매크로태스크나 렌더링 작업을 하기 전에) Microtask Queue에 쌓인 마이크로 태스크 전부를 처리함
    - 그래서 마이크로 태스크가 모두 처리되기 전까지 UI 렌더링이나 네트워크 요청이 절대 일어나지 않는다.

<br />

## 이벤트 루프의 구성 요소

### ☑️ Call Stack

거의 모든 프로그래밍 언어에는 보이지 않는 곳에서 함수 호출을 관리하는 일종의 데이터 구조가 있다. JS의 경우는 CallStack.

- **JS 엔진이 코드를 실행할 때 사용하는 스택**

- JS는 싱글 스레드 언어이기 때문에 한 번에 하나의 작업만 콜 스택에서 실행될 수 있음

- JS가 return 키워드를 확인하거나, 함수 안에 더이상 실행할 코드가 없으면 컴파일러가 스택의 제일 위에 있는 항목을 제거함

- 함수의 호출들은 "프레임" 스택을 형성한다고 말함
  - 함수 실행 → 콜스택에 새로운 프레임이 생김
  - 처리가 끝남 → 콜스택에서 없어짐

### ☑️ Web APIs

- JS 엔진이 아님. **브라우저에서 제공하는 API**.

- 비동기인 setTimeout, Promise, fetch, DOM 등이 있음

- Call Stack에서 실행된 비동기 함수들은 모두 Web API를 호출 → Web API는 콜백함수를 Callback Queue에 넣음

- 비동기 코드를 만나면 Web API 영역으로 빠지고, 그 콜백은 바로 CallStack으로 가는 게 아니라 Callback Queue로 감

### ☑️ Callback Queue

비동기적으로 실행된 콜백함수가 보관되는 곳

- 일종의 Call Stack에 가기 위한 **대기열**

- 콜백 함수들은 Call Stack이 비었을 때, 대기열에 들어온 순서대로 수행됨

> [!NOTE]
>
> **Callback Queue의 종류 3가지**
>
> 1. Microtask Queue
>   - Promise와 함께 쓰이는 then/catch/finally 핸들러
>   - async await
>
> 2. Animation Frames
>
> 3. Macrotask Queue
>   - 외부 스크립트 `<script src="...">`가 로드될 때, 이 스크립트를 실행하는 것
>   - 마우스를 움직일 때 mousemove 이벤트와 이벤트 핸들러를 실행하는 것
>   - setTimeout에서 설정한 시간이 다 된 경우, 콜백 함수를 실행하는 것
