# 1. Binary Search

비내림차순으로 정렬된 배열

1. 배열 정 가운데 원소 - 키 x 비교
2. 같으면 → 원소 찾았으므로 종료
3. x < 가운데 원소 → 왼쪽 배열에서 찾기
   가운데 원소 < x → 오른쪽 배열에서 찾기
4. 해당 반쪽 배열의 정 가운데 원소와 다시 비교 → 1~3 반복

- [Divide] 배열을 정 가운데 원소를 기준으로 반으로 분할
- [Conquer] 선택한 반쪽 배열을 정복 (선택한 반쪽 배열에 x가 있는지 재귀적으로 이분검색함)
- 선택한 반쪽 배열에서 얻은 답이 최종 답이 됨 → 결과를 취합할 필요가 없음

```c
public static index location (index low, index high)
{
	index mid;

	if (low > high) return 0;
	else {
		mid = floor((low+high)/2);

		if(x == S[mid]) return mid;
		else if (x < S[mid])
			return location(low, mid-1);
		else
			return location(mid+1, high);
	}
}
```

## Worst-Case Time Complexity

x가 배열의 어떤 원소보다 큰 경우 `W(n) = W(n/2) + 1` (for n>1)

**`W(n) = lg n + 1`**

<br />

# 2. Merge Sort

1. [Divide] 배열을 반으로 분할 → 분할된 배열의 원소는 각각 n/2개
2. [Conquer] 분할한 배열을 각각 따로 정렬함 (배열에 원소가 2개 이상이라면 → 합병정렬을 재귀호출해서 정렬)
3. [Combine] 정렬한 두 배열을 합병하여 정렬

```c
void mergeSort (int n, keytype S[])
{
	const int h=floor(n/2), m=n-h;
	keytype[] U[1...h], V[1...m];

	copy S[1:h] to U[1:h];
	copy S[h+1:n] to V[1:m];

	mergeSort(h,U);
	mergeSort(m,V);

	merge(h,m,U,V,S);
}
```

```c
void merge (int h, int m, const keytype U[], const keytype V[], keytype S[])
{
	index i=1, j=1, k=1;

	while (i<=h && j<=m) {
		if(U[i] < V[j]) {
			S[k] = U[i];
			i++;
		} else {
			S[k] = V[j];
			j++;
		}
		k++;
	}

	if (i>h)
		copy V[j:m] to S[k:h+m]
	else
		copy U[i:h] to S[k:h+m]
}
```

## Best-Case Time Complexity of Merge

<aside>
💡 단위연산: U[i]와 V[j]의 비교

입력 크기: 두 입력 배열의 원소 개수, h와 m

</aside>

한쪽 배열이 많이 남아있는 경우 비교가 줄어들기 때문에 베스트 케이스.

**`B(h,m) = min(h,m)`**

## Worst-Case Time Complexity of Merge

<aside>
💡 단위연산: U[i]와 V[j]의 비교

입력 크기: 두 입력 배열의 원소 개수, h와 m

</aside>

모든 요소마다 비교하는 케이스

**`W(h,m) = h + m - 1`**

## Worst-Case Time Complexity of MergeSort

<aside>
💡 단위연산: merge에서 일어나는 비교연산

입력 크기: 배열 S의 아이템의 수, n

</aside>

총 비교 횟수는 아래 횟수의 합과 같음

- U 입력 → 재귀 호출 실행 시 비교연산 횟수 `mergeSort(h,U)`
- V 입력 → (위와 동일) `mergeSort(m,V)`
- merge 호출 → 실행되는 비교연산 횟수 `mergeSort(h,m,U,V,S)`

W(n) = U를 정렬하는데 걸리는 시간(W(h)) + V를 정렬하는데 걸리는 시간(W(m)) + 합병하는데 걸리는 시간인데 모든 요소마다 비교하는 케이스 (h+m-1)

`W(n) = W(h) + W(m) + h + m - 1`

`W(n) = 2W(n/2) + n - 1`, n > 1이며 n은 2의 거듭제곱. `W(1) = 0`

`W(n) = n lg n - (n-1)`

→ `세타(n lg n)`

<br />

# 3. Quick Sort

```cpp
void quickSort(index low, index high)
{
	index pivotPoint;

	if(high > low)
	{
		pivotPoint = partition(low,high);
		quickSort(low, pivotPoint-1);
		quickSort(pivotPoint+1, high);
	}
}
```

```cpp
index partition (index low, index high)
{
	index i, j, pivotPoint;
	keytype pivotItem;
	pivotItem = S[low];
	j= low;

	for (i=low+1; i<=high; i++){
		if(S[i] < pivotItem){
			exchange S[i] and S[++j];
		}
	}

	pivotPoint = j;

	exchange S[low] and S[pivotPoint]; // pivotItem 값을 pivotPoint에 저장

	return pivotPoint;
}
```

## Every Case Time Complexity of Partition

**`T(n) = n-1`**

## Worst case Time Complexity of QuickSort

완전히 정렬된 배열을 정렬하는 경우 → 첫번째 원소보다 작은애는 없으니까

Time to partition + sort left subarray + sort right subarray

`T(n) = (n-1) + T(0) + T(n-1)`

<aside>
💡 `T(n-1) + n-1`
= `T(n-2) + n-2 + n-1`
= `T(n-3) + n-3 + n-2 + n-1`
…
= `T(0) + 0 + 1 + 2 + … + n-2 + n-1 = n(n-1)/2`

</aside>

등차수열의 공식 S(n) = n(a1+an)/2

`T(n) = n(n-1)/2`

## Average Case Time Complexity of QuickSort

**`n lg n`**

<br />

# 4. Determining Thresholds(임계값)

Recursion involved in MergeSort or QuickSort

- time to compute `mid`
- time to do `stack operation` for 2 recursive calls
- time to merge 2 subarrays

### A Modified MergeSort using ExchangeSort

subarray size가 threshold t보다 작아질 때 호출

# 5. When Not To Use Divide and Conquer

1. An instance of size n / is divided into two or more instances / of each almost of size n
2. An instance of size n is divided into almost n instances of size n/c, where c is constant
