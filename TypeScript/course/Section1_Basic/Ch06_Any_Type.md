# Any 타입

Any kind of value, no specific type assignment

- 타입스크립트에 어떤 것도 이해시키지 않음 → 모든 종류의 값을 저장할 수 있음

```tsx
let favoriteActivities: any[];
favoriteActivities = 5; // ERROR - 배열 형태여야 함
favoriteActivities = ['Sports', 5];
```

- TS가 주는 장점을 다 상쇄시켜서 바닐라 JS를 쓰는 것과 다를 바 없게 됨

- any를 쓰게 되면 어떤 값도 저장하지 않아서, TS 컴파일러가 체크할 부분이 없어져 작동을 하지 않게 됨

- 따라서 어떤 값이나 종류의 데이터가 어디에 저장될지 전혀 알 수 없는 경우에 대비하거나 런타임 검사를 수행하는 경우(런타임 도중 if문 써서 console.log(), throw new Error() 하는 등 작업의 범위를 좁히고자 할 때) any를 사용

- 이외에는 any 사용 자제. 작업 도중 어떤 종류의 데이터를 사용하는지 확실히 정리.
  - 타입스크립트 추론이 제 기능을 하도록 하거나, 타입을 정확하게 설정
