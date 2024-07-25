# Client Side

```tsx
// app/(home)/page.tsx

'use client'; // 없을 경우 useState() 관련 에러

// 프레임워크를 사용하지 않을 때 React의 data fetching: 브라우저가 API에 요청
export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const response = await fetch('https://...');
    const json = await response.json();
    setMovies(json);
    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return <div>{isLoading ? 'Loading...' : JSON.stringify(movies)}</div>;
}
```

## metadata export 에러

> You are attempting to export “metadata” from a component marked with “use client”, which is disallowed. Either remove the export, or the “use client” directive.

use client라고 쓰인 component에서는 metadata를 export해오는 게 허용되지 않음

## client에서 fetching할 때의 단점

💩 크롬 Network 탭에서 확인 가능해 보안에 취약함

→ 보안을 위해 항상 중간에 API를 만들어야 하고, 데이터베이스에 직접적으로 연결할 수 없음 (client ↔ API ↔ DB)

💩 Loading을 직접 구현해야 하고, 항상 useState를 써야 함

💩 수동으로 state 변화를 해줘야 함(`setMovies(json)`, `setLoading(false)`) → render를 발생시킴

💩 client component에 metadata를 쓸 수 없음

## Next.js server component에서 fetch

💡 useState, useEffect를 쓰지 않아도 됨

💡 Loading을 직접 구현하지 않아도 됨

💡 server component기 때문에 metadata 사용 가능

💡 API로 fetch하지 않음 (백엔드가 API 없이 직접 데이터베이스와 통신)

<br />
<br />

# Server Side

```tsx
// app/(home)/page.tsx

export const metadata = {
  title: 'Home',
};

const URL = 'https://...';

async function getMovies() {
  console.log('FETCHING'); // server component기 때문에 FE가 아닌 BE 콘솔에서 발생

  // BE에서 5초를 기다리게 하는 테스트 코드 (UI가 아닌 브라우저 탭에 로딩 표시)
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // return fetch(URL).then((response) => response.json());
  const response = await fetch(URL);
  const json = await response.json();
  return json;
}

export default async function HomePage() {
  const movies = await getMovies();

  return <div>{JSON.stringify(movies)}</div>;
}
```

<br />
<br />

# Loading Components

> [!NOTE]
>
> server component에서 fetch할 경우 코드가 노출되지 않아 보안성이 있지만 (+ useState, useEffect를 사용하지 않음, metadata 사용 가능), 데이터를 불러오는데 긴 시간이 걸림
>
> 백엔드에서 fetch되기 때문에 → 백엔드에서는 렌더링 작업이 이루어지지 않고 → 사용자를 위한 UI가 존재하지 않음 (페이지가 데이터를 받아올 때까지 비어 있음)

```tsx
// app/(home)/loading.tsx

export default function Loading() {
  return <h2>Loading...</h2>;
}
```

1. 사용자가 웹사이트 도착

2. server component 함수 내의 fetch가 완료되기 전에는 loading.tsx에 있는 컴포넌트를 표시

   - NextJS는 streaming을 사용해 페이지를 작은 HTML chunks로 나눠서 → 준비된 HTML chunks를 브라우저에게 줌 (navigation bar, loading component…)

3. fetch 완료 → server component의 완료된 결과값(homepage html)을 브라우저에 표시

> [!IMPORTANT]
>
> - 파일명이 loading여야 함
> - 로딩을 적용하고 싶은 경로의 page.tsx 파일과 같은 위치에 생성해야 함

<br />
<br />

# Parallel Requests

## 순차적으로 fetching할 경우

```tsx
// app/movies/[id]/page.tsx

import { API_URL } from '../../(home)/page';

async function getMovie(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log(`Fetching movies: ${Date.now()}`);

  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

async function getVideos(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log(`Fetching videos: ${Date.now()}`);

  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
}

export default async function MovieDetail({ params: { id } }: { params: { id: string } }) {
  console.log('start fetching');
  const movie = await getMovie(id);
  const video = await getVideos(id);
  console.log('end fetching');

  return <h1>{movie.title}</h1>;
}
```

video까지 불러오는 데 5초+5초 -> 최소 10초가 걸림

## Promise.all()을 사용해 한번에 fetching

```tsx
// app/movies/[id]/page.tsx

...

export default async function MovieDetail({ params: { id } }: { params: { id: string } }) {
  console.log('start fetching');

  const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);

  console.log('end fetching');

  return <h1>{movie.title}</h1>;
}

```

movie와 video를 동시에 받아오기 시작 → 총 5초에 받아옴 (순차적 작업 X)

> [!NOTE]
>
> Promise.all()는 자바스크립트에서 여러 비동기 작업을 동시에 실행하고, 모든 작업이 완료될 때까지 기다렸다가 결과를 배열 형태로 반환하는 함수입니다. 쉽게 말해, 여러 Promise를 모두 이행할 때까지 기다린 후, 그 결과를 한꺼번에 받아볼 수 있게 해줍니다.
>
> Promise.all은 하나라도 reject되면 전체가 reject되므로 오류 처리를 잘 해준다면 여러 Promise의 비동기 처리를 할 때 유용하게 사용 가능
