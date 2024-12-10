# 01 SQL 데이터 정의문(DDL)

> [!NOTE]
>
> - **데이터 정의**
>   - 테이블 생성: `CREATE TABLE`
>   - 테이블 변경: `ALTER TABLE`
>   - 테이블 삭제: `DROP TABLE`
>   - 뷰 생성: `CREATE VIEW`
>   - 뷰 삭제: `DROP VIEW`
> - **데이터 조작**
>   - 데이터 검색: `SELECT`
>   - 데이터 삽입: `INSERT`
>   - 데이터 수정: `UPDATE`
>   - 데이터 삭제: `DELETE`
> - **데이터 제어**
> - **삽입 SQL**

## ✅ 테이블 생성 CREATE문

```sql
CREATE TABLE 테이블_이름
 ({ 열_이름 데이터_유형 [NULL|NOT NULL] [DEFAULT 기본_값], }+
   [PRIMARY KEY (열_이름_리스트),] // 기본키
	 { [UNIQUE (열_이름_리스트),] }* // 대체키(NULL값 허용, 중복은X)
	 { [FOREIGN KEY (열_이름_리스트)] REFERENCES 테이블_이름 (열_이름_리스트),] }* // 외래키
 );
```

- `[]`의 내용은 생략이 가능
- 대소문자를 구분하지 않음
  - 작은 따옴표로 묶인 문자열은 대소문자 구분
- 문자형:
  - `CHAR(길이)`: 고정길이 문자열, 남은 공간은 공백으로 채움
  - `VARCHAR(길이)`: 가변길이 문자열, 남는 공간 없음
  - `TEXT`: 긴 문자열(255자 이상)
- 정수형:
  - `INT`: 소수점이 없는 기본 정수형
  - `SMALLINT`: 소수점이 없는 작은 정수형
- 실수형
  - `DECIMAL`(전체길이, 소수점 이하 길이): 고정 소수점을 포함한 실수
  - `FLOAT`(전체길이, 소수점 이하 길이): 단정도 부동 소수점 실수
  - `DOUBLE`(전체길이, 소수점 이하 길이): 배정도 부동 소수점 실수
- 날짜형:
  - `DATE`: 날짜(연도-월-일)
  - `DATETIME`: 날짜시간(연도-월-일 시:분:초)
  - `TIME`: 시간(시:분:초)
  - `YEAR`: 날짜(연도)

### ✔️ FOREIGN KEY

- 참조 무결성 제약조건 유지를 위해 → 참조되는 테이블에서 투플 삭제 시 처리방법 지정하는 옵션
  - `ON DELETE NO ACTION`: 투플을 삭제하지 못하게 함
  - `ON DELETE CASCADE`: 관련 투플을 함께 삭제
  - `ON DELETE SET NULL`: 관련 투플의 외래키 값을 NULL로 변경
  - `ON DELETE SET DEFAULT`: 관련 투플의 외래키 값을 미리 지정한 기본값으로 변경

```sql
FOREIGN KEY(소속부서) REFERENCES 부서(부서번호) ON DELETE CASCADE ON UPDATE CASCADE
```

### ✔️ CONSTRAINT, CHECK

테이블에 정확하고 유효한 데이터를 유지하기 위해 특정 속성에 대한 제약조건 지정

```sql
CHECK(재고량 >= 0 AND 재고량 <= 10000)

CONSTRAINT CHK_CPY CHECK(제조업체='한빛제과')

// 재고량이 항상 0개 이상 10,000개 이하 유지하도록 제품 테이블 생성
CREATE TABLE 제품
	(제품번호 CHAR(3) NOT NULL,
	제품명 VARCHAR(20),
	재고량 INT,
	단가 INT,
	제조업체 VARCHAR(20),
	PRIMARY KEY (제품번호)
	CHECK (재고량 >= 0 AND 재고량 <= 10000)
);
```

### ✔️ 테이블 생성

```sql
CREATE TABLE 과목
	(과목번호 CHAR(4) NOT NULL PRIMARY KEY,
	 이름 VARCHAR(20) NOT NULL,
	 강의실 CHAR(5) NOT NULL,
	 개설학과 VARCHAR(20) DEFAULT '미정',
	 시수 INT NOT NULL);

// 학번, 과목번호 조합 기본키 / 휴대폰번호 대체키/ 학번, 과목번호 외래키
CREATE TABLE 수강
	(학번 CHAR(6) NOT NULL,
	 휴대폰번호 CHAR(13) NULL,
	 과목번호 CHAR(4) NOT NULL,
	 신청날짜 DATE NOT NULL,
	 중간성적 INT NOT NULL DEFAULT 0,
	 기말성적 INT NOT NULL DEFAULT 0,
	 평가학점 CHAR(1) NOT NULL,
	 PRIMARY KEY (학번,과목번호),
	 UNIQUE (휴대폰번호),
	 FOREIGN KEY(학번) REFERENCES 학생(학번),
	 FOREIGN KEY(과목번호) REFERENCE 과목(과목번호));

// 테이블 생성 확인
DESC 수강;

CREATE TABLE 주문
 (주문번호 CHAR(3) NOT NULL,
 주문고객 CHAR(20),
 주문제품 CHAR(3),
 수량 INT,
 배송지 VARCHAR(30),
 주문일자 DATE,
 PRIMARY KEY (주문번호),
 FOREIGN KEY (주문고객) REFERENCES 고객(고객아이디),
 FOREIGN KEY (주문제품) REFERENCES 제품(제품번호),
);
```

## ✅ 테이블 수정 ALTER 문

```sql
ALTER TABLE 테이블_이름
	{ [ADD | MODIFY] 열_이름 데이터_유형 [NULL | NOT NULL] [DEFAULT 기본_값]}
	| {ADD CONSTRAINT 제약조건_이름 제약조건_상세내용}
	| {DROP COLUMN 열_이름}
	| {DROP CONSTRAINT 제약조건_이름};
```

```sql
// 학생 테이블에 새로운 '등록날짜' 열 추가
ALTER TABLE 학생
	ADD 등록날짜 DATETIME NOT NULL DEFAULT '2024-10-18';

// 학생 테이블의 '등록날짜' 열 삭제
ALTER TABLE 학생
	DROP COLUMN 등록날짜;
```

## ✅ 테이블 삭제 DROP문

```sql
DROP TABLE 테이블_이름;
```

- 참조(자식) 테이블을 삭제한 후 테이블 삭제 가능

<br />

# 02 SQL 데이터 제어문**(DCL)**

## ✅ 사용자 및 권한 관리

### ✔️ 계정 생성: `CREATE USER`

```sql
CREATE USER 사용자_계정 IDENTIFIED BY '비밀번호';
```

```sql
CREATE USER 'user1'@'127.1.1.1' IDENTIFIED BY '1111';
CREATE USER 'user2'@'localhost' IDENTIFIED BY '2222';
CREATE USER 'user3'@'%' IDENTIFIED BY '3333';
CREATE USER 'manager'@'%' IDENTIFIED BY '1234';

// 생성된 사용자 계정 정보 확인
SELECT host, user
FROM mysql.user;

// 현재 MySQL 사용자 표시
SELECT user();
```

### ✔️ 권한 부여: GRANT

```sql
GRANT 권한_내용 ON 권한_대상 TO 사용자_계정;
GRANT 권한_내용 ON 권한_대상 TO 사용자_계정 WITH GRANT OPTION;
```

```sql
GRANT INSERT, UPDATE, DELETE ON univDB.* TO 'user1'@'127.1.1.1';
GRANT ALL ON *.* TO 'user3'@'%' WITH GRANT OPTION;
GRANT SELECT ON univDB.학생 TO 'user2'@'localhost';
GRANT UPDATE(점수) ON 수강 TO 홍길동

// 사용자 계정의 권한 확인
SHOW GRANTS FOR 'user1'@'127.1.1.1'; -- user1 사용자의 권한 표시
SHOW GRANTS; -- 현재 접속 사용자의 권한 표시
```

### ✔️ 권한 철회: REVOKE

```sql
REVOKE 권한_내용 ON 권한_대상 FROM 사용자_계정;
```

```sql
REVOKE DELETE ON univDB.* FROM 'user1'@'127.1.1.1';
```

### ✔️ 계정 삭제: DROP USER

```sql
DROP USER 사용자_계정
```

```sql
DROP USER 'user1'@'127.1.1.1';
```

<br />

# 03 뷰 view

실제 데이터를 저장하지 않는 **가상 테이블(virtual table)**

- 뷰에 대해 사용자가 질의를 요청할 때 비로소 DBMS는 뷰 정의를 참조하여 질의를 수행하고 그 결과를 사용자에게 반환
- 주로 기반 테이블로부터 정의되지만, 또 다른 뷰를 기반으로도 정의될 수 있음

## ✅ 뷰의 장점

1. **편의성:** 질의문 작성이 쉽고 간단해진다.
   - GROUP BY, 집계함수, 조인 등을 이용해 미리 뷰를 만들어 놓으면, 복잡한 SQL문 대신 SELECT, FROM 절만으로 원하는 데이터 검색이 가능
   - 제공된 뷰와 관련이 없는 다른 내용에 대해 사용자가 신경 쓸 필요가 없음
2. **보안성:** 데이터 보안 유지가 쉽다.
   - 자신에게 제공된 뷰를 통해서만 데이터에 접근하도록 권한 설정이 가능
   - 데이터의 접근을 쉽게 제어하게 함으로써 보안을 제공한다.
3. **재사용성**: 반복되는 질의문 작성에 효율적이다.
4. **독립성**: 스키마 변경에도 뷰 질의문은 변경할 필요가 없다.

## ✅ 뷰 생성: CREATE VIEW 문

```sql
CREATE VIEW 뷰_이름[(속성_리스트)]
AS SELECT 문
[WITH CHECK OPTION];

// 뷰 생성 확인
SELECT *
FROM 뷰_이름
```

- 속성 리스트를 생략하면 `SELECT`절에 나열된 속성 이름을 그대로 사용
- `SELECT`문에 `ORDER BY`는 사용 불가(오라클과 같은 일부 DBMS에서는 허용하기도 함)
- `WITH CHECK OPTION`: (생성된) 뷰에 삽입/수정 연산을 할 때 SELECT문에서 제시한 뷰의 정의 조건을 위반하면 수행되지 않도록 하는 제약조건을 지정

```sql
// 고객 테이블에서 등급이 vip인 고객의 고객아이디, 고객이름, 나이, 등급으로 구성된 뷰를
// 우수고객이라는 이름으로 생성
CREATE VIEW 우수고객(고객아이디, 고객이름, 나이, 등급)
AS SELECT 고객아이디, 고객이름, 나이, 등급
	 FROM 고객
	 WHERE 등급='vip'
WITH CHECK OPTION; // 뷰가 생성된 후 우수고객 뷰에 'vip' 등급이 아닌 데이터 삽입하면 실행 거부

// 제품 테이블에서 제조업체별 제품수로 구성된 뷰를
// 업체별제품수라는 이름으로 생성
CREATE VIEW 업체별제품수(제조업체, 제품수)
AS SELECT 제조업체, COUNT(*)
   FROM 제품
   GROUP BY 제조업체
WITH CHECK OPTION;

// 3학년 혹은 4학년 학생의 학생이름, 나이, 성, 학년으로 구성된 뷰를
// 'V1_고학년학생'이라는 이름으로 설정
CREATE VIEW V1_고학년학생(학생이름, 나이, 성, 학년)
AS SELECT 이름, 나이, 성별, 학년
	 FROM 학생
	 WHERE 학년>=3 AND 학년<=4;
WITH CHECK OPTION;

// 각 과목별 과목번호, 강의실, 수강 인원수로 구성된 뷰를 'V2_과목수강현황' 이름으로 생성
// 과목별로 강의실이 동일하다고 가정
CREATE VIEW V2_과목수강현황(과목번호, 강의실, 수강 인원수)
AS SELECT 과목.과목번호, 강의실, COUNT(과목.과목번호)
   FROM 과목 JOIN 수강 ON 과목.과목번호 = 수강.과목번호
   GROUP BY 과목.과목번호
WITH CHECK OPTION;

// 'V1_고학년학생' 뷰를 기반으로 여학생만으로 구성된 뷰를 'V3_고학년여학생' 이름으로 생성
CREATE VIEW V3_고학년여학생
AS SELECT *
   FROM V1_고학년학생
   WHERE 성별='여'
WITH CHECK OPTION;
```

## ✅ 뷰 활용: SELECT 문

일반 테이블과 같은 방법으로 원하는 데이터 검색 가능

- 뷰에 대한 SELECT문이 내부적으로는 기본 테이블에 대한 SELECT문으로 변환되어 수행
- 검색 연산은 모든 뷰에 수행 가능

```sql
// 우수고객 뷰에서 나이가 20세 이상인 고객에 대한 모든 내용 검색
SELECT *
FROM 우수고객
WHERE 나이>=20;

// V2_과목수강현황 뷰에서 수강생 인원이 가장 많은 과목과 가장 적은 과목에 대한
// 과목번호, 강의실, 수강인원수 정보를 검색
SELECT 과목번호, 강의실, 수강인원수
FROM V2_과목수강현황
WHERE 수강인원수=(SELECT MAX(수강인원수)
									FROM V2_과목수강현황)
			OR 수강인원수=(SELECT MIN(수강인원수)
									FROM V2_과목수강현황);
```

## ✅ 뷰 활용: INSERT, UPDATE, DELETE 문

- **실제로 기본 테이블에 수행**되므로 결과적으로는 **기본 테이블이 변경됨**
- 변경이 가능한 뷰가 있고, 변경이 불가능한 뷰가 있다
- **변경 불가능한 뷰의 특징**
  - 기본 테이블의 **기본키**를 구성하는 속성이 포함되어 있지 **않은** 뷰
  - 기본 테이블에서 **NOT NULL**로 지정된 속성이 포함되어 있지 **않은** 뷰
  - 기본 테이블에 **있던 내용이 아닌** **집계 함수로 새로 계산된 내용**을 포함하는 뷰
  - **DISTINCT 키워드**를 포함하여 정의한 뷰
  - **GROUP BY 절**을 포함하여 정의한 뷰
    - **여러 개의 테이블을 조인하여 정의한 뷰**는 변경이 불가능한 경우가 많음

```sql
// 변경 가능한 뷰
CREATE VIEW 제품1
AS SELECT 제품번호, 재고량, 제조업체
FROM 제품
WITH CHECK OPTION;

// 변경 불가능한 뷰 -> 삽입연산 실패
// 기본키인 제품번호 속성을 포함하고 있지 않음
CREATE VIEW 제품2
AS SELECT 제품명, 재고량, 제조업체
   FROM 제품
WITH CHECK OPTION;
```

### ✔️ INSERT

```sql
// 제품번호가 p08, 재고량이 1000, 제조업체가 신선식품인 새로운 제품의 정보를
// 제품1 뷰에 삽입
INSERT INTO 제품1(제품번호, 재고량, 제조업체)
VALUES ('p08', 1000, '신선식품');
```

## ✅ 뷰 삭제: DROP VIEW 문

```sql
DROP VIEW 뷰_이름;

// 확인
SHOW TABLES;
```

- 뷰를 삭제해도 기본 테이블은 영향을 받지 않음
- 삭제할 뷰를 참조하는 제약조건이 존재한다면
  - → 뷰 삭제가 수행되지 않음
  - 관련된 제약조건을 먼저 삭제해야 함
  - ex. 삭제할 뷰를 이용해 만들어진 다른 뷰가 존재하는 경우
