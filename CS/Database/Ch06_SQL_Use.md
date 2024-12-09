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
