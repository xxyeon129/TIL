#include <stdio.h>
#include <stdlib.h>

typedef int bool;
#define false 0
#define true 1

int n;                  // Number of items
int W;                  // Maximum weight
int *w;                 // Weights of items
int *p;                 // Profits of items
int *include;           // Inclusion array for items
int *bestSet;           // Best set found so far
int maxProfit = 0;      // Maximum profit found so far

void knapsack(int i, int profit, int weight);
int promising(int i, int profit, int weight);

int main() {
    FILE *file = fopen("instance.txt", "r");
    if (!file) {
        printf("TEXT FILE ERROR");
        return 1;
    }

	// read the number of items, maximum weight
    fscanf(file, "%d %d", &n, &W);

	// allocate memory
    w = (int *)malloc(n * sizeof(int));
    p = (int *)malloc(n * sizeof(int));
    include = (int *)malloc(n * sizeof(int));
    bestSet = (int *)malloc(n * sizeof(int));

	// read weights, profits of the items from the file
	// store in the array
    for (int i = 0; i < n; i++) {
        fscanf(file, "%d", &w[i]);
    }
    for (int i = 0; i < n; i++) {
        fscanf(file, "%d", &p[i]);
    }

    fclose(file);

	// include, bestSet initialize
    for (int i = 0; i < n; i++) {
        include[i] = 0;
        bestSet[i] = 0;
    }

	// call 1-0 knapsack algorithm
    knapsack(-1, 0, 0);

	// print output
    printf("Optimal solution: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", bestSet[i]);
    }
    printf("\nMaximum profit: %d\n", maxProfit);

    return 0;
}

void knapsack(int i, int profit, int weight) {
	// best solution update
    if (weight <= W && profit > maxProfit) {
        maxProfit = profit;
        for (int j = 0; j <= i; j++) {
            bestSet[j] = include[j];
        }
    }
    
    // backtracking recursion
    if (promising(i, profit, weight)) {
        include[i + 1] = 1;
        knapsack(i + 1, profit + p[i + 1], weight + w[i + 1]);
        include[i + 1] = 0;
        knapsack(i + 1, profit, weight);
    }
}

bool promising(int i, int profit, int weight) {
    if (weight >= W) return false;
    
    int j = i + 1;
    float bound = profit;
    int totWeight = weight;
    
    while (j < n && totWeight + w[j] <= W) {
        totWeight += w[j];
        bound += p[j];
        j++;
    }
    
    // upper bound
    if (j < n) {
        bound += (W - totWeight) * (float)p[j] / w[j];
    }
    
    return bound > maxProfit;
}
