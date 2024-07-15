# Defining Routes

## Creating Routes

- Next.js는 폴더를 사용해 경로를 정의하는 파일 시스템 기반 라우터를 사용

- 각 폴더는 URL 세그먼트에 매핑되는 경로 세그먼트를 나타냄

- 중첩된 경로를 만들려면 폴더를 서로 중첩하면 됨

  - 연결하고 싶은 url로 폴더명을 생성한 후 해당 폴더 내에 page.tsx 생성
  - ex) app/dashboard/setting/page.tsx

- 어떤 설정이나 router 설치 없이도, `app` 폴더 안에 react component를 만들면 → 자동적으로 서버의 home으로 가보면 page.tsx의 ui가 렌더링되는 것을 확인할 수 있음

- 경로 여러개 → 폴더 내 폴더 구조로 한 후 page.tsx 생성
  - 폴더에 page.tsx가 없다면 해당 폴더명의 url로 접근했을 때 404 페이지
  - page.tsx가 없다면 경로의 일부분이 되는 폴더로만 존재하는 것 (추천하는 방식은 아님)

## Creating UI

- 각 경로 세그먼트에 대한 UI를 생성하는 데 특수 파일 규칙이 사용

- 가장 일반적인 것은 경로에 고유한 UI를 표시하는 페이지와 여러 경로에서 공유되는 UI를 표시하는 레이아웃

- page.tsx가 있는 폴더에 components 폴더를 만들고 파일명이 page.tsx가 아닌 파일명 컴포넌트로 만든 후 page.tsx 파일에서 해당 컴포넌트를 import해서 써오는 방식도 존재 → url 경로로 작동하지 않음

<br />
<br />

# Not Found Routes

## Not Found

app 폴더의 root 경로에 not-found.tsx 파일 생성

→ 설정하지 않은 url 경로에 접근 시 not-found.tsx 파일의 UI 렌더링

## Link

React와 동일하게 페이지 이동 시 a 태그가 아닌 `Link`를 사용

```tsx
import Link from 'next/link';

<Link href="/">Home</Link>;
```

## usePathname

현재 URL의 pathname을 읽을 수 있게 해주는 클라이언트 컴포넌트 훅

```tsx
import { usePathname } from 'next/navigation';
const path = usePathname();
```

## React client hook in Server Component 오류

서버 컴포넌트에서 React 클라이언트 훅을 사용하고 있을 때 발생하는 오류로 `"use client"` 를 추가해 클라이언트 컴포넌트로 바꿔줘야 함

<br />
<br />

# SSR vs CSR

## CSR; Client Side Rendering

CRA만 사용할 경우 client side rendering → 모든 UI building이 client측에서 발생

1. client는 JS를 로드
2. 그 후에 JS가 UI를 빌드

프레임워크 없이 React만 사용할 경우 JavaScript에 의해 태그가 페이지에 추가됨 → 사용자가 페이지에 접근하면 → 브라우저가 모든 JS 파일을 다운로드하고 실행하기 전까지는(브라우저의 JS 엔진에 의해 추가되기 전까지는) 빈 화면임

→ UI를 보려면 JS가 필요

→ 데이터 연결 상태가 좋지 않은 상태에서 웹사이트 방문 시 JS 파일이 다운로드 완료될 때까지 기다려야 함. UI 없는 빈 화면은 더 오래 보게 됨

### 검색 엔진 최적화(SEO; Search Engine Optimization)

많은 검색 엔진이 페이지의 HTML을 보기 때문에 빈 페이지를 보여주지 않는 것이 좋음

<br />

## SSR; Server Side Rendering

> [!NOTE]
> **rendering**
>
> Next.js가 React components(JS function)를 가져와서 → (React code를) 브라우저가 이해할 수 있는 HTML로 변환하는 작업

Next.js로 웹사이트를 빌드할 때는 자동적으로(automatically) default로 server side rendering이 사용됨

- 페이지의 UI가 모두 실제로 브라우저 코드에 존재

- 화면에 표시할 HTML을 가지고 있기 때문에 → JS가 로드될 때까지 브라우저가 기다릴 필요가 없음

- Next.js application의 모든 page 안의 모든 component들은 우선 server에서 render됨

- 사용자에게 HTML을 주기 전, Next.js는 server(backend)에서 application(모든 컴포넌트)을 render → HTML로 변환 → 그 HTML을 브라우저 request에 대한 response로 넘겨줌
  - 사용자는 Next.js가 backend에서 생성한 HTML을 보게 됨
  - 사용자가 페이지에 도착했을 때 → 최초 application의 UI 빌드에서 JS에 의존하지 않음 (UI는 이미 빌드되어 있고 HTML도 이미 존재함)

> [!CAUTION]
> Next.js의 모든 컴포넌트와 페이지들은 먼저 backend(server side)에서 render된다 (`"use client"` 사용 여부와 상관 없음)
