# 배열 타입

```tsx
const person = {
  name: 'Max',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
};
```

- hobbies의 경우 string의 배열임을 `hobbies: string[]` 로 타입스크립트가 추론

- 새로운 변수를 추가할 때 변수의 타입을 설정할 수도 있음

  ```tsx
  let favoriteActivities: string[];

  favoriteActivities = ['Sports'];
  favoriteActivities = 'Sports'; // error
  favoriteActivities = ['Sports', 1]; // error
  ```

- 혼합된 타입의 배열 타입 설정
  ```tsx
  let favoriteActivities: any[];
  favoriteActivities = ['Sports', 1];
  ```
  - 자주 사용할 타입은 아님.
  - 타입스크립트의 장점을 누리지 못함

```tsx
const person = {
  name: 'Max',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
};

for (const hobby of person.hobbies) {
  console.log(hobby);
}

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  console.log(hobby.map()); // error
}
```

- 타입스크립트의 hobbies가 string 배열 타입이라고 이해했기 때문에 → person.hobbies는 string 타입 애들을 갖고 있는 배열이구나 인식 → hobby는 string 타입으로 인식됨 → hobby에 toUpperCase()와 같은 string 관련 메서드 써도 오류 안 남
- hobby에 map() 은 오류남 → hobby는 string 타입이니까
