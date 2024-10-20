# 01 관계 대수(집합, 관계, 확장) 연산

## 관계 대수(relational algebra)

- **릴레이션을 내부적으로 처리하기 위한 연산(operation)**들의 집합
  - 관계형 데이터 모델의 이론적 언어
  - SQL DB 언어의 이론적 토대 제공
- **릴레이션**에 적용되는 여러 연산들을 포함
  - 모든 연산의 적용 대상도 릴레이션이고, 연산 결과도 릴레이션임
  - 한 개 이상의 입력 릴레이션으로부터 → 하나의 새로운 결과 릴레이션 생성
- **관계 대수 연산의 종류**
  - 집합 연산(합집합, 교집합, 차집합, 카티션 프로덕트)
  - 관계 연산(셀렉트, 프로젝트, 조인, 디비전)

<br />

## ✅ 집합 연산(set operation)

- 릴레이션을 투플 집합 또는 속성 집합으로 간주해 이를 처리하는 연산 그룹
- 일반적인 수학의 집합 연산과 의미, 기능이 같음
- 합집합, 교집합, 차집합 연산: **두 입력 릴레이션 조건 만족 시 합병 가능**
  - 두 릴레이션의 차수(속성 개수)가 같음
  - 대응하는 속성의 순서, 도메인이 같음
  - 속성 이름은 서로 달라도 됨(결과 릴레이션 속성 이름은 첫번째 릴레이션)

### 합집합(union)

두 개의 릴레이션을 합병해 하나의 릴레이션을 반환

릴레이션 R1 또는 R2에 속하는 모든 투플들로 구성된 릴레이션

### 교집합(intersect)

두 개의 릴레이션 동시에 속하는 공통 투플로만 구성된 릴레이션

### 차집합(difference)

첫 번째 릴레이션에 속하지만 두 번째 릴레이션에 속하지 않는 투플로만 구성된 릴레이션

### 카티션 프로덕트(cartesian product)

두 릴레이션의 **모든 투플을 수평으로 결합**하는 연산

**R1과 R2 투플들의 모든 조합**으로 구성된 결과 릴레이션을 반환

- 두 릴레이션의 기계적인 조합을 만들기 때문에, 그 자체보다는 추가적으로 다른 관계대수 연산을 조합할 때 유용함

| 적용 연산       | 구분       | 결과 릴레이션의 값                                                                                   |
| --------------- | ---------- | ---------------------------------------------------------------------------------------------------- |
| 합집합          | 차수       | R1 또는 R2 차수와 같다                                                                               |
|                 | 카디널리티 | R1과 R2 카디널리티를 더한 값과 같거나 적다                                                           |
| 교집합          | 차수       | R1 또는 R2 차수와 같다                                                                               |
|                 | 카디널리티 | R1(카디널리티 값이 R1<R2인 경우) 혹은 R2(카디널리티 값이 R2<R1인 경우) 카디널리티 값보다 작거나 같다 |
| 차집합          | 차수       | R1 또는 R2 차수와 같다                                                                               |
|                 | 카디널리티 | R1(R1-R2인 경우) 또는 R2(R2-R1) 카디널리티 값보다 작거나 같다                                        |
| 카티션 프로덕트 | 차수       | R1과 R2 차수를 더한 값과 같다                                                                        |
|                 | 카디널리티 | R1과 R2 카디널리티를 곱한 값과 같다                                                                  |

<br />

## ✅ 관계 연산(relation operation)

- 릴레이션의 구조적 특성에 기반을 둔 연산을 포함
- 관계형 데이터 모델을 위해 고안된 연산들
- 관계 연산의 종류: 셀렉트, 프로젝트, 조인, 디비전

### 1️⃣ 셀렉트(σ)

릴레이션에서 선택\_조건식을 만족하는 특정 투플만을 추출하는 연산

- 연산자는 ‘σ’(시그마, sigma)를 사용
- 단항 연산(unary operation)
- 셀렉트 연산 **`σ선택_조건식(R)`**이 반환하는 것은 릴레이션 R의 투플 중 선택\_조건식을 만족하는 투플로만 구성된 릴레이션
- 릴레이션을 **수평 분할**하는 효과
  - 결과 릴레이션은 연산 대상 릴레이션의 수평적 부분집합

```sql
σ중간성적<기말성적(성적)
σ등급='gold'(고객) // 고객 where 등급='gold'
σ등급='gold'∧적립금≥2000(고객) // 고객 where 등급='gold' and 적립금 ≥ 2000
```

### 2️⃣ 프로젝트(**Π**)

릴레이션에서 특정 속성을 추출하는 연산

- 연산자는 ‘Π’(파이, pi)를 사용
- 단항 연산
- 프로젝트 연산 **`Π속성_리스트(R)`**가 반환하는 것은 릴레이션 R에 속한 속성 중에서 속성\_리스트의 속성으로만 구성된 릴레이션
- 릴레이션을 **수직 분할**하는 효과
  - 결과 릴레이션은 연산 대상 릴레이션의 수직적 부분집합
- 결과 릴레이션에서 동일한 투플은 중복되지 않고 한 번만 나타남(ex. 등급만 가져올 경우 중복되는 등급이 있을 때 하나만 가져옴)

```sql
Π이름,성별,학년(학생1)
Π고객이름,등급(고객) // 고객[고객이름,등급]
```

### 3️⃣ 조인(⋈)

두 릴레이션의 공통 속성을 기준으로 조인 조건을 만족하는 투플을 수평으로 결합하는 연산

- 두 릴레이션의 관련 투플들을 결합하기 위해 사용
  - 두 릴레이션의 관련 투플을 조합하여 하나의 릴레이션으로 구성
- **`R1⋈조인_조건식R2`**가 반환하는 것은 첫 번째 릴레이션 R1의 각 투플에 대해 두 번째 릴레이션 R2의 모든 투플을 앞뒤로 반복하여 연결한 투플 조합 중 조인\_조건식을 만족하는 투플만으로 구성된 결과 릴레이션

```sql
**학생1⋈**학생1.학번=수강1.학번 **수강1**
// 어느 릴레이션의 소속인지 구분하기 위해 '릴레이션.속성이름' 형식 표기
```

### 세타 조인(theta join)

- `조인_조건식`에 6개의 θ(theta) 비교\_연산자(`=`, `≠`, `<`, `≤`, `>`, `≥`) 중 하나를 사용하는 조인
- 릴레이션 R1의 조인*속성을 a1, 릴레이션 R2의 조인*속성을 a2라고 할 때
  - R1⋈a1=a2R2
  - R1⋈a1≠a2R2
  - R1⋈a1<a2R2
  - R1⋈a1≤a2R2
  - R1⋈a1>a2R2
  - R1⋈a1≥a2R2

### 동등 조인(equijoin)

- `조인_조건식`에 `=`, `비교_연산자`를 사용하는 **세타 조인**
- 6개의 세타 조인 비교\_연산자 중에서 가장 많이 사용하는 `=`를 사용한 조인
- 보통 말하는 조인 연산이 동등 조인

```sql
**학생1⋈**학생1.학번=수강2.학번 **수강2**
```

### 자연 조인(natural join)

- 동등 조인 결과 중에서 `조인_조건식`에 사용된 중복 속성을 자동 제거한 조인
- 동등 조인의 결과 릴레이션에서 **중복 속성이 두 번 나오지 않도록 이를 제거한 결과 반환**
- 연산자는 `⋈N` 사용
- **동등 조인**이면서 **세타 조인**이기도 함

```sql
학생1⋈N(학생1.학번,수강2.학번)수강2
```

### 4️⃣ 디비전

특정 값들을 모두 가지고 있는 투플을 찾는 연산

- 디비전 `R1÷R2`가 반환하는 것은 R2의 모든 투플에 연관된 R1의 투플 중에서 R2에 속한 속성을 제외한 **나머지 속성 값만으로 구성된 릴레이션** 반환
- R1에서 R2의 모든 투플을 포함한 투플의 나머지 속성들로 결과 릴레이션 구성
- 릴레이션 R1이 릴레이션 R2의 모든 속성을 포함하고 있어야 가능

## ✅ 관계 연산의 기능

- **기본 연산(primitive operation)**
  - 다음 5개의 연산은 필수 연산으로, 다른 연산으로 대체될 수 없음
  - ∪(합집합), −(차집합), ×(카티션 프로덕트), σ(셀렉트), Π(프로젝트)
- 복합 연산 (composite operation)
  - 다음 3개의 연산은 기본 연산을 이용하여 대체할 수 있음
  - ∩(교집합), ⋈(조인), ÷(디비전)

## ✅ 확장 연산

기존 관계 대수 연산을 확장해 추가로 정의

- 자연 조인의 확장된 형태인 **`세미 조인 연산`**, **`외부 조인 연산`**
- 합집합의 확장된 형태인 **`외부 합집합 연산`**

### 1️⃣ 세미 조인 (semijoin)

자연 조인이 반환하는 결과 릴레이션 중 한쪽 릴레이션 속성만으로 한정해 반환하는 제한적 자연 조인 연산

- 연산자는 `⋉` 또는 `⋊`를 사용
- `R1⋉R2`는 R2와의 자연 조인에 참여할 수 있는 R1의 투플만 선택하여 반환
- R2를 조인\_속성으로만 프로젝트한 뒤, 결과 릴레이션을 R1에 다시 자연 조인한 결과와 같음
- **왼쪽 세미 조인 (left semijoin):** 자연 조인 결과 중 왼쪽 릴레이션의 속성만 반환
  ```sql
  학생1⋉(학생1.학번, 수강4.학번)수강4
  ```
- **오른쪽 세미 조인 (right semijoin):** 자연 조인 결과 중 오른쪽 릴레이션의 속성만 반환
  ```sql
  학생1⋊(학생1.학번, 수강4.학번)수강4
  ```

### 2️⃣ 외부 조인 (outer join)

자연 조인 결과에 포함되지 않는, **조인에 실패한 투플까지 모두 포함하도록 확장**한 연산

- 자연 조인의 확장된 형태
- 대응 속성 없이 추가된 투플들은 **NULL값을 채워서 반환**
- 모든 투플을 반환하는 대상 릴레이션의 위치에 따라 분류 → 완전 외부 조인, 왼쪽 외부 조인, 오른쪽 외부 조인
- **완전 외부 조인(full outer join):** 모든 투플을 빠짐없이 조인 결과에 포함하도록 대응
  ```sql
  학생1⟗(학생1.학번,수강4.학번)수강4
  ```
- **왼쪽 외부 조인(left outer join):** 왼쪽 릴레이션의 모든 투플을 빠짐없이 조인 결과에 포함하도록 대응
  ```sql
  학생1⟕(학생1.학번,수강4.학번)수강4
  ```
- 오른쪽 외부 조인(right outer join): 오른쪽 릴레이션의 모든 투플을 빠짐없이 조인 결과에 포함하도록 대응
  ```sql
  학생1⟖(학생1.학번,수강4.학번)수강4
  ```

### 3️⃣ 외부 합집합(outer union)

**합병 가능하지 않은**(부분적으로만 합병 가능한) 두 릴레이션의 투플을 합병

대응하는 속성이 없는 경우도 NULL값을 채워 모든 투플을 결과 릴레이션에 포함

```sql
학생4 U+ 학생5
```
