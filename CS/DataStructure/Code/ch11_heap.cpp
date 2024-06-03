// FILE: ch11_heap.cpp

#include "ch11_heap.h"
#include <queue>
#include <iomanip>

void MaxHeap::heapifyUp(MaxHeapNode* node_ptr) {
    if (node_ptr == NULL || node_ptr->parent == NULL) return;

    if (node_ptr->data > node_ptr->parent->data) {
        std::swap(node_ptr->data, node_ptr->parent->data);
        heapifyUp(node_ptr->parent);
    }
}

void MaxHeap::insert(int num) {
    MaxHeapNode* newNode = new MaxHeapNode(num);
    
    if (root_ptr == NULL) {
        root_ptr = newNode;
    } else {
        std::queue<MaxHeapNode*> q;
        q.push(root_ptr);

        while (!q.empty()) {
            MaxHeapNode* current = q.front();
            q.pop();

            if (current->left == NULL) {
                current->left = newNode;
                newNode->parent = current;
                break;
            } else {
                q.push(current->left);
            }

            if (current->right == NULL) {
                current->right = newNode;
                newNode->parent = current;
                break;
            } else {
                q.push(current->right);
            }
        }
        heapifyUp(newNode);
    }
}

void MaxHeap::print(MaxHeapNode* root_ptr, int depth) {
	if(root_ptr != NULL) {
		print(root_ptr->right, depth + 1);
    	std::cout << std::setw(2 * depth) << "" << root_ptr->data << std::endl;
    	print(root_ptr->left, depth + 1);	
	}
}

void MaxHeap::print() {
    print(root_ptr);
}
