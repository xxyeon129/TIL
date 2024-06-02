# Backtracking Technique

해를 찾는 도중 해가 아니어서 막히면, 되돌아가서 다시 해를 찾아가는 기법

- 가능한 모든 해결 방법을 탐색하는 과정에서 불필요한 경로를 제외시키는 방법
- 문제의 조건에 따라 탐색해야 하는 모든 경우의 수를 시도하면서 해를 찾는 알고리즘

<br />

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

### pseudo code

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

### promising function

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

<br />

# ☑️ Graph Coloring

## The m-coloring problem

두 개의 인접한 vertices가 서로 같은 색이면 안 되는 문제

오래 걸리는 문제이기 때문에 backtracking으로 접근해서 조금이나마 시간을 줄여본다.

> [!NOTE]  
> **planar graph** (평면 그래프)
>
> - 두 개의 edge가 **교차하지 않게** 그릴 수 있는 그래프
> - 지도 색칠하는 문제와 같음

### pseudo code

```cpp
// vcolor[] is globally defined
// Top level call: m_coloring(0)

public static void m_coloring(index i) {
	int color;

	if(promising(i))
		if(i == n) // 마지막 노드까지 칠했을 경우 출력
			system.out.print(vcolor[1] ... vcolor[n]);
		else // 다 칠하지 않았을 경우 칠하기
			for(color=1; color<=m; color++) {
				vcolor[i+1] = color;
				m_coloring(i+1);
			}
}
```

### promising function

```cpp
public static boolean promising(index i) {
	index j = 1;
	bool switch = true;

	while(j<i && switch) {
		if(W[i][j] && vcolor[i] == vcolor[j]) // 인접하고 있으면서 && 같은 색인지 체크
			switch = false;
		j++;
	}

	return switch;
}
```

## Time Complexity

n^n, 팩토리얼 수준으로 오래 걸리기 때문에 분석하기 어려운 문제이다.

<br />

# ☑️ The 0-1 Knapsack Problems

1번 물건부터 n번 물건까지 넣을지 말지 한개씩 계속 선택해보다가 promising하지 않으면 제일 마지막에 넣었던 물건을 빼거나 마지막 선택을 무르는 backtracking 방식으로 진행함

## Pseudo code

- **optimization problem:** maximum 값을 가지게 하는 solution을 찾거나, minimum 값을 가지게 하는 solution을 찾음
- knapsack problem에서는 조건을 만족하면서 + **best solution**(이득이 제일 높은 방법)을 골라야 함

```c
public static void checknode(node v) {
	node u;

	if(value(v) is better than best) // 현재까지 나온 솔루션이 best보다 좋으면
		best = value(v); // 그렇다면 그게 optimal solution의 best가 됨

	if(promising(v))
		for(each child u of v)
			checknode(u);
}
```

## State of the knapsack

node에 저장되어 있는 정보.

- **`Current profit`**: 어떤 물건을 넣은 상태에서 이득이 얼마인지
- **`Current weight`**: 총 weight 합이 얼만지
- **`The upper bound on the maximum profit`**
  - upper bound를 구하는 방법:
  - 물건을 쪼갤 수 있다면(allowing fraction of an item in the knapsack)
  - → fractional knapsack problem을 풀어서 얻을 수 있는 maximum profit이 upper bound가 된다.
  - 왜? 물건을 쪼갤 수 있을 경우가 쪼갤 수 없을 때보다 이익을 구하기 더 유리함
  - 실제로 구할 수 있는 profit보다는 높은 값 (최대한 잘해봤자 이정도 profit보다 안좋다)

## Function

**DFS** → 깊이 들어갈 수 있는 곳까지 들어갔다가 한 칸 앞으로.. 식으로 구현됨

```c
// Global Variables: maxProfit, numBest, bestSet, include

public static void knapsack(index i, int profit, int weight) {
	if(weight <= W && profit > maxProfit) { // best solution이 나왔을 경우
		maxProfit = profit;
		numBest = i; // 몇 번까지 기록이 되어 있는지 ex) 3번까지 했을 경우
		bestSet = include;
	}

	if(promising(i)) {
		include[i+1] = "yes"; // 포함시키는지 포함시키지 않는지 (0, 1로 표기해도 됨)
		knapsack(i+1, profit+p[i+1], weight+w[i+1]);
		include[i+1] = "no"; // 넣지 않았을 경우
		knapsack(i+1, profit, weight); // 넣지 않았으니까 그대로
	}
}
```

## Promising function

```c
public static bool promising(index i) {
	index j,k;
	int totWeight;
	float bound;

	if(weight >= W) return false;
	else {
		j = i+1; // 인덱스 번호 다음 물건부터 넣어야 함
		bound = profit;
		totWeight = weight;

		while(j<=n && totWeight + w[j] <= W) { // 마지막 물건을 넘지 않고 && 무게도 초과하지 않을 경우
			totWeight = totWeight + w[j];
			bound = bound + p[j];
			j++;
		}

		k = j;
		if(k <= n) { // 물건이 남았다면 물건을 쪼개서 넣어줌
			bound = bound + (W-totWeight) * p[k] / w[k]; // 최종 바운드 계산
		}

		return bound > maxProfit; // 바운드가 현재 maxProfit보다 크다면 promising함
	}
}
```
