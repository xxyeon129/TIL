# Branch and Bound

- Similar to Backtracking: state-space tree 사용
- Different from Backtracking:
  - 트리 횡단 방법에 구애받지 않음
  - optimization problem을 푸는 데에만 쓰임

**Step 1:** bound를 계산해서 → node가 promising한지 아닌지 판단

**Step 2:** bound가 기존의 best solution보다 낫지 않다면, 해당 node는 non-promising

<br />

# The 0-1 Knapsack Problem

State of the knapsack

- Current profit
- Current weight
- The upper bound on the maximum profit

## Breadth-First Search with Branch and Bound Pruning

Queue를 이용해서 구현

```c
public class node {
	int level;
	int profit;
	int weight;
}

// n: 아이템 개수
// p: profit 배열
// w: weight 배열
// W: 최대 weight
int knapsack2(int n, int[] p, int[] w, int W) {
	queue_of_node Q;
	node u, v;
	int maxProfit;

	initialize(Q);
	// v가 root가 되도록 초기화
	v.level = 0; v.profit = 0; v.weight = 0; maxProfit = 0;
	enqueue(Q, v); // 초기 노드 v를 queue에 삽입

	while(!empty(Q)) {
		dequeue(Q, v); // Q에서 하나를 빼면 나오는 노드를 -> v에 넣음

		// u를 v의 자식 노드로 설정
		u.level = v.level + 1;

		// take care of the left child
		u.weight = v.weight + w[u.level];
		u.profit = v.profit + p[u.level];
		if (u.weight<=W && u.profit > maxProfit) // left child node의 profit이 maxProfit보다 크다면
	    maxProfit = u.profit; // maxProfit을 left child node로 업데이트
	  if (bound(u) > maxProfit) // promising하다면 queue에 넣음
	    enqueue(Q,u);

		// take care of the right child (다음 아이템 포함하지 않음)
		u.weight = v.weight;
	  u.profit = v.profit;
	  if (bound(u) > maxProfit) // promising하다면 queue에 넣음
	    enqueue(Q,u) ;
	}

	return maxProfit;
}

// 노드 u의 bound값(최대로 얻을 수 있는 이익 상한) 계산
public static float bound(node u) {
	index j,k;
	int totWeight;
	float result;

	if(u.weight >= W) return 0;
	else {
		// initialize
		result = u.profit;
		j = u.level + 1; // j를 u의 자식 노드로 설정
		totWeight = u.weight;

		while(j<=n && totWeight+w[j] <= W) { // 가능한 한 많은 아이템을 취함
			totWeight = totWeight + w[j] ;
			result = result + p[j] ;
		  j++ ;
		}

		k = j;
		if (k <= n) // 용량이 부족해서 못 넣는 k째 아이템의 일부분을 취함
			result = result + (W - totWeight) * p[k] / w[k]

		return result;
	}
}
```

## Best-First Search with Branch and Bound

- bound를 기준으로 확장할 노드를 결정함
- priority queue를 사용 → 노드의 bound value에 따라 결정됨

```c
public class node {
     int level;
     int profit;
     int weight;
     int bound;
}

public static int knapsack3(int n, int[ ] p, int[ ] w, int W) {
	priority_queue_of_node PQ;
	node u, v;
	int maxProfit;

	v.level = 0; v.profit = 0; v.weight=0; maxProfit = 0;
	v.bound = bound(v);
	PQ.enqueue(v); // 초기 노드 v를 queue에 삽입

	while(!PQ.Empty() ){
		v = PQ.dequeue();

    if (v.bound > maxProfit) {
	    u.level = v.level + 1 ;

      // take care of the left child ;
      u.weight = v.weight + w[u.level];
      u.profit = v.profit + p[u.level];
      if(u.weight <= W && u.profit > maxProfit)
	      maxProfit = u.profit;
	    u.bound = bound(u);
	    if(u.bound > maxProfit)
		    PQ.enqueue(u);

      // take care of the right child;
      u.weight = v.weight;
      u.profit = v.profit;
      u.bound = bound(u);
      if(u.bound > maxProfit)
		    PQ.enqueue(u);
    }
	}
}

public static float bound(node u) {
	index j,k;
	int totWeight;
	float result;

	if(u.weight >= W) return 0;
	else {
		// initialize
		result = u.profit;
		j = u.level + 1; // j를 u의 자식 노드로 설정
		totWeight = u.weight;

		while(j<=n && totWeight+w[j] <= W) { // 가능한 한 많은 아이템을 취함
			totWeight = totWeight + w[j] ;
			result = result + p[j] ;
		  j++ ;
		}

		k = j;
		if (k <= n) // 용량이 부족해서 못 넣는 k째 아이템의 일부분을 취함
			result = result + (W - totWeight) * p[k] / w[k]

		return result;
	}
}
```

# Traveling SalesPerson Problem (T.S.P.)

n개의 노드들이 있는 directed graph에서 각 다른 노드를 한 번 방문하고 처음 노드(출발지)로 돌아오는 shortest route를 찾음

## The Branch and Bound Approach to T.S.P.

lower bound를 어떻게 계산할 것인가?

- state space tree의 level k에서 각 노드는 (k+1)개의 vertices을 방문한 상태임
  - → 트리의 level k에서는 현재까지 (k+1)개 도시를 방문한 상태
- **Lower bound on the root node** = Σ (lowest weight of edge leaving vm)
  - vm은 각 도시를 의미
  - vm ∈ V
- **Lower bound on node [1, i2, ... , ik]** ( 1 < k < n )
  - = sum of actual weight from V1 to Vik (V1에서 Vik 노드들로 가는 weight 합)
  - - 선택되지 않은 노드들 weight 합8
      - Σ (lowest weight of edge leaving Vm
        - vm ∈ A
      - excluding those to vertices i2, ..., ik and the edge from Vik to V1)
        - 짧은 경로라도 i2부터 ik로 들어가버리는 경로는 제외함
        - 1로는 돌아가도 됨
      - where A = V - {V1,Vi2, ..,Vik-1}

## The Best-First Search with Branch and Bound

```c
public class node {
	int level;
	ordered_set path;
	number bound;
}

public static number travel2(int n, number[] W, node optimalTour) {
	priority_queue_of_node PQ;
	node u, v;
	number minLength;

	PQ.initialize();

	v.level = 0;
	v.path = [1];
	minLength = ∞;
	v.bound = bound(v);
	PQ.enqueue(v);

	while(!PQ.empty()) {
		v = PQ.dequeue();

		if (v is promising) { // the bound of v < minlength
			// take care of children
			u.level = v.level + 1;

			for (all i such that 2 <= i <= n && i is not in v.path) { // v path에 들어있지 않은 나머지 i값에 대해서
				u.path = v.path;
				put i at the end of u.path;

				if(u.level == n - 2) { // 완전 맨 밑에 도달했을 경우 (다음 vertex에서 여행을 마쳤을 경우)
					put index of only vertex // 마지막 남은 인덱스의 vertex를 path에 붙임
					not in u.path at the end of u.path;
					put 1 at the end of u.path // 첫째 vertex를 마지막 vertex로 둠

					if(length(u) < minlength) { // 함수 length는 여행경로의 길이를 계산
						minlength = length(u);
						optimalTour = u.path;
					}
				} // 여행 마치는지 검사하는 if문 종료
				else {
					u.bound = bound(u);
					if(u.bound < minlength) insert(PQ, u);
				}
			} // for문 종료
		} // v가 promising한지 확인하는 if문 종료
	} // while문 종료
}
```
