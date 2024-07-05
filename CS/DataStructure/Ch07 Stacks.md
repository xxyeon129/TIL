> [!NOTE]
> 앞으로 만드는 자료구조들은 대부분 template로 구현될 것

# Introduction to Stacks and the STL Stack

## Stack

순서가 있는(ordered) 자료구조

`Last-In First-Out(LIFO)`: 접시에 쌓는 것처럼 위(Stack’s top)에서부터 빼거나 insert할 수 있음

- 넣을 때는 Push, 다시 꺼낼 때는 Pop → 순서지정 안됨
- 프로그래밍에서 Stack 구조 이용 → 재귀 함수 등

## STL Stack Class Template

- pop()
- push(const Item& entry)
- empty()
- size()
- top()

## Stack Errors

- stack overflow: full stack에 push 하려고 할 경우 result
- stack underflow: empty stack에서 pop 하려고 할 경우 result

<br />

# Stack Applications

## Balanced Parentheses

stack을 사용해서 → expressions에서 소괄호가 잘 매칭되는지 체크하는 function을 만들 수 있음

→ 컴파일러에서 괄호 검사할 때 Stack을 사용할 수 있다

- 사용 예
  (( X + Y _ (Z + 7)) _ (A + B)) → balanced
  ((X + Y _ (Z + 7) _ (A + B)) → not balanced

1. 표현에서 next character c를 읽음
2. if `(`가 소괄호가 아니라면 → 1로 감 (nothing happended to the stack)
3. else if `(`가 왼쪽 소괄호라면 → stack에 그걸 push함
4. else if `)`가 오른쪽 소괄호라면 → stack에 있는 왼쪽 소괄호를 pop함 (matching top `(` popped)
5. 마지막 expression에 도달할 때까지 같은 과정을 반복

<br />

# Implementations of the Stack Class

## Array Implementation

- 연결 리스트에 비해 속도는 빠르지만, 용량 제한이 있음

### Stack template Class

Two member variables

- data[CAPACITY] array
- used - number of items
  (stack의 사이즈)

```cpp
template <class Item>
class stack
{
	private:
		Item data[CAPACITY];
		size_type used;
	...
}
```

### Constructor

```cpp
template <class Item>
stack<Item>::stack()
{
	used = 0;
}
```

### Push

```cpp
template <class Item>
void stack<Item>::push(const Item& entry)
{
	assert(size() < CAPACITY);

	data[used] = entry;
	++used;
}
```

### Pop

```cpp
template <class Item>
void stack<Item>::pop()
{
	assert(!empty());

	--used;
}
```

### Top

```cpp
template <class Item>
Item stack<Item>::top() const
{
	assert(!empty());

	return data[used-1];
}
```

### Empty

```cpp
template <class Item>
bool stack<Item>::empty() const
{
	return used == 0;
}
```

### Size

```cpp
template <class Item>
size_type stack<Item>::size() const
{
	return used;
}
```

## Linked List Implementation

- 연결 리스트를 사용하면 → stack의 용량이 늘어나거나 줄어들 수 있음 (자유자재로 조절 가능한 이점)
- head에 있는 list가 stack의 top일 수 있음
- entries가 list의 **head**에 insert(pushed)/removed(popped) 됨

### Class Definition

```cpp
template <class Item>
class stack
{
	private:
		node<Item> *top_ptr;
	...
}
```

### Copy Constructor

```cpp
template <class Item>
stack<Item>::stack(const stack<Item>& source) // parameter로 자기 스택이 주어짐
{
	node<Item>* tail_ptr;

	list_copy(source.top_ptr, top_ptr, tail_ptr);
}
```

### Push

```cpp
template <class Item>
void stack<Item>::push(const Item& entry)
{
	list_head_insert(top_ptr, entry);
}
```

### Pop

```cpp
template <class Item>
void stack<Item>::pop()
{
	assert(!empty());

	list_head_remove(top_ptr);
}
```

### Empty

```cpp
template <class Item>
bool stack<Item>::empty() const
{
	return top_ptr == NULL; // 헤드 포인터가 NULL이냐만 체크하면 됨
}
```

### Top

```cpp
template <class Item>
Item stack<Item>::top() const
{
	assert(!empty());

	return top_ptr->data();
}
```
