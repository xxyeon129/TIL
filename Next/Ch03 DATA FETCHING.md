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

# # Server Side

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
