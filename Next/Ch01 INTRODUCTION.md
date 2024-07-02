# Library vs Framework

## ☑️ Library

개발자 주도 - 코드 내에서 사용하는 것

- library를 불러와서 library를 사용해 무언가를 함
- 원하는 방식대로 코드를 작성할 수 있고, 사용하고 싶을 때 사용할 수 있음
- `React.js`로 만든 프로젝트의 경우 → Routes 폴더를 만들어서 App.tsx가 연결되도록 할지, Components 폴더에서 연결되도록 할지… 이처럼 언제 react를 부를지, 어떤 폴더 구조로 만들지 폴더명을 뭘로 할지 정할 수 있음.
  - `index.tsx`에 `ReactDOM.render`가 있음

## ☑️ Framework

프레임워크 주도 - 코드를 불러오는 것

- 코드를 적절한 위치에 잘 적기만 한다면 framwork는 코드를 불러와서 모든 걸 동작하게 할거임
- Next.js와 같은 framework에서는 특정한 규칙을 따라서 특정한 걸 해야 함
  - `ReactDOM.render`가 없음 → 이 과정을 커스텀할 수 있는 곳이 없음
  - 할 수 있는 유일한 것은 app 폴더 안에서 뭔가를 만드는 것 뿐임.
  - next.js의 아주 깊은 저 멀리 어딘가의 코드에서 `ReactDOM.render`와 비슷한 걸 하고 있지만, 우리가 거기로 직접 접근하지는 못하는 것 → 추상화(abstraction)
- 코드를 어떤 곳에 넣으면 framework가 그 코드를 부르는 형태

> [!NOTE]
> React.js는 우리가 원할 때 부르고 원할 때 사용하는 library이고,
> Next.js는 코드를 적절한 곳에 넣어야 하는 framework

<br />

# Getting Started

```
npm init -y
npm install react@latest next@latest react-dom@latest
```

- package.json 파일로 node.js 프로젝트 생성
- react, next, react-dom install

<br />

```json
{
  "name": "learn-nextjs14",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "next dev"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "next": "^14.2.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}
```

- `"next dev"` 명령어를 호출하는 script 추가
  - 해당 명령어를 호출하면 → 자동으로 NextJS는 프레임워크로써 `app` 폴더를 참조하고 `page`라는 파일을 찾음

<br />

```tsx
// app/page.tsx
export default function Tomato() {
  return <h1>Hello NextJS!</h1>;
}
```

- export default로 된 react 컴포넌트여야 함

<br />

```
npm run dev
```
