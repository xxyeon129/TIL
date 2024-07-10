# Greedy Algorithm

그 순간에 가장 좋은 것을 보는 것

- Once each choice has been made and added to parial solution → it will always be in the solution set
- 순간에 베스트인 것을 **locally optimal**이라고 함
- 전체를 다 봤을 때 베스트라면 **globally optimal**
  - globally optimal을 찾는게 우리의 목적
  - locally optimal이었지만 결국은 globally optimal이도록 해야 하지만, 보장할 수 없다

## Example: Giving change for a Purchase

가장 적은 수의 동전이나 지폐를 사용해 계산

```c
while (there are more bills/coins and the instance is not solved) { // 인스턴스가 풀리지 않았다 → 전체 액수를 만들지 못했다
	grab the largest remaining bill; // 가장 큰 지폐를 넣음

	if(adding the bill/coin makes the change exceed the amount owed) {
		reject the bill/coin;
	}else {
		add the bill/coin to the change;
	}

	if(the total value of the change equals the amount owed) {
		the instance is solved;
	}
}
```

## General Greedy Approach

선택을 연속해서 해야하는 경우 사용

set이 비어있는 상태에서 시작해서 item을 하나씩 추가 (문제 조건을 만족할 때까지)

- 하나하나 문제조건을 만족할 때까지 선택을 계속함
- each iteration consists of the following components:
  1. Selection Procedure
     - greedy criteria(베스트인 것)에 따라 다음 추가할 아이템을 선택함
  2. Feasibility Check
     - Feasibility: 조건을 만족했는지 - 정확히 액수가 되도록 하되 액수가 넘치면 안됨
  3. Solution Check
     - 문제가 다 풀렸는지

<br />

# Minimum Spanning Trees

greedy algorithm이 global optimal인지 알 수 없음 → 일반적으로는 보장하지 않는 알고리즘

하지만 이건 global optimal을 구하는 greedy algorithm 방법

- **Undirected Graph**
  - 방향이 없는 그래프 (edges(노드를 연결하는 선)의 방향성이 없을 때)
- **Connected Graph**
  - 모든 vertices 사이에 path가 있는 undirected graph
- **Acyclic Graph**
  - cycles가 없는 그래프
  - 노드들끼리 사이클을 이루면 안된다 (조직도 - 말단 부하가 가장 위에 있는 노드랑 연결된 건 그래프인 것, 트리는 아님)
- **Tree**
  - acyclic, connected, undirected 3가지를 다 만족하는 그래프
- **Spanning Tree** for undirected graph
  - 그래프 G의 모든 vertices를 포함하면서(edge는 일부분만 포함) tree인 connected subgraph
  - edges 개수 = 전체 vertices 개수 - 1개 (노드가 추가될 때마다 edge가 하나 늘어남)
- **Minimum Spanning Tree** for undirected graph
  - a spanning tree of G with minimum weight
  - edge들의 합이 제일 작은 Spanning Tre
    - cycle이 생기지 않도록 하면서 + 그래프 G 전체 edges 중에서 가장 짧은 (전체 vertices 개수 - 1)개의 edges들만 선택 (edges의 합이 최소가 되도록)
    - 제일 짧은 edge부터 포함시킴 (greedy)

## Minimum Spanning Trees > Prim’s Algorithm

```
F = ∅; // Minimum Spanning Tree의 edges 집합
Y = {v1}

while(the instance is not solved) {
	// V에서 Y를 뺀 것 중에서(Y에는 이미 선택해서 들어있는 vertex가 있으므로) (선택하지 않은) vertex 선택
	select a vertex in V-Y that is nearest to Y;

	add the vertex to Y;
	add the edge to F;

	if(Y==V)
		the instance is solved;
}
```

- `W[i][j]`: weight table (symmetric)
- `nearest[i]`: Vi와 가장 가까운 (Y에 있는) vertex의 index
  - initialized to 1
- `distance[i]`: Vi와 `nearest[i]`인 vertex 사이의 edge weight
  - initialized to W[1][i]
- Y에 vertices 추가될 때마다 두 개의 arrays가 업데이트됨(nearest, distance)

```c
set_of_edges prim (int n, const number W[][]) {
	index i;
	index vnear; // i로부터 가장 가까운 노드 번호를 저장

	index [] nearest = new index[2..n];
	index [] distance = new number[2..n];

	number min; // 가장 작은 거리를 저장 (vnear의 거리)
	edge e;
	set_of_edges F = ∅; /// 리턴해야 할 edges 집합

	// 초기화
	for(i=2; i<=n; i++) {
		nearest[i] = 1;
		distance[i] = W[1][i];
	}

	// 한 번 수행할 때마다 vertex 한 개, edge 한 개가 추가됨
	repeat(n-1 times) {
		min = ∞;

		// minimum값보다 더 작은 거리값을 찾음
		for(i=2; i<=n; i++) {
			if(0 <= distance[i] < min) {
				min = distance[i];
				vnear = i; // Y에서 가장 가까운 vertex의 index
			}

			e = edge connecting vertices indexed by vnear and nearest[vnear];
			add e to F;

			// Y에 선택되지 않은 것들만 넣기 위해
			// 선택된 애들은 distance를 -1로 바꿔줌 (-1값을 가진 애들은 신경쓰지 않도록)
			// vnear vertex를 Y에 넣은 것과 똑같이 됨
			distance[vnear] = -1;

			// vnear가 Y의 새 멤버로 들어옴 -> 기존보다 더 가까워질 수 있게 업데이트
			for(i=2; i<=n; i++) {
				if(W[i][vnear] < distance[i])
					distance[i] = W[i][vnear];
					nearest[i] = vnear;
			}
		} // for문 종료
	} // repeat 종료

	return F;
}
```

### Time Complexity of Prim’s Algorithm

- **Basic Operation:** if-statement inside two for-i loops
- **Input Size:** n (the number of vertices)

**T(n) =** **(n-1)(2(n-1)) ∈ θ(n^2)**

**2(n-1)^2**

### Does Prim’s Algorithm always produce an optimal solution?

항상 optimal solution을 produce하는지 하지 않는지 증명하기 어렵다

→ greedy algorithm에서는 formal proof가 같이 따라오는 경우가 많다

### Optimality of Prim’s Algorithm

**optimal**이 될 가능성이 있는 상태(minumum spanning tree가 될 가능성이 있는 상태) → **promising set of edges**

### Proof of the Optimality of Prim’s Algorithm

- **Induction(수학적 귀납법) Basis**
  - empty set(초기 상태)는 promising
- **Induction Hypothesis**
  - F 집합이 repeat loop 안에서 promising한 상태라고 가정
- **Induction Step**
  - Y에 있는 vertex와 V-Y에 있는 vertex를 연결하는 최소 weight인 edge가 F 집합에 속하는 걸 보여줘야 함
  - F가 promising하므로, F ⊆ F' 및 V와 F’이 minimum spanning tree가 되도록 edges 집합 F’가 있어야 함
    - **Case 1: e ∈ F’**
      - F ∪{e} ⊆ F′
      - F ∪{e} is promising
    - **Case 2: e ∉ F′**
      - V와 F’이 spanning tree기 때문에 → F’에다 e를 넣으면 cycle이 됨
      - 따라서 Y의 edge와 V-Y 사이 edge를 연결하는 또다른 edge e’ ∈ F′가 있을거임
      - spanning tree에 e’이 들어있었다면, e’을 빼고, 가장 짧다는게 보장된 e를 넣어보자 그럼 cycle도 없어지고 minimum spanning tree가 됨 (in fact they must be equal)
      - F′ ∪{e} – {e′} is a minimum spanning tree
        - F ∪{e} ⊆ F′ ∪{e} – {e′}
        - F ∪{e} is promising

## Minimum Spanning Trees > Kruskal’s Algorithm

```
1. F = ∅;

2. create disjoint subsets of V, // cycle 생기는 걸 방지하기 위해
    one for each vertex and containing only that vertex; // 자기 자신 vertex만을 포함하는 subset
    // 같은 subset 안에 있는 것은 cycle이 됨

3. sort the edges in E in non-decreasing order;

4. while(the instance is not solved) {
		select next edge from the sorted list

		if(the edge connects two vertices in disjoint subsets) { // 서로 다른 subset에 속해 있을 경우
			merge the subsets;
			add the edge to F;
		}

		if(all the subsets are merged) // 모든 vertex가 하나의 subset으로 병합됐는지 확인
			the instance is solved;
	}
```

- **initial(n):** initializes n disjoint subsets, each of which contains exactly one of the indices between 1 and n
- **p = find(i)**: make p pointer(array라면 index) to the set containing index i
- **merge(p,q):** merges the two sets, to which p and q point, into a set
- **equal(p,q):** returns true if both p and q point to the same set

```c
// n: the number of vertices
// m: the number of edges

set_of_edges kruskal(int n, int m, set_of_edges E) {
	index i, j;
	set_pointer p,q ;
	edge e;
	set_of_edges F = Ø ;

	Sort the m edges in E by weight in nondecreasing order;

	initial(n); // disjoint subsets을 만들어 놓음

	while(|F| <  n-1) { // 꼭 n-1번 수행되는 건 아님 (worst case의 경우 계속 cycle이 생겨서 매번 끝까지 갈 수 있음)
		e = edge with the least weight not yet considered; // 가장 가벼운 edge 선택
		i,j = indices of vertices connected by e; // e가 연결하는 두 vertex의 인덱스

		// e를 연결하는 두 vertex가 속한 집합을 각각 찾음
		p = find(i);
		q = find(j);

		if (!Equal(p,q)) { // 서로 다른 집합에 속해있는지 확인
			merge(p,q);
			add e to F;
		}
	}

	return F;
}
```

### Time Complexity of Kruskal’s Algorithm

i와 j를 찾을 때 comparison 연산이 일어나게 됨

1. **Time to sort the edges:**
   - W(m) ∈ **θ(m lg m)** using MergeSort
2. **Time to the while loop:**
   - W(m) ∈ **θ(m lg m)** using DisjointSet implementation
   - 다 cycle되어서 m번 돌 수 있음
3. **Time to initialize n disjoint sets**
   - T(n) ∈ **θ(n)**

→ **W(m,n) ∈** **θ(m lg m)** where n-1 ≤ m ≤ n(n-1)/2

→ in the worst case W(m,n) ∈ **θ(m lg m) = θ(n^2 lg n^2) = θ(n^2 lg n)**

## Minimum Spanning Trees > Prim’s Algorithm vs. Kruskal’s Algorithm

- Prim’s Algorithm: **T(n) ∈ θ(n^2)**
- Kruskal’s Algorithm: **W(m,n) ∈** **θ(m lg m)** where n-1 ≤ m ≤ n(n-1)/2
- If m is close to n-1 (**graph is sparse**; edge가 별로 없음. 그래프 연결이 별로 없음)
  - θ(m lg m) becomes θ(n lg n)
  - Kruskal이 더 빠름
- If m is close to n(n-1)/2 (**graph is dense**; edge가 많음. 그래프가 서로 다 연결될수록)
  - θ(m lg m) becomes θ(n^2 lg n)
  - Prim이 더 빠름

<br />

# Huffman Code

데이터 압축을 할 때 사용할 수 있는 encoding 방식

- **Variable Length Binary Code**
  - 서로 **다른** 개수의 bits로 서로 다른 characters를 표현
  - 압축 용량을 줄이기 용이
  - 인코딩할 때 조건이 없으면 다른 character로 오인 가능 → 문제 방지 위해 Prefix Code여야 한다
- **Fixed Length Binary Code**
  - 정해진 **똑같은** 개수의 bits로 서로 다른 characters를 표현

## Prefix Code

어떤 하나의 character를 나타내는 codeword가 다른 character를 나타내는 codeword의 앞부분(시작 부분)과 똑같지 않아야 함

## The number of bits to encode a text file

압축해야 하는 text file(문자들로 이루어짐)이 있다고 할 때, 그 파일의 코드 길이를 가장 짧게 할 수 있는 할당 방식을 찾는 방법

→ 많이 등장하는 문자는 짧은 비트를 할당하고, 적게 등장하는 문자는 긴 비트 할당

**전체 bits 개수 = ∑ frequency(v) \* depth(v)**

이걸 Minimize한 코드 방식을 Huffman Code 방식이라고 한다.

Minimize ∑frequency(v) \* depth(v)

- length of code(문자의 길이) == depth

## Huffman’s Algorithm

frequency가 작은 노드를 아래에 밀어넣기 위해 먼저 처리

```
Regard characters as a forest with n single-node trees
**repeat**
	merge two trees with least frequencies
**until** it becomes a single tree
```

```c
class nodetype {
	char symbol;
	int frequency;

	nodetype left;
	nodetype right;
}
```

```c
for(i= 1; i< n; i++) {
	// PQ를 사용해 두 개의 최소 빈도 노드를 제거
	remove(PQ, p); // PQ: min priority queue -> 빈도가 작은 노드 먼저 제거
	remove(PQ, q);

	// 두 최소 빈도 노드를 합쳐서 새로운 노드 생성
	r = new nodetype();
	r.left= p;
	r.right= q;
	r.frequency = p.frequency + q.frequency;

	// PQ에 삽입
	insert(PQ, r) // 최소 빈도 노드가 맨 앞에 오는 PQ
}

remove(PQ, r);

// 최종적으로 루트 노드를 반환
return r;
```

Time complexity: **θ(n lg n)**

- n-1번 반복, 작은 수 뽑는데 걸리는 시간 θ(lg n)

### Proof of the Optimality of Huffman’s Algorithm

- **Induction Basis**
  - The set of single nodes in the 0th step
- **Induction Hypothesis**
  - The set of trees in the ith step
- **Induction Step**
  - u & v: roots of trees combined in the (i+1)th step
  ***
  - v, w 위치를 바꾸어 트리 비용을 계산
  - frequency(w) ≥ frequency(v))
  - u가 w의 짝이기 때문에 depth(w) ≥ depth(v)
  - 새로운 트리 T’(v & w)를 만들어 cost를 비교
    - cost(T) - (depth(w) _ frequency(w) - depth(v) _ frequency(v)) + (depth(w) _ frequency(v) + depth(v) _ frequency(w))
    - = cost(T) + (depth(w) - depth(v)) \* (frequency(v) - frequncy(w))
  - cost(T’) ≤ cost(T)라면 → T’는 optimal임

<br />

# Knapsack Problem

## A Greedy Approach to the 0-1 Knapsack Problem

Given n items, let

- S = { item1 ,item2, … , itemn}
- w[i] = weight of item[i]
- p[i] = profit of item[i]
- W = maximum weight the knapsack can hold, where wi, pi, and W are positive integers.

Determine a subset A of S such that

∑ pi is maximized subject to ∑ wi ≤ W

### Brute-Force Solution to the 0-1 Knapsack Problem

1. Consider all possible subsets of S.
2. Discard those subsets whose total weight > W.
3. Of those remaining, take one with the max total profit

→ **2^n** subsets containing up to n items

전부 다해보는 게 2^n

### A Simple Greedy Approach

profit이 큰 순대로 items를 넣음

→ 가장 profitable한 item이 large weight를 갖고 있다면 효율적이지 못함

### Another Simple Greedy Approach

weight가 작은 순대로 items를 넣음

→ 가장 가벼운 item이 small profit을 가지고 있다면 효율적이지 못함

### More Sophisticated Greedy Approach

무게당 이득이 큰 순서대로 넣음(according to profit per unit weight)

→ Optimal Solution을 구할 수는 없다

→ fraction of item이 가능하다면, Optimal Solution이 될 수 있다

### Dynamic Programming Approach to the 0-1 Knapsack Problem

2차원 배열을 사용

무게를 넘지 않는 조건 하에 처음 i개 아이템에서만 선택하면서 얻을 수 있는 최대 가치 optimal solution(`P[i][w]`)

`P[i][w]` =

- `maximum(P[i-1][w], pi + P[i-1][w-wi])`, if wi ≤ w (i 아이템을 배낭에 포함하는 경우)
- `P[i-1][w]`, if wi > w (i 아이템이 배낭 현재 용량 w보다 커서 → i 아이템을 배낭에 포함하지 않는 경우)
- 물건이 없는 경우 P[0][w]
- 배낭 용량이 0인 경우 P[i][0]

최악의 경우 → θ(2^n)

Knapsack Problem의 경우 최적화된 좋은 알고리즘이 알려지지 않음
