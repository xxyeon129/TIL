# pseudo-code of a balanced three-way mergesort

```
void mergeSort (int n, keytype[] S)
{
	if (n > 1) {
		int h = floor(n/3);
		int m = floor(2*n/3);

		keytype[] U = new keytype[1...h],
							V = new keytype[1...m-h],
							W = new keytype[1...n-m];

		// divide
		copy S[1:h] to U[1:h];
		copy S[h+1:m] to V[1:m-h];
		copy S[m+1:n] to W[1:n-m];

		// conquer
		mergeSort(h, U);
		mergeSort(m-h, V);
		mergeSort(n-m, W);

		// combine
		merge(h, m-h, n-m, U, V, W, S);
	}
}

void merge(int h, int m, int w, keytype[] U, keytype[] V, keytype[] W, keytype[] S)
{
	index i=1, j=1, k=1, l=1;

	while ((i <= h) && (j <= m) && (k <= w)) {
		if ((U[i] <= V[j]) && (U[i] <= W[k])) {
			S[l] = U[i];
			i++;
		} else if ((V[j] <= U[i]) && (V[j] <= W[k])) {
			S[l] = V[j];
			j++;
		} else {
			S[l] = W[k];
			k++;
		}
		l++;
	}

	while ((i <= h) && (j <= m)) {
		if (U[i] <= V[j]) {
			S[l] = U[i];
			i++;
		} else {
			S[l] = V[j];
			j++;
		}
		l++;
	}

	while ((i <= h) && (k <= w)) {
		if(U[i] <= W[k]){
			S[l] = U[i];
			i++;
		} else {
			S[l] = W[k];
			k++;
		}
		l++;
	}

	while ((j <= m) && (k <= w)){
		if(V[j] <= W[k]) {
			S[l] = V[j];
			j++;
		} else {
			S[l] = W[k];
			k++;
		}
		l++;
	}


	// Merge the remaining array
	while (i <= h) {
		S[l] = U[i];
		i++; l++;
	}

	while (j <= m) {
		S[l] = V[j];
		j++; l++;
	}

	while (k <= w) {
		S[l] = W[k];
		k++; l++;
	}
}
```

<br />

# compute its worst-case time complexity

1. T(1)= O(1), T(n) = 3T(n/3) + O(n)
2. Assuming n = 3^k, simplify the recurrence

   → S(0) = O(1), S(k) = 3S(k-1)+O(3^k)

3. solve the recurrence

S(k) = 3S(k-1) + O(3^k)

= 3( 3(S(k-2) + O(3^(k-1)) ) + O(3^k)

= 3^2 \* S(k-2) + O(3^k) + O(3^k)

= 3^2 \* S(k-2) + 2O(3^k)

= 3^k \* S(k-k) + kO(3^k)

= 3^k \* O(1) + kO(3^k)

= O(k3^k)

= O(n log 3n)

So, Three-way MergeSort Worst-case Time complexity is O(n log n).
