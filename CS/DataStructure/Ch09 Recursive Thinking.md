# Recursive Functions

```cpp
void write_vertical(unsigned int number) {
     if (number < 10)
         cout << number << endl;
     else {
         write_vertical(  number / 10 ) ;
         cout <<  number % 10 << endl;
     }
}
```

```cpp
void super_write_vertical(int number) {
    if (number < 0){  
		    cout << ‘-’ << endl;
       super_write_vertical(abs(number)); 
    } else if (number < 10) {
       cout << number << endl;
    } else {  
	    super_write_vertical( number /10 ) ;
      cout <<  number % 10 << endl ;
    }
}
```

## Activation Record for a function

1. memory block이 실행의 current state를 저장함
2. 각 함수가 호출될 때마다, `activation record`가 생기고 and **스택에 쌓임**
3. **`the return location`**을 contain함 (done with computation됐을 때 어디서 함수가 리턴되어야 하는지 구체화하는)
4. 함수의 local variables와 parameters를 가지고 있는 values를 포함하고 있음

local variables와 parameters를 가지고 있어야 함 저장을 계속 하고 있어야함 → 재귀를 사용하면 메모리를 많이 먹음