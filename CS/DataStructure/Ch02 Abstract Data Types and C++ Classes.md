> [!NOTE]
>
> - OOP 언어는 C+, JAVA
> - C언어의 Struct를 확장한 개념
> - `const` → 변경 시 컴파일러에서 잡아줌
> - class 내의 function을 구현할 때는 private 변수 사용 가능
> - `cout` → C언어의 `printf`
> - `endl` → 줄바꿈문자
>
> Dev C++ 최신버전으로 다운로드
>
> - const reference parameter

```c++
class ThinkingCap
{
	public: // member functions
	  void slots(char new_green[], char new_red[]);
		void push_green() const;
		void push_red() const;

	private: // member variables
     char green_string[50];
     char red_string[50];
};
```

- `header file`: class definition
- `implementation file`: implementations of the member functions

- **Class = Data + Member Functions**
- Function's name is preceded by the `class name` and `::`
  -> otherwise C++ won't realize this is a class’s member function.

  ```c++
    void ThinkingCap::slots(char new_green[ ], char new_red[ ])
    {
         ...
    }
  ```

- **Default Argument**
  when a program does not provide an actual argument
  → will be used for an argument
  ```c++
  int date_check(int year, int month=1, int day=1);
  date_check(2000); // date_check(2000,1,1)
  date_check(2000,7); // date_check(2000,7,1)
  ```
- **Value parameter**

  - 실제 인수를 수정하지 않음 (인수의 data size가 작을 경우) (const는 data size 클 경우 수정 X)

  ```c++
  void swap(int a, int b)
  {
  	int temp = a;
  	a = b;
  	b = temp;
  }

  x=1; y=0;
  swap(x,y);
  cout << x << endl; // 1
  cout << y << endl; // 0
  ```

- **Reference parameter**

  - 함수의 본문 내에서 참조 파라미터를 사용하면 → 호출 프로그램에서 인수에 액세스할 수 있음
  - const가 앞에 붙을 경우는 붙이지 않음

  ```c++
  void swap(int& a, int& b)
  {
  	int temp = a
  	a = b;
  	b = temp;
  }

  x=1; y=0;
  swap(x,y);
  cout << x << endl; // 0
  cout << y << endl; // 1
  ```

- Operator Overloading
