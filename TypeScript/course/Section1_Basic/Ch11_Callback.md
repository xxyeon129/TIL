# 함수 타입 및 콜백

```tsx
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (result) => {
  console.log(result);
});
```

- 함수에 콜백함수를 전달하면, 타입스크립트는 해당 결과가 number가 될 것이라고 추론할 수 있으므로 → 콜백함수에서 number 타입으로 명시하지 않고도 number로 작업을 수행할 수 있다.
- 여기서 콜백함수에 return을 해도 오류가 안 남(콜백함수가 void 타입이라고 명시했는데도) → 이건 버그가 아니라, void로 명시하면서 (콜백함수에서) **반환할 수 있는 모든 결과를 무시**하게 되기 때문이다.

  - 즉, 콜백함수가 반환되는 값으로는 addAndHandle 함수 내에서 아무 작업도 수행하지 않는다고 void 타입 명시했기 때문

  ```tsx
  function sendRequest(data: string, cb: (response: any) => void) {
    return cb({ data: 'Hi there!' });
  }

  sendRequest('Send this!', (response) => {
    console.log(response);
    return true;
  });
  ```

> [!NOTE]
> 콜백 함수는 반환 값을 기대하지 않는 경우 (void로 타입이 명시된 경우)에도 값을 반환할 수 있음
