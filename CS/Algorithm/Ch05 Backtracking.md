# Backtracking Technique

해를 찾는 도중 해가 아니어서 막히면, 되돌아가서 다시 해를 찾아가는 기법

- 가능한 모든 해결 방법을 탐색하는 과정에서 불필요한 경로를 제외시키는 방법
- 문제의 조건에 따라 탐색해야 하는 모든 경우의 수를 시도하면서 해를 찾는 알고리즘

# ☑️ N-queens problem

N x N 체스판에 N개의 퀸을 서로 공격하지 못하게 놓는 방법을 찾는 문제

- recursive DFS(Depth-First Search) 방식으로 체크함
- if nonpromising → backtrack to the node’s parent and try other path

```c
public static void checknode (node v) {
	node u;

	if(promising(v))
		if(there is a solution at v){
			write the solution
		} else {
			for(each child u of v)
				checknode(u);
		}

}
```

<br />

다른 행에 queen을 놓는다고 할 때, 같은 column이나 diagonal에 위치하는지 체크

1. 두 개의 queens이 **SAME column**에 있는지 체크: Col(i)와 Col(k)가 같을 때
2. 두 개의 queens이 **SAME diagonal**에 있는지 체크: column 번호의 차이와 row 번호의 차이가 같을 경우
   - Col(i) - Col(k) = i - k
   - Col(i) - Col(k) = k - i
   - `|Col(i) - Col(k)| = i-k` for i > k

```cpp
// n and Col[1..n] are globally defined
// Top-level call queens(0)

void queens(index i) {
	index j;

	if(promising(i))
		if(i == n) {
			system.out.print(col[1]..col[n])
		}else {
			for (j=1; j<=n; j++) {
				col[i+1] = j;
				queens(i+1);
			}
		}
}
```

```cpp
public static boolean promising (index i) {
	index k = 1;
	boolean switch = true;

	while (k<i && switch) {
		if( (col[i] == col[k]) || abs(col[i] - col[k]) == i-k )
			switch = false;

		k++;
	}

	return switch;
}
```

## Time Complexity

직접 함수를 돌려보지 않으면 분석하기가 어려운 알고리즘이다. (몇 번 promising되는 것인지 돌려보기 전까지 알기 힘듦)

- **Maximum Upper Bound** (그래도 이거보다는 빨리 끝난다)
  - 전체 다 해보는 것
  - 1 + n + n^2 + n^3 + … + n^n
  - = (n^(n+1) - 1)/(n-1)
- **Upper Bound on number of promising nodes**
  - 1 + n + n(n-1) + n(n-1)(n-2) + … + n!
