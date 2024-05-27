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

<br />

# B-Trees

각 node가 multiple entries를 가질 수 있는 tree

- B-tree can be formulated to store a set of entries

- alternatively, a B-tree can be formulated to store a bag of entries

## ☑️ B-Tree Rules for a Set

binary search tree에서 1, 2, 3, ... ,10을 추가할 경우 오른쪽 자식만 있게 되는 unbalanced tree 문제로 인해 고안됨

positive integer **`MININUM`**: 몇 개의 entries를 하나의 node에 저장할 수 있는지를 결정함

### Rule 1:

- The root may have as few as one entry (even no entries if no children)

- Every other node has **at least MININUM entries**

### Rule 2:

- node에서 **최대** entries의 수는 MININUM 값의 **두 배**

### Rule 3:

- The entries of each B-tree node are stored in a partially filled array, **sorted** from the smallest entry (at index 0) to the largest entry (at the final used index)

### Rule 4:

- The number of subtrees below a nonleaf node is always **one more than** the number of entries in the node

### Rule 5:

For any nonleaf node:

a) An entry at index i is greater than all the entries in subtree number i of the node

b) An entry at index i is smaller than all the entries in subtree number i+1 of the node

### Rule 6:

Every leaf in a B-tree has the same depth

# The Set (Template) Class using B-Trees

## Private Member Constants/Variables:

```cpp
static const size_t MINIMUM = 200;
static const size_t MAXIMUM = 2 * MINIMUM;
size_t data_count;
Item data[MAXIMUM + 1];
size_t child_count;
set* subset[MAXIMUM + 2];
```

## Functions for set using B-Trees

- constructor / destructor

- count function (searching for an item in a B-tree)

- insert function (inserting an item into a B-tree)

- erase function (deleting an item from a B-tree)

- clear function (deleting all item from a B-tree)

- empty function (checking whether the set is empty)

- = (assignment operator)

### ☑️ Count function

returns 0 if the target is not found, or 1 if found

1. In the root, find the first index `i` such that `data[i]` >= `target`

   - if no such `i` found, `i = data_count;`

2. If (target is found at `data[i]`) → return 1

3. else if (the root has no children) → return 0

4. else return `subset[i]->count(target)`

### ☑️ Insert function

will use two private functions: `loose_insert` and `fix_excess`

```cpp
if(!loose_insert(entry)) {
  return false // since entry wasn't added
}

if(data_count > MAXIMUM) {
  // fix the root of the entire tree

  // 1. Create a new root with no entries and let the old root be the child of the new root
  // 2. Call fix_excess on the old root
}

return true
```

### loose_insert

adds a new entry to the B-tree with the possibility that the root may have MAXIMUM + 1 entries (one extra entry) → entry를 루트로 올리는 함수

1. In the root, find the first index `i` such that `data[i]` >= entry

   - If no such `i` found, `i = data_count;`

2. if (entry is found at `data[i]`) return false

3. else if (the root has no children) → insert the entry to the root at `data[i]` and return true

4. else → **do a recursive call and fix the excess problem**

   4-1. `bool b = subset[i]->loose_insert(entry)`

   4-2. check if the **root of `subset[i]`** now has an excess entry

   4-3. If so, fix the `subset[i]` using the `fix_excess` function

   4-4. return `b`

### fix_excess

makes a subtree(semi-B-tree) whose root node has an extra entry into a regular B-tree → 초과된 루트를 subtree로 배분하는 함수

1. **Split** the node with MAXIMUM + 1 entries into **two nodes** each of which contains MINIMUM entries

2. The entry in the middle is moved upward to the parent
