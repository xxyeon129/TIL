- default capacity가 없음
- “reserve” 함수가 필요없음
- 노드 추가, 삭제가 쉬움

# Constructors/Destructor

## Constructors

인수가 없는 기본 생성자

```cpp
bag::bag( )
{
	head_ptr = NULL;
	many_nodes = 0;
}
bag(const bag& source)
{
	node *tail_ptr;
	list_copy(source.head_ptr, head_ptr, tail_ptr);
	many_nodes = source.many_nodes;
}
```

## Destructor

list의 모든 노드들을 해제해서 bag 삭제

```cpp
bag::~bag( )
{
	list_clear(head_ptr);
	many_nodes = 0; // not necessary
}
```

<br />

# Assignment/Self-Increment Operators(=,+=)

## Assignment (=)

1. self-assignment인지 테스트하고 → 그렇다면 return
2. Clear self
3. source list를 카피하고 LHS의 새로운 list를 만들기

## Self-Increment (+=)

1. addend(더해지는 수)가 empty한지 테스트하고 → 그렇다면 return
2. source list 복사
3. 목록 끝에 복사본 추가

<br />

# `erase_one` function

head에 있는 data를 복사해서 / 지우고자 하는 데이터에 복사한 후 / head에 있는 놈을 삭제

```cpp
bool bag::erase_one(const value_type& target)
{
	node *target_ptr;
	target_ptr = list_search(head_ptr, target);

	if(target_ptr == NULL)
		return false; // target isn't in the bag, so no work to do

	target_ptr->set_data(head_ptr->data());
	list_head_remove(head_ptr);

	--many_nodes;

	return true;

}
```

<br />

# `count` function

```cpp
bag::size_type bag::count(const value_type& target) const
{
	size_type counted_number = 0;

	const node* cursor;
	cursor = list_search(head_ptr, target);

	while(cursor != NULL)
	{
		++counted_number;
		cursor = cursor->link();
		cursor = list_search(cursor, target);
	}

	return counted_number;
}
```

<br />

# `grab` function

```cpp
#include <cassert>  // Provides assert
#include <cstdlib>  // Provides NULL, rand, size_t

bag::value_type bag::grab() const
{
	size_type random_ptr;
	const node *cursor; // Use const node* since we don't change the nodes

	assert(size() > 0);

	random_ptr = (rand() % size()) + 1;
	cursor = list_locate(head_ptr, random_ptr);

	return cursor->data();
}
```

<br />

# `insert` function

```cpp
void bag::insert(const value_type& entry)
{
		list_head_insert(head_ptr, entry);
		++many_nodes;
}
```

<br />

# `+` operator

```cpp
bag operator +(const bag& b1, const bag& b2)
{
		bag answer;

		answer += b1;
		answer += b2;
		return answer;
}
```

<br />

# Doubly Linked Lists

각 노드들이 **앞뒤로** link되어 있는 연결 리스트

```cpp
class dnode
{
	public:
		typedef double value_type;
	private:
		value_type data_field;
		dnode *link_fore;
		dnode *link_back;
}
```

<br />

# Dynamic Arrays vs. Linked List vs. Doubly Linked Lists

- Arrays가 random access에 더 좋음
  - array의 41번째 item data 얻기
  - 477번째의 value를 12로 바꾸기
- Linked list가 insert/deletion에 더 좋음
- Doubly linked list가 two-way cursor에 좋음
- Dynamic Array는 크기 조정이 비효율적일 수 있음

<br />

# Code

```cpp
#ifndef MAIN_SAVITCH_BAG3_H
#define MAIN_SAVITCH_BAG3_H
#include <cstdlib>   // Provides size_t and NULL
#include <cassert>
#include <iostream>  // for test
using namespace std;
// #include "node1.h"   // Provides node class

namespace main_savitch_5
{
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



    class bag
    {
    public:
        // TYPEDEFS
        typedef std::size_t size_type;
        typedef node::value_type value_type;
        // CONSTRUCTORS and DESTRUCTOR
        bag()
        {
        	head_ptr = NULL;
        	many_nodes = 0;
		}
        bag(const bag& source)
        {
        	node *tail_ptr;
        	list_copy(source.head_ptr, head_ptr, tail_ptr);
        	many_nodes = source.many_nodes;
		}
		~bag( )
		{
			list_clear(head_ptr);
			many_nodes = 0;
		}

        // MODIFICATION MEMBER FUNCTIONS
        // Assignment
        void operator =(const bag& source)
        {
        	node* tail_ptr;

        	if(this == &source)
        		return;

        	list_clear(head_ptr);
        	many_nodes = 0;

        	list_copy(source.head_ptr, head_ptr, tail_ptr);
        	many_nodes = source.many_nodes;
		}

		// Self-Increment
		void operator +=(const bag& addend)
		{
			node* copy_tail_ptr;
			node* copy_head_ptr;

			cout << "@@" << copy_tail_ptr->data() << endl;

			if(addend.many_nodes > 0)
			{
				list_copy(addend.head_ptr, copy_head_ptr, copy_tail_ptr);
				copy_tail_ptr->set_link(head_ptr);
				head_ptr = copy_head_ptr;
				many_nodes += addend.many_nodes;
			}
		}

        size_type erase(const value_type& target);
        bool erase_one(const value_type& target);
        void insert(const value_type& entry)
        {
        	list_head_insert(head_ptr, entry);
        	++many_nodes;
		}


        // CONSTANT MEMBER FUNCTIONS
        size_type size( ) const { return many_nodes; }
        size_type count(const value_type& target) const;
        value_type grab( ) const;

        // TEST
        void print() const
        {
        	node* cursor = head_ptr;
        	while(cursor != NULL)
        	{
        		cout << cursor->data() << " ";
        		cursor = cursor->link();
			}
		}
    private:
        node *head_ptr;       // List head pointer
        size_type many_nodes; // Number of nodes on the list
    };

    // NONMEMBER FUNCTIONS for the bag class:
    bag operator +(const bag& b1, const bag& b2);
}
#endif
```
