// FILE: ch11_heap_main.cpp

#include <iostream>
#include <vector>
#include <algorithm>
#include "ch11_heap.h"
using namespace std;

int main() {
    MaxHeap heap;

	// the number of integers
	int n;
    std::cout << "Enter the the number of integers (1-20): ";
    std::cin >> n;
    
    // n integers from the keyboard
    std::vector<int> inputNumbers;

	std::cout << "Enter " << n << " integers: ";
	for (int i = 0; i < n; ++i) {
		int num;
		std:: cin >> num;
		inputNumbers.push_back(num);
	}
	
	// sort n integers in order
	// for assignment requirements (n integers have to be inserted into a heap in order)
	std::sort(inputNumbers.begin(), inputNumbers.end());	

	// insert in-ordered n integers into heap
	for (int i = 0; i < n; ++i) {
		heap.insert(inputNumbers[i]);
	}

	std::cout << std::endl;
    heap.print();

    return 0;
}