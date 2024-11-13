# 사용 이유

> traditional state management libraries are great for working with client state, they are **not so great at working with async or server state**. This is because **server state is totally different**.

# 등장 배경

GraphQL의 클라이언트 라이브러리 Apollo는 서버 데이터에 대한 캐시를 제공한다. React Query는 Apollo의 장점을 REST API로 가져온 라이브러리다.

# Client State vs. Server State

여느 클라이언트 상태처럼 서버 상태를 다루고 있었던 것처럼 보임

다만, 서버 상태는 어플리케이션이 소유하고 있지 않음 (서버로부터 불러오기 때문에)

단지 이 정보의 가장 최신 버전을 화면에 보여주기 위해 빌려왔을 뿐임. 데이터 자체는 서버가 보유하고 있음

# 사용 Tips

## ✅ React Query DevTools 사용

DevTool은 쿼리가 어떤 상태에 있는지, 현재 캐시에 어떤 데이터가 들어있는지 보여주기 때문에 디버깅이 쉬워진다.

또한 백그라운드에서 데이터 다시 불러오기를 더 잘 확인하기 위해서 브라우저 개발자 도구를 통해 네트워크 연결을 쓰로틀링하는 것도 도움이 된다.

## ✅ queryKey를 의존성 배열처럼 다루기

여기서 말하는 의존성 배열은 useEffect 훅의 의존성 배열이다. React Query 또한 queryKey가 변할 때마다 데이터를 다시 불러온다. 따라서 어떤 값이 변할 때마다 데이터를 불러오고자 한다면 그 값을 queryFn의 매개변수로 전달한다.

참고로 queryKey는 서버 데이터의 특정 상태를 캐시에 저장하는 데 사용된다. queryKey는 데이터가 어떻게 캐시될지, 어떤 상황에서 캐시된 데이터를 불러올지 결정하는 고유 식별자 역할을 한다.

```tsx
type State = 'all' | 'open' | 'done';
type Todo = {
  id: number;
  state: State;
};
type Todos = ReadonlyArray<Todo>;

const fetchTodos = async (state: State): Promise<Todos> => {
  const response = await axios.get(`todos/${state}`);
  return response.data;
};

export const useTodosQuery = (state: State) =>
  useQuery({
    queryKey: ['todos', state],
    queryFn: () => fetchTodos(state),
  });
```

todo 목록을 필터링 옵션(all, open, done)과 함께 보여주는 UI가 있다.

필터링 결과를 보관하는 로컬 상태가 있고, 사용자가 옵션을 변경하면 → 그 변경에 따라 로컬 상태가 업데이트되어 queryKey가 변경되고, → queryKey가 변경되었기 때문에 React Query는 자동으로 데이터를 다시 불러온다.

즉 사용자의 옵션 선택은 쿼리 함수(여기서 useTodosQuery)와 동기화되는데, 이는 useEffect의 의존성 배열과 유사하다.

✨ `queryKey`에 포함된 변수를 `queryFn`에 전달한다.

## ✅ initialData를 활용한 UX 개선

queryKey는 캐시의 key로 사용되기 때문에 위 코드에서 필터링 옵션(all → done)이 변경될 때 → queryKey가 바뀌면서 새로운 요청이 실행되어 → 새로운 캐시 항목이 생성된다. 기존에 캐시된 데이터가 없으면(첫번째 옵션 전환 시) 새로운 데이터를 불러오는 동안 하드 로딩 상태가 생겨 로딩 스피너가 출력될 것인데, 이는 이상적이지 않은 상황이다.

따라서 새로 생성된 캐시 항목을 `initialData`로 미리 채워둬서 클라이언트 사이드에서 todo 목록에 대한 사전 필터링을 할 수 있다. (새로운 데이터를 기다리는 동안 미리 채워둔 캐시에 있는 데이터를 사용하여 UI에 표시)

```tsx
type State = 'all' | 'open' | 'done';
type Todo = {
  id: number;
  state: State;
};
type Todos = ReadonlyArray<Todo>;

const fetchTodos = async (state: State): Promise<Todos> => {
  const response = await axios.get(`todos/${state}`);
  return response.data;
};

export const useTodosQuery = (state: State) =>
  useQuery({
    queryKey: ['todos', state],
    queryFn: () => fetchTodos(state),
    // ✨ pre-filtering
    initialData: () => {
      // 모든 todo 데이터를 가져오고 캐시에 저장
      const allTodos = queryClient.getQueryData<Todos>(['todos', 'all']);
      // 필터링 조건에 따라 해당 상태의 할 일 목록만 선택
      const filteredData = allTodos?.filter((todo) => todo.state === state) ?? [];

      // filteredData가 있으면 initialData로 반환해 UI에 즉시 표시
      return filteredData.length > 0 ? filteredData : undefined;
    },
  });
```

이제 사용자가 필터링 옵션을 전환할 때마다, 데이터가 아직 없다면 ‘all todos’ 캐시에서 데이터를 표시한다. 사용자에게는 ‘done’ 상태의 todo 목록이 즉시 표시되고, 백그라운드에서 데이터 불러오기가 완료되면 업데이트된 목록이 표시된다.

## ✅ Server State와 Client State 분리

**useQuery로 불러온 데이터를 로컬 상태에 넣지 않는다.**

- 로컬 상태는 useQuery로 불러온 데이터의 복사본이기 때문에, React Query에서 해주는 모든 백그라운드 업데이트가 적용되지 않는다.
- 로컬에 useQuery로 불러온 데이터 복사본이 없다면 항상 최신의 데이터 표시가 보장된다.
- 화면에 표시되는 데이터를 사용자가 수정할 수 있도록 할 경우에는 이 방식을 따르기 어렵다.

cf. useQuery로 불러온 데이터가 준비되었을 때 특정 컴포넌트를 렌더링하는 경우 useQuery로 불러온 데이터를 로컬 상태에 넣어도 괜찮다. 백그라운드 업데이트가 새로운 값을 불러올 가능성이 낮고, 불러온다고 해도 폼은 이미 초기화되었을 것이기 때문이다. 다만 백그라운드에서 불필요하게 데이터를 다시 불러오지 않도록 staleTime을 설정한다.

> **staleTime:** 쿼리가 fresh한 상태에서 stale한 상태로 변할 때까지 소요 시간
>
> - 쿼리가 fresh한 데이터는 항상 캐시에서 불러와지고, 네트워크 요청이 일어나지 않는다.
> - 쿼리가 stale한 데이터는 캐시에서 불러오겠지만 특정 조건에 의해 백그라운드에서 다시 불러와진다.

```tsx
const App = () => {
  const { data } = useQuery({
    queryKey: ['key'],
    queryFn,
    staleTime: Infinity,
  })

  return data ? <MyForm initialData={data} /> : null
}

const MyForm = ({ initialData }) => {
  const [data, setData] = React.useState(initialData)
  ...
}
```

## ✅ enabled 옵션 활용

useQuery 훅은 커스텀할 수 있는 여러 옵션이 있는데, 그 중 `enabled` 옵션 활용은 다음과 같이 다양한 작업을 통해 쿼리를 유연하게 제어하여 필요한 때만 실행하고, 불필요한 리소스 낭비를 방지할 수 있다.

- 종속적인 쿼리 (Dependent Queries)
  - 하나의 쿼리에서 데이터를 가져오고, 해당 쿼리에서 데이터를 성공적으로 얻은 후에만 두번째 쿼리를 실행하도록 설정할 수 있다.
- 쿼리 on/off (Turn queries on and off)
  - 쿼리가 활성 상태(on)일 때는 데이터가 지속해서 갱신되지만, `enabled:false`로 설정하면(off) 쿼리를 잠시 멈출 수 있다.
  - `refetchInterval`을 통해 주기적으로 데이터를 가져올 수 있는 쿼리가 있다면, 모달이 열렸을 때 일시적으로 해당 쿼리를 중지해 화면 뒤쪽에서 데이터 업데이트가 발생하지 않도록 할 수 있다.
- 사용자 입력 대기 (Wait for user input)
  - queryKey에 일부 필터 기준이 들어 있을 때, 사용자가 필터를 적용할 때까지 일시적으로 쿼리를 비활성화할 수 있다.
  - 사용자가 검색 조건을 입력한 후에 쿼리를 실행하려면 먼저 `enabled:false`로 시작하고, 사용자가 조건을 모두 설정한 후에 `enabled:true`로 바꿔서 쿼리를 실행할 수 있다.
- 사용자 입력 후 쿼리 비활성화 (Disable a query after some user input)
  - 서버 데이터보다 우선시해야 하는 draft값이 있는 경우이다.
  - 사용자가 작성한 draft값이 서버 데이터보다 중요하다면, `enabled: false`로 설정해 서버에서 데이터를 다시 가져오지 않게 할 수 있다.

## ✅ queryCache를 local state manager로 사용하지 않기

`queryCache`(또는 `queryClient.setQueryData`)를 직접 수정할 경우, 낙관적 업데이트(optimistic updates) 또는 백엔드에서 받은 데이터를 쓰는 용도로만 사용해야 한다.

- `queryCache`는 캐싱 목적으로 사용해야 하며, 로컬 상태 관리에는 React의 `useState` 같은 다른 방식을 사용하는 것이 안전하다.
- `queryClient.setQueryData`는 서버 데이터와 동기화되는 특성을 가지므로, 단순한 로컬 상태로 사용하면 데이터가 갑자기 덮어씌워질 수 있다. 로컬 상태가 필요할 경우 다른 방식을 사용한다.

## ✅ custom hooks 생성하기

단일 `useQuery` 호출만 감싸는 것이라도 커스텀 훅을 만드는 것은 유용하다.

- ✨ useQuery, 데이터 불러오기를 UI 코드와 분리할 수 있다.
- ✨ 특정 queryKey에 대한 모든 사용법, 타입정의를 한 파일에 모을 수 있다.
- ✨ 설정을 변경하거나 데이터 변환이 필요할 때 한 곳에서 수정할 수 있다.

→ 재사용성, 유지보수 개선 효과!

# 참고

[Practical React Query](https://tkdodo.eu/blog/practical-react-query)
