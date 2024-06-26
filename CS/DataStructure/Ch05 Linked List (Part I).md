# 1. 리스트 추상 데이터 타입

## 리스트

- 리스트의 항목들은 순서 또는 위치를 가진다
- 리스트를 가지고 할 수 있는 연산 → 삽입, 삭제, 탐색

## 리스트 ADT

Abstract Data Type(추상 자료형): 구현 방법은 명시하지 않고 자료구조의 특성들과 어떤 Operation들이 있는지 설명하는 자료구조의 한 가지 형태.

## 리스트의 구현

리스트 → 배열 or 연결 리스트를 이용해 구현 가능

- 배열
  - ✨ 구현이 간단하고 속도가 빠름
  - 💩 리스트의 크기가 고정됨 → 동적으로 크기를 늘리거나 줄이기 어려움
    - 메모리 공간 부족해질 경우 더 큰 배열을 만들어 기존 배열 데이터 전부 복사하면 되지만 → CPU 시간 낭비
  - 💩 삽입하거나 삭제할 경우 → 기존 데이터 이동해야 함
- 연결 리스트
  - ✨ 크기 제한 X(동적으로 크기 변화 가능)
  - ✨ 삽입 삭제 유연함(데이터 이동 필요 X)
  - 💩 구현이 복잡함
  - 💩 i번째 임의의 항목 추출 시 배열보다 시간이 오래 걸림(앞에서부터 순차적으로 접근해야 함)
  - 💩 포인터도 저장해야 하므로 메모리 공간을 많이 사용

<br />

# 2. 배열로 구현된 리스트

순차적인 메모리 공간이 할당됨 → 리스트의 순차적 표현 (sequential representation)

## 실행 시간 분석 - 시간 복잡도

- 접근 `get_entry` → O(1)
- 삽입, 삭제 → 최악의 경우 O(n), 최선의 경우 O(1)

<br />

# 3. 연결 리스트

포인터를 사용해 데이터 연결

물리적으로 흩어져 있는 자료들을 서로 연결해 하나로 묶는 방법 → 연결 리스트(linked list)

연결하는 줄이 pointer → 삽입, 삭제 시 데이터를 이동할 필요 없이 포인터만 변경하면 됨

하나의 프로그램에 동시에 여러 개의 연결 리스트가 존재 가능 → 연결리스트들을 구별하는 건 첫 번째 데이터

## 연결 리스트의 구조

연결 리스트는 node들의 집합. → node들은 메모리의 어떤 위치에나 있을 수 있고, 다른 node로 가기 위해서는 현재 node가 가지고 있는 포인터를 이용하면 됨

node는 `data field`와 `link field`로 구성되어 있음

- `data field`
  - 저장하고 싶은 데이터가 들어감
  - 정수가 될 수도 있고 구조체와 같은 복잡한 데이터가 될 수도 있음
- `link field`
  - 다른 node를 가리키는 포인터가 저장됨
  - 포인터를 이용해 다음 노드로 건너갈 수 있음
    - → 연결 리스트마다 **첫 번째 노드를 가리키고 있는 변수**가 필요한데, 이걸 `head pointer` 라고 함
  - 마지막 노드의 `link field`는 NULL로 설정 → 더 이상 연결된 노드가 없다는 것을 의미

연결 리스트의 노드들은 필요할 때마다 `malloc()`을 이용해 동적으로 생성됨

## 연결 리스트의 종류

### 단순 연결 리스트

- singly linked list: 하나의 방향으로만 연결되어 있는 연결 리스트
- chain이라고도 함
- 마지막 노드의 link는 NULL값을 가짐

### 원형 연결 리스트

- circular linked list: 단순 연결 리스트와 같지만,
- 마지막 노드의 링크가 → 첫 번째 노드를 가리킴

### 이중 연결 리스트

- doubly linked list: 각 노드마다 2개의 링크가 존재
- 하나의 링크는 앞에 있는 노드를 가리키고, 또 하나의 링크는 뒤에 있는 링크를 가리킴

<br />

# 4. 단순 연결 리스트

노드들이 하나의 `link field`를 가짐. → 이 `link field`를 이용해 모든 노드들이 연결되어 있음.

## 노드의 정의

노드는 `자기 참조 구조체`를 이용해 정의됨

`자기 참조 구조체`: 자기 자신을 참조하는 포인터를 / 포함하는 구조체

- 구조체 안에는 데이터를 저장하는 data field, 포인터가 저장되어 있는 link field가 존재
  - data field는 element 타입의 데이터를 저장하고 있음.
  - link field는 **ListNode(구조체)를 가리키는 포인터**로 정의되며 + **다음 노드의 주소가 저장됨**

```c
typeof int element;
typeof struct ListNode { // 노드 타입
	element data;
	struct ListNode *link;
} ListNode;
```

## 공백 리스트의 생성

단순 연결 리스트는 `head pointer`만 있으면 모든 노드를 찾을 수 있음

```c
ListNode *head = NULL;
```

어떤 리스트가 공백인지 검사하려면 head pointer가 NULL인지 검사하면 됨.

## 노드의 생성

일반적으로 연결 리스트에서는 필요할 때마다 동적 메모리 할당을 이용해 → 노드를 동적으로 생성함.

```c
head = (ListNode *)malloc(sizeof(ListNode));
```

새로 만들어진 노드에 데이터를 저장하고 link field를 NULL로 설정해보자.

```c
head->data = 10;
head->link = NULL;
```

## 노드의 연결

연결 리스트에는 여러 개의 노드가 서로 연결되어 있음.

동일한 방식으로 두 번째 노드를 동적으로 생성해보자.

```c
ListNode *p;
p = (ListNode *)malloc(sizeof (ListNode));
p->data = 20;
p->link = NULL;
```

이제 두 노드를 서로 연결해보자.

```c
head->link = p;
```

노드를 더 생성해서 붙이고 싶으면 위 과정을 되풀이하면 된다.

<br />

# 5. 단순 연결 리스트의 연산 구현

리스트가 커지면 추상 데이터 타입에 정의된 전용 함수들을 통해 노드를 추가하는 것이 편리함

- `insert_first()`: 리스트 시작 부분 삽입
- `insert():` 리스트 중간 부분 삽입
- `delete_first()`: 리스트 첫 번째 삭제
- `delete()`: 리스트 중간 삭제
- `print_list()`: 리스트를 방문해 모든 항목을 출력

## 삽입 연산 insert_first()

리스트의 첫 부분에 새로운 노드를 추가

```c
ListNode* insert_first(ListNode *head, element value);
```

```c
ListNode* insert_first(ListNode *head, element value)
{
	ListNode *p = (ListNode *)malloc(sizeof(ListNode)) // (1)
	p->data = value;                                   // (2)
	p->link = head;  // 헤드 포인터의 값을 복사             // (3)
	head = p;        // 헤드 포인터 변경                  // (4)
	return head;     // 변경된 헤드 포인터 반환
}
```

## 삽입 연산 insert()

연결 리스트의 중간에 새로운 노드 추가

**삽입되는 위치의 선행 노드를 반드시 알아야 삽입 가능**

```c
// 노드 pre 뒤에 새로운 노드 삽입
ListNode* insert(ListNode *head, ListNode *pre, element value)
{
	ListNode *p = (ListNode *)malloc(sizeof(ListNode)); // (1) 새로운 노드 생성
	p->data = value;      // (2) p의 데이터 필드에 삽입할 값 저장
	p->link = pre->link;  // (3) p의 링크 필드가 (삽입할 값에서) 다음 노드를 가리키게 변경
	pre->link = p;        // (4) pre 노드 링크 필드가 삽입한 노드를 가리키게 변경
	return head;          // (5) 변경된 헤드 포인터 반환
}
```

## delete_first() 함수

첫번째 노드를 삭제하는 함수

```c
ListNode* delete_first(ListNode *head);
```

```c
ListNode* delete_first(ListNode *head)
{
	ListNode *removed;
	if(head == NULL) return NULL;
	removed = head;       // (1) 헤드 포인터의 값을 removed에 복사
	head = removed->link; // (2) 헤드 포인터의 값을 head->link로 변경
	free(removed);        // (3) removed가 가리키는 동적 메모리 반환
	return head;          // (4) 변경된 헤드 포인터 반환
}
```

## 삭제 연산 delete()

리스트 중간에서 삭제

```c
// pre가 가리키는 노드의 다음 노드를 삭제한다.
ListNode* delete(ListNode *head, ListNode *pre)
{
	ListNode *removed;
	removed = pre->link;
	pre->link = removed->link; // (1) pre 노드의 링크 필드가 삭제할 노드의 다음 노드를 가리키게 한다.
	free(removed);             // (2) 삭제할 노드의 동적 메모리를 반납한다.
	return(head);              // (3) 변경된 헤드 포인터를 반환한다.
}
```

## print_list() 함수

연결 리스트의 노드를 방문하면서 노드를 대상으로 다양한 작업을 할 수 있다.

연결 리스트 안의 모든 노드의 데이터를 출력하는 함수 print_list를 작성해보자.

- 노드의 링크값이 NULL이 아니면 계속 링크를 따라가면서 노드를 방문한다.
- 링크값이 NULL이면 연결 리스트의 끝에 도달한 것이므로 반복을 중단한다.

```c
void print_list(ListNode *head)
{
	for (ListNode *p = head; p != NULL; p = p->link)
		printf("%d->", p->data);
	printf("NULL")
}
```

<br />

# 6. 연결 리스트의 응용: 다항식

각 노드는 계수(coef)와 지수(exp), 다음 항을 가리키는 링크(link) 필드로 구성되어 있다.

```c
typedef struct ListNode { // 노드 타입
	int coef;
	int expon;
	struct ListNode *link;
}ListNode;
```

각 다항식은 다항식의 첫 번째 항을 가리키는 포인터로 표현된다.

```c
ListNode *A, *B;
```

1. 포인터 변수 p와 q가 가리키는 항들의 지수가 같으면 계수를 더하고 결과를 다항식 C에 추가한다. 그리고 p와 q는 모두 다음 항으로 이동한다.
2. q가 가리키는 항의 지수가 높으면 → 그 항을 새로운 항으로 복사하여 다항식 C에 추가한다. 그리고 q만 다음 항으로 이동한다.
3. p가 가리키는 항의 지수가 높으면 → 그 항을 새로운 항으로 복사하여 다항식 C에 추가한다. 그리고 p만 다음 항으로 이동한다.
4. p나 q 중 어느 하나가 NULL이 되면 아직 남아 있는 항을 전부 C로 가져온다.

```c
// 리스트 헤더 생성 함수
ListType* create()
{
	ListType *plist = (ListType *)malloc(sizeof(ListType));
	plist->size = 0;
	plist->head = plist->tail = NULL;
	return plist;
}

// plist는 연결 리스트의 헤더를 가리키는 포인터
// coef는 계수, expon은 지수
void insert_last(ListType* plist, int coef, int expon)
{
	ListNode* temp = (ListNode *)malloc(sizeof(ListNode));
	if (temp == NULL) error("메모리 할당 에러");

	temp->coef = coef;
	temp->expon = expon;
	temp->link = NULL;

	if(plist->tail == NULL) {
		plist->head = plist->tail = temp;
	}
	else{
		plist->tail->link = temp;
		plist->tail = temp;
	}
	plist->size++;
}

// list3 = list1 + list2
void poly_add (ListType* plist1, ListType* plist2, ListType* plist3)
{
	ListType* a = plist1->head;
	ListType* b = plist2->head;
	int sum;

	while (a && b) {
		if (a->expon == b->expon) {
			sum = a->coef + b->coef;
			if(sum != 0) insert_last(plist3, sum, a->expon);
			a = a->link; b = b->link;
		}
		else if (a->expon > b->expon){
			insert_last(plist3, a->coef, a->expon);
			a = a->link;
		}
		else {
			insert_last(plist3, b->coef, b->expon);
			b = b->link;
		}
	}

	// a나 b 중 하나가 먼저 끝나면 남아있는 항들 모두 결과 다항식으로 복사
	for(; a != NULL; a = a->link)
		insert_last(plist3, a->coef, a->expon);
	for(; b != NULL; b = b->link)
		insert_last(plist3, b->coef, b->expon);
}
```

<br />

---

<br />

```cpp
class node
	{
	    public:
				// TYPEDEF
				typedef double value_type;

				// CONSTRUCTOR
				node(
				    const value_type& init_data = value_type(),
				    node* init_link = NULL
				)
				{
					data_field = init_data;
					link_field = init_link;
				}

				// Member functions to set the data and link fields:
			    void set_data(const value_type& new_data) { data_field = new_data; }
			    void set_link(node* new_link) { link_field = new_link; }

				// Constant member function to retrieve the current data:
				value_type data( ) const { return data_field; }

				// Two slightly different member functions to retreive
				// the current link:
				const node* link( ) const { return link_field; }
			    node* link( )             { return link_field; }

	    private:
				value_type data_field;
				node* link_field;
	};
```

```cpp
int main( )
{
	node *head_ptr=NULL;
	node first_node(1, NULL);
	node second_node(2, &first_node);
	node third_node;
	third_node.set_data(3);
	third_node.set_link(&second_node);

	head_ptr=&third_node;

	for(node *cursor=head_ptr; cursor!=NULL; cursor = cursor->link())
		cout << cursor->data() << endl; // 3 -> 2 -> 1

  return EXIT_SUCCESS;
}
```

## FUNCTIONS for the linked list toolkit

Operations on a linked list

### `length` of a linked list

```cpp
std::size_t list_length(const node* head_ptr)
	{
		size_t answer = 0;
		const node *cursor;
		for(cursor=head_ptr; cursor!=NULL; cursor=cursor->link() )
			++answer;
		return answer;
	};
```

```cpp
int main( )
{
	node *head_ptr=NULL;
	node first_node(1, NULL);
	node second_node(2, &first_node);
	node third_node;
	third_node.set_data(3);
	third_node.set_link(&second_node);

	head_ptr=&third_node;

	cout << list_length(head_ptr) << endl; // 3

  return EXIT_SUCCESS;
}
```

### `Insert` a node

```cpp
void list_head_insert(node*& head_ptr, const node::value_type& entry)
	{
		head_ptr = new node(entry, head_ptr);
	}
```

```cpp
void list_insert(node* previous_ptr, const node::value_type& entry)
	{
//		node* insert_ptr;
//
//		insert_ptr = new node;
//		insert_ptr->set_data(entry);
//		insert_ptr->set_link(previous_ptr->link());
//		previous_ptr->set_link(insert_ptr);

		previous_ptr->set_link(new node(entry, previous_ptr->link()));
	}
```

### `Search` for data item

```cpp
node* list_search(node* head_ptr, const node::value_type& target)
	{
    	node* cursor;

    	for(cursor=head_ptr; cursor!=NULL; cursor=cursor->link())
    		if(target == cursor->data())
				return cursor;

    	return NULL;
	}
```

### `Locate` a node at a certain position

```cpp
node* list_locate(node* head_ptr, std::size_t position)
	{
    	node* cursor;
    	size_t i;
    	assert(0 < position);

    	for(cursor=head_ptr, i=1; (cursor!=NULL && i<position); i++)
    		cursor = cursor->link();

    	return cursor;
	}
```

```cpp
int main( )
{
	node *head_ptr=NULL, *temp_ptr=NULL;

	list_head_insert(head_ptr, 1);
	list_head_insert(head_ptr, 2);
	list_head_insert(head_ptr, 3);
	list_head_insert(head_ptr, 4);

	for(node *cursor=head_ptr; cursor!=NULL; cursor=cursor->link())
		cout << cursor->data() << endl; // 4 -> 3 -> 2 -> 1

	temp_ptr = list_search(head_ptr, 3);
	list_insert(temp_ptr, 6);

	temp_ptr = list_locate(head_ptr, 3); // 6
	list_insert(temp_ptr, 7);

	for(node *cursor=head_ptr; cursor!=NULL; cursor=cursor->link())
		cout << cursor->data() << endl; // 4 -> 3 -> 6 -> 7 -> 2 -> 1

  return EXIT_SUCCESS;
}
```

### `Copy` one linked list to another

```cpp
void list_copy(const node* source_ptr, node*& head_ptr, node*& tail_ptr)
{
    	head_ptr = NULL;
    	tail_ptr = NULL;

    	if(source_ptr == NULL)
    		return;

    	// Allocate a new node for the head of the new list
    	// 소스 포인터가 가리키는 데이터를 head_pointer에 연결
    	list_head_insert(head_ptr, source_ptr->data());
    	// Make head_ptr and tail_ptr point to this node
    	// 마지막 포인터를 헤드 포인터에 연결
    	tail_ptr = head_ptr;

    	// Allocate a new node for the next original data
    	// 다음 소스 포인터로 변경
    	source_ptr = source_ptr->link();

    	while(source_ptr != NULL){
    		// insert the new node to the tail of the new list
    		list_insert(tail_ptr, source_ptr->data());
    		tail_ptr = tail_ptr->link();
    		source_ptr = source_ptr->link();
			}
}
```

- main.cpp

  ```cpp
  int main( )
  {
  	node *head_ptr=NULL, *tail_ptr=NULL;

  	list_head_insert(head_ptr, 1);
  	list_head_insert(head_ptr, 2);
  	list_head_insert(head_ptr, 3);
  	list_head_insert(head_ptr, 4);

  	for(node *cursor=head_ptr; cursor!=NULL; cursor=cursor->link())
  		cout << cursor->data() << endl; // 4 -> 3 -> 2 -> 1

  	// ------------------------------------------

  	node *head_ptr2=NULL, *tail_ptr2=NULL;
  	list_copy(head_ptr, head_ptr2, tail_ptr2);

  	cout << "LIST 1" << endl;
  	for(node *cursor=head_ptr; cursor!=NULL; cursor=cursor->link())
  		cout << cursor->data() << endl; // 4 -> 3 -> 2 -> 1

  	cout << "LIST 2" << endl;
  	for(node *cursor=head_ptr2; cursor!=NULL; cursor=cursor->link())
  		cout << cursor->data() << endl; // 4 -> 3 -> 2 -> 1

  	return EXIT_SUCCESS;
  }
  ```

### `Remove` a node

```cpp
void list_head_remove(node*& head_ptr)
{
	node* remove_ptr; // 1. 새로운 포인터 설정

	remove_ptr = head_ptr; // 2. 새로운 포인터를 헤드 포인터로 연결

	head_ptr = remove_ptr->link(); // 3. 헤드 포인터를 새로운 포인터로 연결

	delete remove_ptr; // 새로운 포인터 delete
}
```

- main.cpp

  ```cpp
  int main( )
  {
  	node *head_ptr=NULL, *tail_ptr=NULL;

  	list_head_insert(head_ptr, 1);
  	list_head_insert(head_ptr, 2);
  	list_head_insert(head_ptr, 3);
  	list_head_insert(head_ptr, 4);

  	for(node *cursor=head_ptr; cursor!=NULL; cursor=cursor->link())
  		cout << cursor->data() << endl; // 4 -> 3 -> 2 -> 1

  	cout << "----------------" << endl;

  	list_head_remove(head_ptr);

  	for(node *cursor=head_ptr; cursor!=NULL; cursor=cursor->link())
  		cout << cursor->data() << endl; // 3 -> 2 -> 1

  	return EXIT_SUCCESS;
  }
  ```

```cpp
void list_remove(node* previous_ptr)
{
    	node* remove_ptr; // 1. 새로운 포인터 설정

    	remove_ptr = previous_ptr->link(); // 2. 새로운 포인터에 이전 포인터 연결
    	previous_ptr->set_link(remove_ptr->link()) // 3. 이전 포인터에 새로운 포인터 연결

    	delete remove_ptr; // 새로운 포인터 delete
}
```

### `Clear` a linked list (empty list) → 헤드 하나씩

⚠️ If we make head_ptr NULL / without deleting all nodes in list

→ we will lose the whole list.

```cpp
void list_clear(node*& head_ptr)
{
	while(head_ptr != NULL)
		list_head_remove(head_ptr);
}
```

- main.cpp

  ```cpp
  int main( )
  {
  	node *head_ptr=NULL, *tail_ptr=NULL;

  	list_head_insert(head_ptr, 1);
  	list_head_insert(head_ptr, 2);
  	list_head_insert(head_ptr, 3);
  	list_head_insert(head_ptr, 4);

  	for(node *cursor=head_ptr; cursor!=NULL; cursor=cursor->link())
  		cout << cursor->data() << endl; // 4 -> 3 -> 2 -> 1

  	list_clear(head_ptr);

  	cout << "LIST 1 after list_clear" << endl;
  	for(node *cursor=head_ptr; cursor!=NULL; cursor=cursor->link())
  		cout << cursor->data() << endl;

  }
  ```

# 전체 코드

```cpp
class node
    {
	    public:
			// TYPEDEF
			typedef double value_type;

			// CONSTRUCTOR
			node(
			    const value_type& init_data = value_type(),
			    node* init_link = NULL
			)
			{
				data_field = init_data;
				link_field = init_link;
			}

			// Member functions to set the data and link fields:
		    void set_data(const value_type& new_data) { data_field = new_data; }
		    void set_link(node* new_link) { link_field = new_link; }

			// Constant member function to retrieve the current data:
			value_type data( ) const { return data_field; }

			// Two slightly different member functions to retreive
			// the current link:
			const node* link( ) const { return link_field; }
		    node* link( )             { return link_field; }

	    private:
			value_type data_field;
			node* link_field;
    };

    // FUNCTIONS for the linked list toolkit
    // length
    std::size_t list_length(const node* head_ptr)
	{
		size_t answer = 0;
		const node *cursor;
		for(cursor=head_ptr; cursor!=NULL; cursor=cursor->link() )
			++answer;
		return answer;
	};

	// insert
    void list_head_insert(node*& head_ptr, const node::value_type& entry)
	{
		head_ptr = new node(entry, head_ptr);
	};

    void list_insert(node* previous_ptr, const node::value_type& entry)
	{
		previous_ptr->set_link(new node(entry, previous_ptr->link()));
	};

	// search
    node* list_search(node* head_ptr, const node::value_type& target)
    {
    	node* cursor;

    	for(cursor=head_ptr; cursor!=NULL; cursor=cursor->link())
    		if(target == cursor->data())
				return cursor;

    	return NULL;
	}
    const node* list_search(const node* head_ptr, const node::value_type& target)
    {
    	const node* cursor;

    	for(cursor=head_ptr; cursor!=NULL; cursor=cursor->link())
    		if(target == cursor->data())
				return cursor;

    	return NULL;
	}

    // locate
    node* list_locate(node* head_ptr, std::size_t position)
    {
    	node* cursor;
    	size_t i;
    	assert(0 < position);

    	for(cursor=head_ptr, i=1; (cursor!=NULL && i<position); i++)
    		cursor = cursor->link();

    	return cursor;
	}
    const node* list_locate(const node* head_ptr, std::size_t position)
    {
    	const node* cursor;
    	size_t i;
    	assert(0 < position);

    	for(cursor=head_ptr, i=1; (cursor!=NULL && i<position); i++)
    		cursor = cursor->link();

    	return cursor;
	}

	// copy
    void list_copy(const node* source_ptr, node*& head_ptr, node*& tail_ptr)
    {
    	head_ptr = NULL;
    	tail_ptr = NULL;

    	if(source_ptr == NULL)
    		return;

    	// Allocate a new node for the head of the new list
    	list_head_insert(head_ptr, source_ptr->data());
    	// Make head_ptr and tail_ptr point to this node
    	tail_ptr = head_ptr;

    	// Allocate a new node for the next original data
    	source_ptr = source_ptr->link();

    	while(source_ptr != NULL){
    		// insert the new node to the tail of the new list
    		list_insert(tail_ptr, source_ptr->data());
    		tail_ptr = tail_ptr->link();
    		source_ptr = source_ptr->link();
		}
	}

    // remove
    void list_head_remove(node*& head_ptr)
    {
    	node* remove_ptr;

    	remove_ptr = head_ptr;

    	head_ptr = remove_ptr->link();

    	delete remove_ptr;
	}
    void list_remove(node* previous_ptr)
    {
    	node* remove_ptr;

    	remove_ptr = previous_ptr->link();
    	previous_ptr->set_link(remove_ptr->link());

    	delete remove_ptr;
	}

    // clear
    void list_clear(node*& head_ptr)
    {
    	while(head_ptr != NULL)
    		list_head_remove(head_ptr);
		}

}
```

```cpp
int main( )
{
	node *head_ptr=NULL, *tail_ptr=NULL;

	list_head_insert(head_ptr, 1);
	list_head_insert(head_ptr, 2);
	list_head_insert(head_ptr, 3);
	list_head_insert(head_ptr, 4);

	for(node *cursor=head_ptr; cursor!=NULL; cursor=cursor->link())
		cout << cursor->data() << endl; // 4 -> 3 -> 2 -> 1

	cout << "----------------" << endl;

	tail_ptr = list_search(head_ptr, 1);

	list_head_remove(head_ptr); // 3 -> 2 -> 1

	node *head_ptr2=NULL, *tail_ptr2=NULL;
	list_copy(head_ptr, head_ptr2, tail_ptr2);

	cout << "LIST 1" << endl;
	for(node *cursor=head_ptr; cursor!=NULL; cursor=cursor->link())
		cout << cursor->data() << endl;

	cout << "LIST 2" << endl;
	for(node *cursor=head_ptr2; cursor!=NULL; cursor=cursor->link())
		cout << cursor->data() << endl;

	list_clear(head_ptr);

	cout << "LIST 1 after list_clear" << endl;
	for(node *cursor=head_ptr; cursor!=NULL; cursor=cursor->link())
		cout << cursor->data() << endl;

    return EXIT_SUCCESS;
}
```
