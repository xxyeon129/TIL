# Assignment operator =

1. check self-assignment (a=a)
2. size of array 다르면 → allocate memory for new array
3. copy source data → newly allocated data array

```cpp
void bag::operator = (const bag& source) {
	value_type *new_data

	if(this == &source) return;

	if(capacity != source.capacity) { // 1. 용량 다를 경우
		new_data = new value_type[source.capacity]; // 2. new_data 포인터에 new vlaue_type 위치 할당
		delete [] data; // 3. 기존에 있던 데이터 초기화
		data = new_data; // 4. new_data 포인터 (new vlaue_type 위치) 할당
		capacity = source.capacity; // 5. 용량 변경
	}

	used = source.used; // 6. 크기 변경
	copy(source.data, source.data+used, data); // 카피 (source 시작포인터, 끝포인터, data포인터)
}
```

new_data 포인터 선언해주고, a 입장에서 오퍼레이터를 b로 받고 있는 것… capacity와 source.capacity가 같다면 그냥 복사하는데 다르다 → 원래 있던 데이터 없애버리고 새로운 new_data 쪽으로 링크시킨다.

<br />

# reserve function: increses capacity

```cpp
void bag::reserve(size_type new_capacity)
{
	value_type *larger_array; // 1. 포인터 선언

	if(new_capacity == capacity) return; // 신중하게 capacity와 new_capacity를 비교 → 실수 방지 체크
	if(new_capacity < used) new_capacity = used; // new-capacity가 더 작은 값으로 바꿀 수 있기 때문에 used보다 더 작으면 안되기 때문에 used와 똑같이 해놓고

	larger_array = new value_type[new_capacity]; // 2. larger포인터에 new value_type 연결
	copy(data, data+used, larget_array); // 3. 포인터에 값 카피
	delete[] data; // 4. 기존 데이터 삭제
	data = larger_array; // 5. 이전 포인터를 larger포인터로 바꿈
	capacity = new_capacity; // 6. 용량 늘리기 //
}
```

- 배열 요소를 더 늘리고 싶다 → 더 큰 값을 받는다
- 신중하게 capacity와 new_capacity를 비교 → 실수 방지 체크
- new-capacity가 더 작은 값으로 바꿀 수 있기 때문에 used보다 더 작으면 안되기 때문에 used와 똑같이 해놓고
- larger_array를 새로 만들어서 카피해주고
- 무사히 lager_array로 옮겼으니 기존거 삭제하고 바꿔주면 데이터가 옮겨지고 용량이 바뀐다.

<br />

# Insert function

```cpp
void bag::insert(const value_type& entry)
{
	if (used == capacity)
		reserve(used+1); // 용량 늘리고

	data[used] = entry; // 할당
	++used;		 // 크기 늘리고
}
```

- static bag의 경우 capacity가 넘치면 끝내는 수밖에 없었는데
- insert function에서는 늘려줄 수도 있음 → 더 유연성이 있는 코드.

<br />

# += operator

```cpp
void bag::operator +=(const bag& addend)
{
	if(used + addend.used > capacity) reserve(used + addend.used); // 용량 늘리고

	copy(addend.data, addend.data+addend.used, data+used); // 카피(마지막 포인터 맨뒤)
	used += addend.used; // 크기 늘리고
}
```

<br />

# + operator

- c = a + b 이걸 하고싶은것(a와 b가 몇 개 차지하고 있는지 used를 리턴할 것)
- 더하기는 a에 있는 원소와 b에 있는 원소를 다 c에다 카피해야 함
- 리턴 타입이 bag으로 리턴할 것
- answer라는 bag을 만듦. 사이즈는 두 개 사이즈 더한 사이즈로.

```cpp
bag operator + (const bag& b1, const bag& b2)
{
	bag answer(b1.size() + b2.size());

	answer += b1;
	answer += b2;

	return answer;
}
```

<br />

# Dynamic memory member variable

should be provided:

- Destructor
- Copy constructor
- Overloaded assignment operator

<br />

- destructor를 미리 만들어두지 않으면 메모리 낭비가 되니까 메모리 해제를 해줘야 한다.
- 얕은 복사 유의
- copy하지 않고 바로 링크시켜버리면 문제가 생기니 유의
