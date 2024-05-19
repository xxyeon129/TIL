<div style="background-color: gray">

# Part 1

</div>

# Introduction

- nodes로 이루어져 있고, node들은 비어 있을 수 있음(아무 노드도 가지고 있지 않은 트리도 있을 수 있다)

- `Parent`, `Child(ren)`, `Siblings`, `Root(of a tree)`

- `Leaf`: child가 없는 node

- `Ancestor`, `Descendant` (of a node)

- `Subtree` (of a tree)

- `Depth of a node`: The number of steps from a node to the root

- `Depth of a tree`: 가장 깊은 곳에 있는 node의 depth

<br />

# Binary Trees

자식이 둘 이하인 트리 - 하나는 left, 하나는 right child

- `Full Binary Trees`

  - Every leaf has same depth
  - Every nonleaf node has two children

- `Complete Binary Trees`: Every depth except the deepest must contain as many nodes as possible (가장 깊은 곳을 제외하고 Full Binary Tree)
  - At depth k (< the deepest level) → **must be 2^k nodes**
  - At the deepest level → all the nodes are as far left as possible

# Array Representation for Complete Binary Trees

- `Root data` stored at [0]
- `Left child` stored at [2i+1]
- `Right child` stored at [2i+2]

# Binary Tree Node Class - member variables

```cpp
template<class Item>
class binary_tree_node {
  ...
  private:
    Item data_field; // for storing data
    binary_tree_node* left_field; // pointer to left child
    binary_tree_node* right_field; // pointer to right child
}
```

# Binary Tree Node Class - member functions

- constructor
- data() / const data()
- left() / const left()
- right() / const right()
- set_data(data)
- set_left(node)
- set_right(node)
- is_leaf()

## ☑️ Constructor

```cpp
binary_tree_node (const Item& init_data = Item(), binary_tree_node* init_left = NULL, binary_tree_node* init_right = NULL) {
  data_field = init_data;
  left_field = init_left;
  right_field = init_right;
}
```

## ☑️ Data

```cpp
// data
Item& data() {
  return data_field;
}

// const data
const Item& data() const {
  return data_field;
}
```

## ☑️ Left/Right

```cpp
// left
binary_tree_node*& left() {
  return left_field;
}

// const left
const binary_tree_node*& left() const {
  return left_field;
}

// right의 경우도 동일한 형식
```

## ☑️ Set data

```cpp
void set_data(const item& new_data) {data_field = new_data;}

void set_left(binary_tree_node* new_left) {left_field = new_left;}

void set_right(binary_tree_node* new_right) {right_field = new_right;}
```

## ☑️ Is leaf

```cpp
bool is_leaf() const {
  return (left_field == NULL && right_field == NULL);
}
```

<br />

## Tree Functions

- tree_clear(...)
- tree_copy(...)

### ☑️ Tree Clear

루트만 지울 경우 자식들이 메모리에 남아있기 때문에 모두 지워줘야 함

```cpp
template <class Item>
void tree_clear(binary_tree_node<Item>*& root_ptr) {
  if (root_ptr != NULL)
  {
    tree_clear(root_ptr->left());
    tree_clear(root_ptr->right());
    delete root_ptr;
    root_ptr = NULL;
  }
}
```

### ☑️ Tree Copy

```cpp
binary_tree_node<Item>* tree_copy(binary_tree_node<Item>* root_ptr) {
  binary_tree_node<Item> *l_ptr;
  binary_tree_node<Item> *r_ptr;

  if(root_ptr == NULL)
    return NULL;
  else {
    l_ptr = tree_copy(root_ptr->left());
    r_ptr = tree_copy(root_ptr->right());

    return new binary_tree_node<Item>(root_ptr->data(), l_ptr, r_ptr);
  }
}
```

<br />

# Tree Traversals

**Process all nodes in a tree applying some operation to each node** (모든 노드들을 하나씩 방문하면서 작업을 처리)

Ex: printing or updating all data values in a tree

- 3 common ways of traversal
  - `pre-order`: 루트 노드를 먼저 처리
  - `in-order`: 루트 노드를 중간에 처리
  - `post-order`: 루트 노드를 나중에 처리

## ☑️ Pre-Order Traversal

1. Process the **root** first

2. Process the nodes in the **left subtree** with a recursive call

3. Process the nodes in the **right subtree** with a recursive call

```cpp
template <class Item>
void preorder_print (const binary_tree_node<Item>* root_ptr) {
  if(root_ptr != NULL) {
    cout << root_ptr->data() << endl;
    preorder_print(root_ptr->left());
    preorder_print(root_ptr->right());
  }
}
```

<br />

## ☑️ In-Order Traversal

1. Process the nodes in the **left subtree** with a recursive call

2. Process the **root** next

3. Process the nodes in the **right subtree** with a recursive call

```cpp
template <class Item>
void inorder_print (const binary_tree_node<Item>* root_ptr) {
  if(root_ptr != NULL) {
    inorder_print(root_ptr->left());
    cout << root_ptr->data() << endl;
    inorder_print(root_ptr->right());
  }
}
```

<br />

## ☑️ Post-Order Traversal

1. Process the nodes in the **left subtree** with a recursive call

2. Process the nodes in the **right subtree** with a recursive call

3. Process the **root** finally

```cpp
template <class Item>
void postorder_print (const binary_tree_node<Item>* root_ptr) {
  if(root_ptr != NULL) {
    postorder_print(root_ptr->left());
    postorder_print(root_ptr->right());
    cout << root_ptr->data() << endl;
  }
}
```

<br />

## ☑️ Backward In-Order Traversal

1. Process the nodes in the **right subtree** with a recursive call

2. Process the **root** next

3. Process the nodes in the **left subtree** with a recursive call

→ Useful for quickly printing the nodes in a tree-like form (공백을 조절해서 출력하면 트리를 왼쪽 방향으로 90도 회전한 모양으로 트리 모양 시각화해서 출력 가능)

```cpp
#include <iomanip> // setw()로 스페이스를 찍기 위해 필요

template <class Item, class SizeType>
void print (const binary_tree_node<Item>* root_ptr, SizeType depth) {
  if(root_ptr != NULL) {
    print(root_ptr->right(), depth + 1);
    cout << setw(4 * depth) << "" << root_ptr->data() << endl;
    print(root_ptr->left(), depth + 1);
  }
}

print(root_ptr, 0);
```

<br />

## A Problem with Our Traversals

출력하는 것 말고도 각 노드의 값을 증가시키든지 곱하든지 여러 작업을 하고 싶을 수 있음. 그럴 때마다 출력하는 pre-order, 더하는 in-order... 각 함수를 따로따로 만들어야 하는 번거로움이 있다. 코드 재사용을 할 수 없을까?

→ Use a **function parameter**

> [!CAUTION]
> Some compilers don't support the use of a template function with a parameter that is a function itself.

```cpp
template <class Process, class BTNode>
void preorder(Process f, BTNode* node_ptr) {
  if(node_ptr != NULL) {
    f(node_ptr->data());
    preorder(f, node_ptr->left());
    preorder(f, node_ptr->right());
  }
}

```
