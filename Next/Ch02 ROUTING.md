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
