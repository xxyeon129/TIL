# Ch04. 클래스와 객체

<br />

# 객체지향 프로그래밍

## ✅ 객체지향의 특징

캡슐화, 추상화, 상속 및 다형성

### 캡슐화(encapsulation)

데이터와 해당 데이터를 처리하는 메서드를 하나로 묶는 것

- 객체 내부 보호: 데이터를 외부에서 직접 접근하거나 조작하지 못하도록 제어
- 데이터의 유효성을 유지하고 객체 내부 구현을 숨기는 데 도움을 줌
- class 내부에 data members + mehods(behavior)와 같은 멤버를 보호

### 정보 은닉 (information hiding)

불필요한 정보나 내부 구현 세부 사항을 외부에서 볼 수 없도록 숨기는 것을 의미

### 상속

클래스(부모 클래스)로부터 새로운 클래스(자식 클래스)를 생성할 수 있다.

### 다형성

동일한 이름의 동작이라고 해도, 객체의 실제 타입에 따라 동작의 내용이 달라질 수 있다.

### 추상화 (abstraction)

완전하지 않은 클래스나 메서드를 정의할 때 사용하는 개념

- 추상 메서드는 구현이 되어 있지 않고, 이를 상속받는 구체적인 클래스에서 구현

```java
abstract class CoffeeMachine {
	String brand;
	public void start() {
		System.out.println(brand + " coffee machine is starting.");
	}
	// 추상 메서드 - 구현은 자식 클래스에서 필요함
	public abstract void makeCoffee();
}

// 추상 클래스를 상속 받는 클래스
class EspressoMachine  extends CoffeeMachine {
	// 추상 메서드를 구체적으로 구현
	public void makeCoffee() {
		System.out.println("Making an espresso.")
	}
}
```

<br />

# 클래스

## ✅ 클래스 (class)

**객체들을 찍어내는 형틀(template)**

- 인스턴스가 가질 필드(속성; attributes)와 메서드 정의
- field + method

```java
class Car {
	// fields (attributes; 속성)
	String brand;
	int speed;

	// Constructor; 생성자
	Car(String brand, int speed) {
		this.brand = brand;
		this.speed = speed;
	}

	// method (behavior)
	void accelerate() {
		speed += 10;
		System.out.println(brand + " is accelerating. Speed: " + speed);
	}
}
```

```java
public class Circle {
	public int radius;
	public String color;

	public double getArea() {
		return 3.14 * radius * radius;
	}
}
```

## ✅ **인스턴스(instance)**

**클래스를 기반으로 생성된 특정 객체**

- 클래스에서 정의한 필드(속성; attributes)와 메서드 사용
- 하나의 클래스로 여러 개의 인스턴스를 찍어내지만, 인스턴스마다 필드(속성; attributes)의 값은 다르다.

```java
public class Main {
	public static void main(String[] args) {
		// Creating instances of the Car class
		Car myCar = new Car("현대", 50);
		Car yourCar = new Car("기아", 60);

		// Interacting with the instances
		myCar.accelerate(); // "현대 is accelerating. Speed: 60"
		yourCar.accelerate(); // "기아 is accelerating. Speed: 70"
	}
}
```

```java
public class CircleTest {
	public static void main(String[] args) {
		// 1. 참조 변수 선언
		Circle obj;
		// 2. new 연산자를 사용해 객체 생성, 객체의 참조값을 참조 변수에 저장
		obj = new Circle();
		// Circle obj = new Circle();

		// 객체의 필드와 메소드를 사용
		obj.radius = 100;
		obj.color = "blue";

		double area = obj.getArea();
		System.out.println("원의 면적 = " + area);
	}
}
```

<br />

# 메소드 오버로딩

동일한 메소드 이름을 가지지만, 매개변수의 타입, 개수, 순서가 다른 메소드를 여러 개 정의하는 것을 의미한다.

- 반드시 메소드 매개변수가 달라야 한다.

```java
public class MyMath {
	int add(int x, int y) { return x+y; }
	int add(int x, int y, int z) { return x+y+z; }
	int add(int x, int y, int z, int w) { return x+y+z+w; }

	public static void main(String[] args) {
		MyMath obj;
		obj = new MyMath();

		System.out.print(obj.add(10, 20) + " "); // 30
		System.out.print(obj.add(10, 20, 30) + " "); // 60
		System.out.print(obj.add(10, 20, 30, 40) + " "); // 100
	}
}
```

<br />

# 생성자 (constructor)

객체가 생성될 때 호출되어 **객체의 초기 상태를 설정**하는 특별한 메소드

- 클래스의 인스턴스가 생성될 때 자동 실행, 주로 객체의 필드 초기화를 담당
- 클래스 이름과 동일한 이름을 가짐
- 반환 타입이 없음 (void도 명시하지 않음)
- 생성자는 오버로딩이 가능

```java
class Pizza {
	int size;
	String type;

	public Pizza() {
		size = 12;
		type = "슈퍼스프림";
	}

	public Pizza(int s, String t) {
		size = s;
		type = t;
	}
}

public class PizzaTest {
	public static void main(String[] args) {
		Pizza obj1 = new Pizza();
		System.out.println("("+obj1.type+", "+obj1.size+",)"); // (슈퍼스프림, 12,)

		Pizza obj2 = new Pizza(24, "포테이토");
		System.out.println("("+obj2.type+", "+obj2.size+",)"); // (포테이토, 24,)
	}
}
```

```java
class Television {
	private int channel;
	private int volume;
	private boolean onOff;

	Television(int c, int v, boolean o) {
		channel = c;
		volume = v;
		onOff = o;
	}

	void print() {
		System.out.println("채널은 "+ channel + "이고 볼륨은 " + volume + "입니다.")
	}
}

public class TelevisionTest {
	public static void main(String[] args) {
		Television myTv = new Television(7, 10, true);
		myTv.print(); // 채널은 7이고 볼륨은 10입니다.

		Television yourTv = new Television(11, 20, true);
		yourTv.print(); // 채널은 11이고 볼륨은 20입니다.
	}
}
```

## ✅ 기본 생성자 (default constructor)

매개 변수가 없는 생성자

개발자가 생성자를 하나도 정의하지 않으면 자바 컴파일러가 기본 생성자를 자동으로 만든다.

## ✅ this 참조 변수

- `this`: 현재 객체 자신을 가리키는 참조변수
- 생성자에서 매개 변수 이름과 필드 이름이 동일한 경우에 혼동을 막기 위해 사용한다.

```java
public class Circle {
	int radius;

	public Circle(int radius) {
		// this.radius는 필드이고 radius는 매개변수라는 것을 알 수 있음
		this.radius = radius;
	}

	double getArea() {
		return 3.14*radius*radius;
	}
}
```

<br />

# 접근 제어

## ✅ 접근자와 설정자

`private` 필드값을 반환하는 접근자(`getters`), 필드값을 설정하는 설정자(`setters`)이다.

접근자와 설정자 메소드만을 통해 필드에 접근해야 한다.

```java
class Account {
	private int regNumber;
	private String name;
	private int balance;

	public String getName() { return name; }
	public void setName(String name) { this.name = name; }
	public int getBalance() { return balance; }
	public void setBalance(int balance) { this.balance = balance; }
}

public class AccountTest {
	public static void main(String[] args) {
		Account obj = new Account();
		obj.setName("Tom");
		obj.setBalance(100000);
		System.out.println("이름은 " + obj.getName() + "통장 잔고는 " + obj.getBalance() + "입니다.")
		// 이름은 Tom 통장 잔고는 100000입니다.
	}
}
```