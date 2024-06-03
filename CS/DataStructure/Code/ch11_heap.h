// FILE: ch11_heap.h

#ifndef HEAP_H
#define HEAP_H
#include <iostream>

struct MaxHeapNode {
    int data;
    MaxHeapNode* left;
    MaxHeapNode* right;
    MaxHeapNode* parent;

    MaxHeapNode(int num) : data(num), left(NULL), right(NULL), parent(NULL) {}
};

class MaxHeap {
private:
    MaxHeapNode* root_ptr;
    void heapifyUp(MaxHeapNode* node_ptr);

public:
    MaxHeap() : root_ptr(NULL) {}
    void insert(int num);
    void print(MaxHeapNode* root_ptr, int depth = 0);
    void print();
};

#endif