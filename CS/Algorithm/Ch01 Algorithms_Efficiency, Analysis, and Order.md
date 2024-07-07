- Problem
- Problem Instance - 매개변수 있음
- Algorithm - each problem instance 해결책 산출 위한 단계별 절

<br />

# Sequential Search Algorithm

```c
// Input: int n(>0), S[1..n], x
// Output: location of x in S, 0 if not found

public static index SeqSearch (int n, keyType[] S, keyType x)
{
	index location = 1;

	while (location <= n && S[location] != x)
		location++;

	if(location > n)
		return 0;

	return location;
}
```

## Sequential Search Time Complexity

- B(n) = 1
- W(n) = n
- Average Case = 배열에 없는 경우도 상정하면 n(1-p/2)+(p/2)

## Linear Time Algorithm

time complexity is linear

<br />

# Binary Search

Input S[] **sorted in none-decreasing order**

```c
// Input: int n(>0), S[1..n], x
// Output: location of x in S, 0 if not found

public static index BinSearch (int n, keyType[] S, keytype x)
{
	index location, low, high, mid;
	location = 0; low = 1; high = n;

	while (low <= high && location == 0) {
		mid = floor((low +high) / 2);

		if(x == S[mid])
			location = mid;
		else if (x < S[mid])
			high = mid - 1;
		else
			low = mid + 1;
	}

	return location;
}

```

<br />

# Recursive Dibonacci Algorithm

```c
// Input: int n(>=0)
// Output: the nth term of Fibonacci Sequence

public static int Fib(int n)
{
	if (n <= 1)
		return n;
	else
		return Fib(n-1) + Fib(n-2)
}
```

`T(n) ≥ 2^n/2`

<br />

# Iterative Fibonacci Algorithm

```c
public static int Fib2(int n)
{
	index i;
	int[] f = new int[n+1];

	f[0] = 0;

	if (n > 0) {
		f[1] = 1;

		for (i=2; i<=n; i++)
			f[i] = f[i-1] + f[i-2];
	}
	****
	return f[n];
}
```

`T(n) = n+1`

<br />

# Algorithm Parameter

- Input Size (배열 크기, 그냥 숫자…)
- Basic Operation - 수행하는 전체 작업은 실행 횟수 Op에 roughly하게 비례한다
- Time Complexity 분석 → basic operation이 얼마나 done 됐냐 각 input 사이즈에 대해

<br />

# Common Complexity Categories

lg n < n < nlg n < n^2 < n^3 < 2^n < n!

<br />

# Order

- Big O: g(n) 제일 큰 차수로 따지는데 일단 커서는 안됨
- Omega: g(n) 제일 큰 차수로 따지는데 일단 작아서는 안됨
- 세타: g(n) 큰 차수로 따짐 + bIg O랑 omega 둘다 충족
- small o: g(n) 무조건 작아야함
