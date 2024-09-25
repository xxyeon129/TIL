# never 타입

(아무것도 반환하지 않는 void 타입과 달리) never 타입은 함수가 반환할 수 있는 타입

영원히 리턴하지 않는 함수 (또는 항상 throw하는 함수)는 `never`

```tsx
function generateError(message: string, code: number) {
    throw { message: message, errorCode: code };
}

generateError('An error occurred!', 500);
```

- 위 함수는 그저 void를 반환하는 것이 아님

- 물론, 아무것도 반환하지 않기 때문에 void가 반환되도록 명시할 수 있음
        
```tsx
function generateError(message: string, code: number): void {
  throw { message: message, errorCode: code };
}
```
        
- 하지만 단순히 아무것도 반환하지 않는 것은 아님 → never를 반환하고, 반환 값을 생성하지 않는 것

- result에 함수를 할당하고 console.log 해보면 로그가 안 찍히고 그냥 함수의 에러만 찍힘 → throw 에러가 스크립트와 충돌해서 스크립트가 취소되기 때문임
    - try catch로 감싸고 console.log 해봐도, generateError 함수는 기본적으로 값을 생성하지 않음 → generateError 함수 안의 throw 에러가 항상 스크립트나 스크립트의 일부와 충돌하기 때문에 generateError는 아무것도 반환하지 않음

- never를 할당하지 않고 마우스 커서를 올리면 void로 추론됨
    
    <img width="731" alt="screenshot" src="https://github.com/user-attachments/assets/51c4169f-e0e4-4d62-911a-67ab22118e5b">
    
    - 이는 ts 초기 버전부터 never가 사용되지 않아서 아직 반영이 안 됐기 때문
    - never가 아무것도 반환하지 않는다는 것을 확실히 하기 위해 never를 명시적으로 설정할 수 있음 (never는 영원히 아무것도 반환하지 않거나, 항상 throw를 할 때 사용하는 것이므로)
    → 코드 의도를 더 분명하게 할 수 있음
    - 아무것도 반환하지 않고 + 스크립트나 스크립트의 일부를 충돌시키거나 망가뜨리기 위한 것임을 알게 하는 거임

- `never`는 **일반적으로 함수의 리턴 타입으로 사용** 
- 함수의 리턴 타입으로 `never`가 사용될 경우, **항상 오류를 출력하거나 리턴 값을 절대로 내보내지 않음을 의미**
- 이는 무한 루프(loop)에 빠지는 것과 같음
    
    ```tsx
    function generateError(message: string, code: number): never {
        while(true){}
    }
    
    // 항상 오류 발생
    function invalid(message:string): never {
      throw new Error(message);
    }
    
    // never 타입을 결과 추론(Inferred)
    function fail() {
      return invalid('실패');
    }
    
    // 무한 루프
    function infiniteAnimate(): never {
      while ( true ) { infiniteAnimate(); }
    }
    ```
    
  
> [!NOTE]
> 영원히 반환하지 않는 함수나 throw를 던지는 함수가 never 타입에 일반적임