# Heap

**complete binary tree** + 한 노드의 데이터가 해당 노드의 모든 자식들의 데이터보다 작지 않음(크거나 같다)

- Root Node가 최댓값
- 최댓값을 빠르게 알기 위한 자료구조

## ☑️ Priority Queue with Heaps

A heap can be used to implement a priority queue

- Adding new entry to a heap
- Removing an entry from a heap

### Adding a new entry to a heap

1. 새로운 node를 available spot에 놓음

2. 새 node가 적절한 위치에 있게 될 때까지 부모랑 위치를 바꿈

→ 이 과정을 **reheapification upward** 라고 함

### Removing an entry from a heap

1. 마지막 node를 root에 놓음 (top entry를 지울 경우)

2. root에 온 마지막 노드가 적절한 위치에 있게 될 때까지 더 큰 수의 자식과 위치를 바꿈

→ 이 과정을 **reheapification downward** 라고 함

## ☑️ Implementing a Heap

partially-filled array에 root node를 먼저 넣은 후, row를 넣음

- The links between the tree's nodes are NOT actually stored as pointers, or in any other way

- The only way we know that "the array is tree" is from the way we manipulate the data

- node의 index를 알면 해당 노드의 자식과 부모를 알아낼 수 있다
