# Quadratic Sorting Algorithms

# ☑️ Selection Sort

n-1부터 1까지(뒤에서부터 시작해서) 제일 큰 값 maximum 고름 → 맨 뒤(`data[i]`)로 보냄

maximum 값을 변수 안에 저장하고 갱신

```c
void selectionSort(int data[], size_t n) {
	size_t i, j, index_of_largest;
	int largest;
	
	if (n==0) return;
	
	for(i=n-1; i>0; --i) {
		// initialize
		largest = data[0];
		index_of_largest = 0;
		
		// find the index of the largest
		for(j=1; j<=i; ++j) {
			if(data[j] > largest) {
				largest = data[j];
				index_of_largest = j;
			}
		}
		
		swap(data[i], data[intex_of_largest]);
	}
}
```

## Selection Sort Analysis

내부 루프 비교 횟수 → **n(n-1)/2**

# ☑️ Insertion Sort

1(두번째 자료)부터 n-1까지 앞에서부터 차례대로 해당 원소의 앞의 자료와 비교해 삽입할 위치를 찾아 삽입

```c
void insertionSort(int data[], size_t n) {
	size_t i, j;
	int next;
	
	if(n==0) return;
	
	for(i=1; i<n; ++i) {
		next = data[i]; // 현재 자료
		j = i; // 현재 자료(next)가 삽입될 위치(인덱스)
		
		// find the insertion index j of next
		while(j > 0 && next < data[j-1]) {
			data[j] = data[j-1]; // data[j-1]이 현재 자료보다 더 크다면 위치를 옮김 (삽입할 빈 공간 만들기 위해)
			--j;
		}
		
		data[j] = next;
	}
}
```

## Insertion Sort Worst-Case Analysis

최악의 경우 내부 루프 비교 횟수: **n(n-1)/2**