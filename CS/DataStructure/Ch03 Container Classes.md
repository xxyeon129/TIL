- A bag can be put in its initial state, which is an empty bag

```cpp
class bag
{
	public:
		bag();
		void insert();
		void remove();
	private:
		...
}
```

- count how many integers are in the bag

```cpp
# include <cstdlib>
std::size_t bag::size() const {}
```

- count how many copies of a number

```cpp
std::size_t bag::occurrences(int target) const {}
```

# Header File & Implementation File

- .h → documentation & class definition
  - documentation → prototype, specifications(precondition, postcondition)
- .cxx → implementations of the bag’s member function

# Container Class

```cpp
class bag
{
	public:
		static const size_t CAPACITY = 20;
		...
	private:
		int data[CAPACITY];
		size_t used;
}
```

# Insert

```cpp
typedef int value_type;

void bag::insert(const value_type& entry)
{
	assert(size() < CAPACITY);
	data[used++] = entry;
}
```

# erase_one

```cpp
bool bag::erase_one (const value_type& target)
{
	size_type index = 0;

	while((index < used) && (data[index] != target))
		++index;

	if (index == used)
		return false;

	--used;

	data[index] = data[used];
	return true;
}
```

# operator +=

```cpp
void bag::operator +=(const bag& addend)
{
	assert(size() + addend.size() <= CAPACITY);

	copy(addend.data, addend.data+addend.used, data+used);
	// 1. Beginning location
	// 2. Ending location -> Not Copied!
	// 3, Destination

	used += addend.used;
}
```
