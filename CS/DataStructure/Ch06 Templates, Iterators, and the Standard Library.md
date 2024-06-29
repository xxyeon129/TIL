# Part

- 재사용성에 기반을 둠
- 타입에 연연하지 않고 사용 가능하게 함

## Template Functions

`template` function → can be used with many data types

```cpp
template <class Xyz> // Template prefix
Xyz maximum (Xyz a, Xyz b)
{
	if (a > b)
		return a;
	else
		return b;
}
```

```cpp
template <class Item, class SizeType>
Item array_max(Item data[], SizeType n)  // int array_max (int data[], size_t n)
{
	SizeType i; // size_t i;
	Item answer; // int answer;

	assert(n > 0);

	answer = data[0];
	for (i = 1; i < n; i++)
		if(data[i] > answer) answer = data[i];

	return answer;
}
```

## Template Classes

Classes can have parameters (for member variables’ data types, etc)

```cpp
template <class Item>
class bag
{
	public:
		typedef Item value_type;
		...
		bool insert(const Item& entry);
		...
};

// bool bag::insert (const value_type& entry) {...}
template <class Item>
bool bag<Item>::insert (const Item& entry) ...
```

```cpp
template <class Item1, class Item2, ...>
class something
{
	public:
		typedef Item1 value_type;
		...
		bool insert (const Item1& entry);
	private:
		Item2 var1;
		...
}
```

An object instance of a template class is created →when one declares a variable with the instantiated template class.

template class 인스턴스 객체는 → 인스턴스화된 template class로 변수를 선언할 때 생성됨

```cpp
template <class Item>
class bag
{
	...
}
...
bag<char> letterBag;
bag<double> doubleBag;
```

# Part II

STL → 자료구조, 알고리즘 구현한 클래스들 있는 라이브러리(standard template library)

STL은 템플릿 기법 사용해서 → 어떤 자료형에도 사용할 수 있음

`multiset`은 STL 라이브러리에 있는 클래스 템플릿 → count, erase, size 했던 거랑 비슷하다

- 중복된 원소를 포함할 수 있는 컨테이너

리턴값으로 iterator를 줌

→ insert function을 보니까 앞에 iterator라는게 나옴.

# Iterator

`iterator`는 container의 모든 요소들을 쉽게 접근하게 해주는 객체
→ 얘를 통해서 요소들에 접근하고 걔네를 바꿀 수 있음!

## iterator 쓰는 법

1. `begin()`

   - STL 컨테이너 클래스에 있나봄
   - 저 함수를 쓰면 iterator를 리턴함
   - 리턴된 iterator는 container의 첫 번째 요소에 접근하게 해줌
   - 여기서 요소들의 순서는 어케 알아낸거임?
     - → 비교 연산자를 통해서 알게 됐나봄
     - Irreflexivity(둘이 같다면, 한쪽이 더 크거나 작지 않음)
     - Antisymmetry(둘이 같지 않다면, 한쪽이 더 크거나 작음)
     - Transitivity(x<y, y<z → x<z)

1. `*` 연산자

   - iterator의 현재 요소에 접근하는데 쓰임
   - multiset에서는 iterator를 통해 요소를 바꾸는 게 허용되지 않음

   ```cpp
   multiset<string>::iterator iter; // string 타입의 원소들을 갖는 컨테이너 multiset
                                    // multiset에 대한 iterator 선언

   iter = actors.begin(); // actors라는 다중 집합의 첫 번째 원소를 가리키는 iterator를 iter에 할당

   cout << *iter << endl; // iter가 가리키는 실제 원소를 출력
                          // 첫 번째 원소를 출력하고 새 줄로 넘어감
   ```

1. `++` 연산자

   iterator를 collection에 있는 다음 item으로 move

   ```cpp
   multiset<string>::iterator iter;

   iter = actors.begin();
   ++iter;
   ```

1. `end()`

   - 마지막 item에 mark한 iterator를 리턴함
   - 컨테이너의 마지막 아이템을 beyond한 iterator를 리턴하기 때문에 → \* operator와 같이 쓰이면 안됨

   ```cpp
   for (iter=actors.begin(); iter!=actors.end(); ++iter){
   	cout << *iter << endl;
   }
   ```

# Other multiset Operations

## find(const value_type& target)

- multiset 내부의 target과 equal한 첫 번째 item을 가리키는 iterator를 리턴함
- 찾지 못하면, end()와 equal한 iterator를 리턴함

```cpp
multiset<int> m;
multiset<int>::iterator position;
position = m.find(42);
```

## erase(iterator i)

iterator의 현재 item을 remove

```cpp
position = m.find(42);
if(position != m.end())
	m.erase(position);
```

# Const iterators (const_iterator)

forbidden from changing its underlying container

- multiset erase function과 같이 쓰이면 안됨
- begin과 end function과는 같이 쓰일 수 있음

```cpp
const multiset<int> m;
multiset<int>::const_iterator cursor;
for(cursor=m.begin(); cursor!=m.end(); ++cursor) {...}
```

- 여기서 m.begin(), m.end()는 const_iterator 리턴

# Standard Template Classes and Their Iterators

## 1. Forward Iterator

- default constructor
- copy constructor
- assignment operator
- `*`, `++` operator defined
- `==`, `!=` defined

## 2. Bidirectional Iterator

- forward + backward
- `*`, `++`, `--` operator defined
- `==`, `!=` defined

## 3. Random Access Iterator

- forward + backward
- 배열의 경우 가능 (multiset의 경우 mset[3] 이렇게 접근 불가한데, random access iterator의 경우 가능)
- provide array notation → to access item p[i]
- p[n] → provide access to item → n steps after current item
- \*, ++, --, +=, -=, +, -
- ==, !=

## 4. Input Iterator

## 5. Output Iterator

# The node Template Class

```c
class node
{
	public:
		typedef int value_type;
}
```

```c
template <class Item>
class node
{
	public:
		typedef Item value_type
}
```

```cpp
node* list_locate(node* head_ptr, size_t position);
const node* list_locate(const node* head_ptr, size_t position);
```

```cpp
template <class NodePtr, class SizeType>
NodePtr list_locate(NodePtr head_ptr, SizeType position);
```

# Iterator for Linked Lists

has a member variable → `current` (`node<Item>*`)

access th the current node in the list

```cpp
template <class Item>
class node_iterator: public std::iterator<std::forward_Iterator_tag, Item>
{
	private:
		node<Item>* current;
}
```

## The node iterator class

- **constructor**
  ```cpp
  node_iterator(node<Item>* initial=NULL)
  {
  	current = initial;
  }
  ```
- **`*` operator**
  ```cpp
  Item& operator *() const
  {
  	return current->data();
  }
  ```
- **`++` operator**

  - Prefix

    ```cpp
    node_iterator& operator ++() // Prefix ++
    {
    	current = current->link();
    	return *this;
    }

    cout << *(++p) // 그대로 나옴
    ```

  - Postfix

    ```cpp
    node_iterator operator ++(int) // Postfix ++
    // Not an int parameter -> this is the postfix version of the ++ operator
    {
    	node_iterator original(current);
    	current = current->link();
    	return original;
    }

    cout << *(++p) // 이전 요소가 나옴
    ```

- **`==` operator**
  ```cpp
  bool operator ==(const node_iterator other) const
  {
  	return current == other.current;
  }
  ```
- **`!=` operator**
  ```cpp
  bool operator !=(const node_iterator other) const
  {
  	return current != other.current;
  }
  ```
  .
