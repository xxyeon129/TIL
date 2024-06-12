제일 끝(rear)에 insert되고, 제일 앞(front)에서부터 removed됨 (줄 생각하면 됨)

First-In First Out (FIFO)

- 추가하는 연산 `enqueue`
- 삭제하는 연산 `dequeue`

## STL Queue Class Template

- `pop()` (dequeue)
- `push(const Item& entry)` (enqueue)
- `empty()`→ 비어있는지 알아보는 것
- `size()`
- `front()` → 프론트에 있는 포인터를 얻어내는 것
- etc.

## Queue Errors

- Queue overflow: 꽉 차있는데 push
- Queue underflow: empty 큐에 pop

## Recognizing Palindromes

Palindrome: 앞뒤가 똑같은 단어나 문장

스택, 큐 동시에 사용해서 구현

```cpp
#include <queue>
#include <stack>
#include <cctype>
#include <iostream>
int main( ) {
	queue<char> q;
	stack<char> s;
	char letter;
	int mismatches = 0;

	while (cin.peek() !== '\n'){ // 다음 글자가 뭔지 보는 것 peek()
		cin >> letter; // 입력을 읽어옴

		if(isalpha(letter)) { // 대소문자 동일하게 변경
			q.push(toupper(letter));
			s.push(toupper(letter));
		}
	}

	while( (!q.empty()) && (!s.empty()) ) {
		if (q.front() != s.top())
			mismatches++;

		q.pop(); s.pop();
	}

	if (mismathes == 0) // mismatches가 끝까지 0이어야 palindrome
		cout << "That is a palindrome." << endl;
	else
		cout << "That is NOT a palindrome." << endl;

	return EXIT_SUCCESS;
}
```

# Implementation of the Queue Class

큐는 입력될 때는 last 쪽에 입력되고, 나갈 때는 first 쪽에서 나감

first, last index로부터 items 갯수를 알고자 할 때 문제: 비어있는 칸

1. 항목이 추가/제거됨에 따라 첫 번째와 마지막이 증가 → 마지막이 배열의 끝에 위치한다면 새로운 아이템을 추가하지 못함
2. 왼쪽으로 한칸씩 옮기는 접근: 매우 비효율적
3. **Circular array approach:** rear 인덱스가 배열 끝이면 배열의 처음부터 reusing함
   1. 다음 인덱스 계산이 달라짐
   2. next_index = `(current_index + 1) % CAPACITY`
   3. For an empty queue, `first` is always equal to `next_index(last)`

## Array Implementation

```cpp
template <class Item>
class queue {
	public:
		typedef std::size_t size_type;
		static const size_type CAPACITY = 30;
		queue();
		void pop();
		void push(const Item& entry);
		bool empty() const {return (count == 0);}
		Item front() const;
		size_type size() const {return count;}
	private:
		Item data[CAPACITY];
		size_type first; // indicates the first index currently in use
		size_type last; // indicates the last index currently in use
		size_type count;
		size_type next_index(size_type i) const // computing the next index given the current one
			{return (i+1) % CAPACITY}
}
```

```cpp
template<class Item>
queue<Item>::queue() {
	count = 0;
	first = 0;
	last = CAPACITY - 1;
}

template<class Item>
Item queue<Item>::front() const {
	assert(!empty());
	return data[first];
}

template<class Item>
void queue<Item>::pop() {
 assert(!empty());
 first = next_index(first);
 --count;
}

template<class Item>
Item queue<Item>::push(const Item& entry) {
	assert(size() < CAPACITY);
	last = next_index(last);
	data[last] = entry;
	++count;
}
```

## Linked List Implementation

```cpp
template<class Item>
class queue {
	public:
		typedef std::size_t size_type;
		queue();
		queue(const queue<Item>& source);
		~queue();
		void pop();
		void push(const Item& entry);
		void operator =(const queue<Item>& source);
		bool empty() const {return (count==0);}
		Item front() const;
		size_type size() const {return count;}
	private:
		node<Item> *front_ptr; // points to the first node
		node<Item> *rear_ptr; // points to the last node
		size_type count; // counts the number of items in the list
}
```

```cpp
template<class Item>
queue<Item>::queue() {
	count = 0;
	front_ptr = NULL; // we don't cate about rear_ptr
										// when front_ptr is NULL
}

template<class Item>
queue<Item>::queue(const queue<Item>& source) {
	count = source.count;
	list_copy(source.front_ptr, front_ptr, rear_ptr);
}

template<class Item>
queue<Item>::~queue() {
	list_clear(front_ptr);
}

template<class Item>
void queue<Item>::operator =(const queue<Item>& source) {
	if (this == &source) return;
	list_clear(front_ptr);
	list_copy(source.front_ptr, front_ptr, rear_ptr);
	count = source.count;
}

template<class Item>
Item queue<Item>::front() const {
	assert(!empty());
	return front_ptr->data();
}

template<class Item>
void queue<Item>::pop() {
	assert(!empty());
	list_head_remove(front_ptr);
	--count;
}

template<class Item>
void queue<Item>::push(const Item& entry) {
	if(empty()) {
		list_head_insert(front_ptr, entry);
		rear_ptr = front_ptr;
	} else {
		list_insert(rear_ptr, entry);
		rear_ptr = rear_ptr->link();
	}
	++count;
}
```

🧑‍💻 queue1 / Ch.8, queue1.h, queue1.template

## = operator

- a = b라고 할 때, source는 b고 this는 a
- 단순히 copy해서 옮기면 사용하지 않는 기존 a의 내용이 메모리에 계속 남아있게 되기 때문에 list_clear(front_ptr) 과정이 필요
- copy constructor에서 두 줄이 추가된 것

## push()

비어있는 경우, 비어있지 않은 경우 나누어 생각

- 비어있는 경우에는 그냥 head_insert(front_ptr, entry)
  - rear_ptr 또한 똑같은 front_ptr를 가리킴 (하나 넣은 상태니까)
- 하나라도 있는 상태인 경우 → head가 아닌 뒤에 넣어야 함

# Priority Queues

우선순위 level(specified priority levels)에 따라 삭제됨

일반 Queue는 선착순대로 번호 받아서 우선순위가 주어지지만, Priority는 들어온 순서에 상관 없이 우선순위를 다른 기준에 의해 따로 부여

The “out” order **may not be the same** as “in” order → 수가 큰 순서로 삭제되거나 작은 순서로 삭제되거나..

## STL

`priority_queue<Item>` class template

이걸 사용하려면 부등호 < > (less than) operator가 정의되어 있어야 함 이게 정의되어 있는 Item만이 priority_queue의 Item으로 사용할 수 있음

## Return Values (Stack, Queue, Priority Queue)

- STL 사용할 때 주의해야 할 점은 `top`과 `front` function 사용 시 **reference 타입**이다 그래서 발전된 형태로 사용할 수 있다
  - assignment를 사용할 수 있다. 값이 뭐든지 간에 임의의 값을 집어넣어 값을 바꿀 수 있음 `s.top()=42` `q.front()=33`

# Deque: Double Ended Queue

both ends에 inset/remove items를 함 (pop과 다름)

스택과 큐가 결합된 형태

- C++ STL class template
  - `push_front`, `push_back`
  - `pop_front`, `pop_back`
