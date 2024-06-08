# ☑️ Serial Search

차례로 검색

n size array에서 찾는 아이템이 없다면 n comparison

# ☑️ Binary Search

sort된 상태에서만 서치 가능

(비교범위 시작 인덱스+ 비교 범위 끝 인덱스) / 2

# ☑️ Hashing

array index에 key value를 mappingg

storing하고 retrieving data하는 데 쓰임

같은 index에 다른 keys가 map됐을 경우 Collision 발생 → Open-Address Hashing으로 해

예시:

- int 353을 넣을 경 → Hash Function: `int(key/100) - 1` → 2 인덱스에 353 배치

# ☑️ Open-Address Hashing

data[hash(key)]에 저장하려고 했는데 차 있다면(Collision) 비어있는 다음 인덱스에 저

1. Given a record with key `k`, compute index by a hash function → `hash(key)`
2. If `data[hash(key)]` is empty, then store the record in `data[hash(key)]` and exit
3. Otherwise, check to see if `data[hash(key)+1]` is empty
    - If so, store the record there
    - Otherwise, try `data[hash(key)+2]` and so on

## Open-Address Hashing > The Table Class

- `table`: container of records with operations for inserting, deleting, and locating records
- each table operation is controlled by a **single key field** → key 값을 이용한다
- A **hash table** is a table with a hash function

```cpp
template <class RecordType>
class table {
	public: ...
	private: ...
		RecordType data[CAPACITY];
		std::size_t hash(int key) const;
		...
}
```

## Open-Address Hashing > Public Functions for Table

- Constructor
    - create a new object instance
    - 모든 array component의 key field를 `NEVER_USED`로 설정
    - `used`를 0으로 설정
- Insert(entryRecord)
    - inserts a new record entry into the table
- remove(key)
    - removes a record containing `key` from the table
    - table에 key가 있는 record가 있다면 →  key field를 `PREVIOUSLY_USED`로 설정, and decrement `used` by 1
- is_present(key)
    - test if there is a record containing `key` in the table
- find(key, found, result)
    - finds a record containing `key` in the table
        - If found → `result` will be set to **a copy of the record** and `found` set to **true**
        - O.W. → `found` is **false** and `result` contains a **garbage**.
- size()

## Open-Address Hashing > Private Functions for Table

- hash(key)
    - 키값을 주면 index값을 줘야 함
    - maps keys into indices
- next_index(index)
    - Collision 발생 시 인덱스 다음으로
    - finds the next (circular) index
- find_index(key, found, i)
    - finds the array **index** of a record with a particular key
- never_used(index)
    - returns true if data[index] has **never** been used
- is_vacant(index)
    - return true if data[index] is **not currently** being used

## Open-Address Hashing > Private member variables for Table

- NEVER_USED
    - cell has **never** been used됐다는 constant
- PRIVIOUSLY_USED
    - cell has been used before, but **currently not in use**한 상태라는 걸 알려주는 constant
- used
    - 현재 배열에 저장되어 있는 records의

### How to tell whether an array cell is empty?

key field에 a special value로 설정된 record 저장

### Why use two constants NEVER_USED and PREVIOUSLY_USED?

`not_in_use`만 쓴다면 → 여러 값들이 Collision으로 다음 인덱스에 저장되었을 경우 여기서 collision에 의해 저장된 인덱스 중 앞쪽 인덱스를 삭제하고(해당 위치는 not_in_use가 됨) 뒤쪽 인덱스를 find할 경우 not_in_use를 마주치고 (뒤 인덱스에 있는 값을 find하지 못한 채로) 검색이 중단되게 됨

## ✔️ insert(entry) pseudo-code

new record와 같은 key를 가진 record가 이미 있다면 → old record는 new one으로 replaced

1. find_index(entry.key, already_present, index)
2. if(!already_present)
    1. check that array size < capacity
    2. find the first vacant location at or after hash(entry.key) and set index to that location
    3. ++used
3. data[index] = entry

## ✔️ find_index(key, found, index)

index(hash function의 리턴값인)부터 시작해서 아래 상황일 때까지 서치

1. A record with the key is found
2. A cell with the never_used key is found
3. All cells are examined without success

## ✔️ Hash Functions

1. **Division Hash Functions**
    - 주로 `key % table_size`로 계산
    - good `table_size`는 4k+3 형태의 소수
2. **Mid_Square Hash Functions**
    - `key * key`의 2진법상 middle digits
    - 예시: table size = 256, key = 157
        - 157 * 157 = 2464910(10진수)
        - = 0011000001001001(2진수) → 여기의 middle digits 00000100 → 4
3. **Multiplicative Hash Functions**
    - `a * key (0<a<1)`의 소숫점의 첫번째 few digits를 사용
    - 예시: key = 157, a = 0.0234521
        - 0.0234521*157= 3.6819797 → 여기서 681

## Types of Open-Address Hashing

### 1️⃣ Linear Probing

location hash(key)가 비어있지 않다면 → 비어있는 곳 찾을 때까지 hash(key)+1, hash(key)+2, hash(key)+3, and so on 시도 (in circular fashion)

### 2️⃣ Double Hashing

linear probing의 clustering problem은 삽입 시간이 길어지는 문제가 있음

location hash(key)가 비어있지 않다면 → second hash function(double hasing)을 사용해 step length(앞으로 이동할 거리)를 결정

- **첫 번째 해시 함수 h1(key)**: 주어진 키를 해시 테이블의 인덱스로 변환 (이걸 사용해 삽입 인덱스를 찾음)
    - 예시: int(key/100) - 1
- **두 번째 해시 함수 h2(key):** 충돌이 발생했을 때 이동할 다음 인덱스를 결정. 0을 반환해서는 안됨
    - 예시: int(key/100) + 2

# ☑️ Chained Hashing

각 array component가 하나의 entry보다 더 많이 hold할 수 있음