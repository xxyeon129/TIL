# Software 개발 단계

**Program = Data Structures + Algorithm**

- Data Structure: Organize collections of data
- Algorithm: A set of instructions for solving problem

1. Specification of the task

2. Design of a solution

3. Implementation (coding) of the solution

4. Analysis of the solution

5. Testing & Debugging

6. Maintenance and the evolution of the system

7. Obsolescence

# Preconditions & Postconditions

`Precondition`: indicates what must be true (함수가 호출되기 전)

`Postcondition`: indicates what will be true (함수 호출 완료 후 → 어떤 일을 해냈는지)

- 주석으로 나타냄
- 주로 함수 매개변수 뒤에 배치
- 함수를 **호출하는** 프로그래머는 전제 조건이 유효한지 확인할 책임이 있음

**The assert function (described in Section 1.1) is useful for detecting violations of a precondition.**
