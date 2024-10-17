# 01 SQL 개요

SQL(Structured Query Language)

- **관계형 데이터베이스 표준 언어로서 가장 많이 사용되는 데이터 언어**
- ORACLE, MS SQL-Server, MySQL 등 거의 모든 관계형 DBMS가 지원

### SQL을 구성하는 3가지 부속 언어

- **데이터 정의어(DDL; Data Definition Language)**
    - DB 구조 정의
    - DB 객체 생성/수정/삭제 (테이블, 뷰, 인덱스 등)
- **데이터 조작어(DML; Data Manipulation Language)**
    - DB 데이터 관리
    - 입력/수정/삭제/검색
- **데이터 제어어(DCL; Data Control Language)**
    - DB 관리 및 통제
    - DB 백업/복원
    - 사용자 등록/권한 관리

<br />

# 02 SQL 실습 준비

‘univ’ 데이터베이스 스키마

- 학생(**학번**, 이름, 주소, 학년, 나이, 성별, 휴대폰번호, 소속학과)
- 수강(**학번, 과목번호**, 신청날짜, 중간성적, 기말성적, 평가학점)
- 과목(**과목번호**, 이름, 강의실, 개설학과, 시수)

## MySQL

- 세계에서 가장 많이 사용하는 오픈소스 RDBMS
- 코드가 공개되어 있어 누구나 다운로드하여 사용할 수 있는 데이터베이스 관리 시스템
- 무료임에도 처리 속도가 빠르고 설치도 쉬움
- 오라클, MS-SQL Server와 함께 가장 많이 사용하는 DBMS 중 하나

1. MySQL 서버를 미리 구동 → 클라이언트 관리 도구인 MySQL 워크벤치 실행
2. 슈퍼 사용자 root로 접속
3. MySQL 버전, 시스템 날짜 시간 정보 확인
    
    ```sql
    SELECT version(); --MySQL 버전 표시
    SELECT current_date(), current_time(), now(); --현재 날짜와 시간 표시
    ```
    
4. 현재 접속한 사용자 아이디 확인
```sql
SELECT user(); -- 현재 MySQL 사용자 표시
```

5. 데이터베이스 목록 확인
    
    ```sql
    SHOW DATABASES; -- 현재 데이터베이스 목록 표시
    ```
    
6. ‘univDB’ 실습 예제 데이터베이스 생성
    
    ```sql
    -- DB 생성
    DROP DATABASE IF EXISTS univDB;
    CREATE DATABASE IF NOT EXISTS univDB;
    
    -- univDB가 생성되었는지 확인
    SHOW databases;
    
    -- SQL 명령어를 실행할 대상인 기본 DB를 univDB로 지정
    USE univDB;
    
    -- 현재 사용 DB 확인
    SELECT database();
    
    -- 학생 테이블 생성
    CREATE TABLE 학생
      ( 학번 CHAR(4) NOT NULL,
        이름 VARCHAR(20) NOT NULL,
        주소 VARCHAR(50) NULL DEFAULT '미정',
        학년 INT NOT NULL,
        나이 INT NOT NULL,
        성별 CHAR(1) NOT NULL,
        휴대폰번호 CHAR(14) NULL,
        소속학과 VARCHAR(20) NULL,
        PRIMARY KEY (학번) );
    
    -- 학생 테이블 입력
    INSERT INTO 학생
    VALUES('s001', '김연아', '서울 서초', 4, 23, '여', '010-1111-2222', '컴퓨터');
    INSERT INTO 학생
    VALUES('s002', '홍길동', DEFAULT, 1, 26, '남', NULL, '통계');

    -- univDB 안의 생성 테이블 목록 확인
    SHOW TABLES;

    -- 학생 테이블 생성 정보 확인
    DESC 학생;
    ```