# Binomial Coefficient 이항계수

주어진 집합에서 원하는 개수만큼 순서없이 뽑는 조합의 개수

이항→ 한 개의 아이템에 대해 뽑거나 뽑지 않거나 두 가지 선택

```c
// Input: n, k - nonnegative integers
// Output: C(n,k)

int bin (int n, int k)
{
	if (k == 0 || n == k)
		return 1;
	else
		return bin(n-1, k-1) + bin(n-1,k);
}
```

```cpp
int bin2 (int n, int k)
{
	index i, j;
	int [][] B = new int [0..n][0..k];

	for (i=0; i<=n; i++)

		for(j=0; j<=min(i,k); j++)
			if(j==0 || j==i)
				B[i][j] = 1;
			else
				B[i][j] = B[i-1][j-1] + B[i-1][j];

	return B[n][k];
}

// k = 3
// i = 1 j = 0, 1
// i = 2 j = 0, 1, 2
// i = 3 j = 0, 1, 2
```

## Binomial Coefficient Time Complexity

<br />

# Floyd’s Algorithm for Shortest Paths

## Every-Case Complexity: n^3

```c
void floyd (int n, const nuumber W[][], const number D[][])
{
	index i,j,k;

	D=W;
	for (k=1; k<=n; k++)
		for(i=1; i<=n; i++)
			for(j=1; j<=n; j++)
				D[i][j] = min(D[i][j], D[i][k]+D[k][j]);
}
```

## Producing the Shortest Paths

```c
void floydPath (int n, const number W[][], number D[][], number P[][])
{
	index i,j,k;

	for(i=1; i<=n; i++)
		for(j=1; j<=n; j++)
			P[i][j] = 0;

	D = W;
	for (k=1; k<=n; k++)
		for(i=1; i<=n; i++)
			for(j=1; j<=n; j++)
				if(D[i][k]+D[k][j] < D[i][j]){
					D[i][j] = D[i][k]+D[k][j];
					P[i][j] = k;
				}
}
```

## Printing the Shortest Paths

```c
void path(index q, r)
{
	if (P[q][r] != 0){
		path(q, P[q][r]);
		cout << "v" << P[q][r];
		path(P[q][r], r);
	}
}
```

<br />

# Dynamic Programming and Optimization Problem

must contains optimal solutions to all subinstances

항상 원칙이 성립하는 건 아니다

<br />

# Optimal Binary Search Trees

```c
void search (node_pointer tree, keytype keyin, node_pointer& p)
{
	bool found = false;
	p = tree;

	while(!found)
		if(p->key == keyin)
			found = true;
		else if(keyin < p->key)
			p = p->left;
		else
			p = p->right;
}
```

깊이가 n-1이 되는 이분검색트리의 개수는 2^(n-1)

# Traveling SalesPerson Problem
