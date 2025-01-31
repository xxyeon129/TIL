> [!NOTE]
>
> 현재 통신은 대부분 패킷 통신.
>
> 패킷: 소포. 택배. → 보내는 사람과 받는 사람의 주소가 써있음
>
> IP는 실제 데이터 패킷을 싣고 목적지까지 전달하는 택배차의 역할
>
> ---
>
> - 인터네트워킹: 안에 네트워크가 들어 있다
> - 인터넷: 네트워크들의 네트워크
> - 인터넷에서 사용하는 주소: IP 주소

# 01 TCP/IP 개요

Transmission Control Protocol; 전송 제어 프로토콜

Internet Protocol; 인터넷 프로토콜

- 소련 발사 계기로 → 미국 ARPA(Advanced Research Project Agency) 부서 신설, 전쟁으로 인한 통신망 파괴에도 작동되는 데이터 전송로 구축 계획
- 인터넷이라는 **거대 네트워크를 유지하기 위한 표준 프로토콜(= TCP/IP)**을 만들기 시작

> [!NOTE]
> 💡
>
> - IP주소 = 네트워크 주소 + 호스트 주소
> - LAN에 속해있는 호스트들의 주소: 호스트 주소

<br />

# 02 인터네트워킹 (InterNetworking)

떨어져 있는 각각의 **수많은 네트워크들을 연결**하여 → **하나의 네트워크로 연결하여 사용할 수 있게** 해주는 기술

## ✅ 인터네트워킹 장비

### ✔️ **리피터 (Repeater)**

- = 신호 재생기
- 데이터가 전송되는 동안 케이블에서는 감쇠(신호 손실) 현상이 일어나는데,
  리피터는 **감쇠되는 신호를 증폭하고 재생하여 전송 (물리 계층)**

### ✔️ **허브 (Hub)**

- 한 사무실이나 가까운 거리 컴퓨터들을 / UTP 케이블을 사용해 **연결하기 위해 사용**하는 / 네트워크 장비
- **중앙접속점** 제공 + **신호 증폭기능을 하는 리피터의 역할도 포함 (물리 계층)**

### ✔️ **스위치 (Switch)**

- = 교환기 (회선을 바꿔줌)
- 연결된 PC의 수에 상관 없이 **각각의 회선의 최대 대역폭을 제공**
- **가상 LAN(= VLAN)을 지원 (Data link Layer)**

### ✔️ **브리지 (Bridge)**

- OSI의 Data link Layer 하위계층인 **MAC(Media-Access Control)에서 동작**
- 둘 또는 그 이상의 **네트워크들을 상호연결**
- **자체 학습 기능**을 통해 **불필요한 데이터가 반대편 네트워크로 전송되는 것을 방지**
- 💩 브로드캐스트, 멀티캐스트 프레임을 그대로 전송하므로 → **다른 segment에 불필요한 트래픽을 발생시켜 성능 저하의 요인이 될 수 있음**

### **⭐ 라우터 (Router)**

- IP 주소에 의해 → 데이터의 **경로를 설정**
- 다중 경로일 경우 → **최적의 경로를 자동 설정**하여 **네트워크의 트래픽을 최소화** (Network Layer)
- MAC 계층의 브로드캐스트와 멀티캐스트 프레임을 **재전송하지 않음**

### ✔️ **게이트웨이 (Gateway)**

- OSI 참조 모델의 **모든 계층을 포함하여 동작**하는 네트워크 장비 → 두 개의 완전히 다른 네트워크 사이의 **데이터 형식을 변환**하는 기능을 수행 (모든 계층)
- 💩 **여러 계층의 프로토콜 변환 기능**을 수행 → **네트워크 내의 병목현상**을 일으키는 지점이 될 수 있음

<br />

# 03 TCP/IP 프로토콜 계층 구조 (TCP/IP Protocol Suite) (4)

- TCP와 IP뿐만 아니라 여러 가지 프로토콜의 조합
- **응용 계층, 전송 계층, 네트워크 계층, 데이터링크 계층(4)으로 구성**

## 1️⃣ 응용 계층 (Application Layer)

어플리케이션이 **네트워크에 접근 가능하도록** 해주는 역할

## 2️⃣ 전송 계층 (Transport Layer)

> [!NOTE]
>
> ⭐ TCP는 연결 지향 (전송 제어 프로토콜)
>
> - 클라이언트→서버 동기 요청 신호, 서버→클라이언트 확인 신호
>
> ⭐ UDP 비연결 지향 → 전송속도 빠름
>
> ---
>
> OSI 계층 - TCP/IP 모델 지칭 다르게 함
>
> - OSI 1-4계층: 데이터가 왔다갔다 하는 Data Flow Layers

### ⭐ TCP (Transmission Control Protocol 전송 제어 프로토콜)

- **연결 지향 (Connection-oriented)**
  - 클라이언트, 서버가 연결되어 있어야 함
- ✨ 확인 응답으로 **신뢰성 있는 전송** 가능

### ⭐ UDP (User Datagram Protocol)

- **비연결 지향**
- **패킷의 정확한 전달을 보장하지 않음**
- 송수신의 책임은 상위의 Application이 가짐
- ✨ 전송 속도 빠름

## 3️⃣ 인터넷 계층 (Internet Layer)

주소 관리, 라우팅

### ✔️ IP (Internet Protocol)

패킷 교환 네트워크(인터넷)에서 **송신 호스트와 수신 호스트가 정보를 주고받는데 사용**하는 프로토콜

- 인터넷의 각 컴퓨터(호스트)에는 / 인터넷의 다른 모든 컴퓨터와 **고유하게 식별하는 / 하나 이상의 IP 주소**가 있음
- 인터넷 환경에서 통신 규약으로 → OSI 7계층에서 인터넷 프로토콜 스위트(suite)의 인터넷 계층에 해당하는 IP
  - 호스트 간의 통신만을 담당 (패킷을 라우팅)
  - IP의 특징: **비신뢰성, 비연결성**
    - 내용의 상태(신뢰성), 수신자 있는지(연결) 고려하지 않고 일단 요청이 오면 목적지 주소로 보냄
    - 오로지 패킷을 목적지에 도달시키기 위한 내용들로만 구성
    - 상태는 잘 도착했는지, 내용물 보장은 TCP(Transmission Control Protocol)에서 담당

### ✔️ ARP (Address Resolution Protocol: 주소 결정 프로토콜)

네트워크 상에서 **논리적 주소(IP)를 → 물리적 주소(MAC Address)로 변환**하는 작업 수행

- **RARP (Reverse Address Resolution Protocol: 역순 주소 결정 프로토콜):**
  - 호스트가 자신의 MAC Address는 알지만, IP주소를 모르는 경우 → 서버로부터 IP 주소 요청하기 위해 사용
  - 호스트 MAC Address를 알면 → 자신의 IP를 알려주는 프로토콜
  - 대부분 통신 호스트 단말이 제한적으로 사용되는 경우 사용 (컴퓨터 전원 On 시 RARP 서버로부터 IP를 얻기 위해 사용)

**[ARP 동작 순서]**

1. 송신자는 [ 송신자의 MAC주소 + 송신지 IP + 목적지 IP ] 묶어서 하나의 프레임을 → 네트워크가 연결되어 있는 모든 컴퓨터들에게 **ARP 요청을 브로드캐스트**함
   (브로드캐스트 주소로 설정한 ARP Request Packet을 스위치에 전송)
2. ARP Request Packet을 받은 스위치는 자신이 연결되어 있는 모든 포트에 ARP Request Packet 브로드캐스팅함
3. 네트워크에 연결되어 있는 모든 컴퓨터는 ARP Request Packet을 수신함
   목적지 IP가 맞는 컴퓨터는 응답을 보내고, 목적지 IP가 아닌 컴퓨터는 수신 받은 프레임 폐기
4. 목적지 IP가 맞는 컴퓨터는 송신자에게 본인의 MAC Address를 추가하여 ARP Reply Packet 응답을 보냄
   응답을 보낼 때는 Unicast로 보냄

**[ARP 사용 이유]**

목적지 MAC Address가 없는 프레임을 받으면 DataLink Layer(2계층)에서 폐기함

→ 목적지 MAC Address를 알아야 프레임이 만들어져서 통신이 가능함

> [!NOTE]
>
> 수신자가 본인의 MAC 주소를 보냄
>
> 목적지 MAC 주소 몇번인지 보내서 통신
>
> ---
>
> - 라우터 세개 + 스위치 연결
> - 목적지의 MAC주소 찾아내는(결정하는) 프로토콜

### ✔️ ICMP (Internet Control Message Protocol)

**TCP/IP에서 IP 패킷을 처리할 때 발생하는 문제를 알려주는 프로토콜**

- 해당 호스트가 없거나, 해당 포트 대기 중에 서버 프로그램이 없는 등 에러 상황 발생할 때 → I**P 헤더에 기록된 출발지 호스트로 에러 상황 보내주는 역할** 수행
- 에러 상황(메세지, 코드) 받게 된 출발지 호스트에서는 목적지 호스트에 대한 정보 파악
- 에러 메시지 종류
  - 에러 메시지 내 에러 코드가 존재 → 원인을 더 깊이 파악 가능

## 4️⃣ 네트워크 엑세스 계층 (Network Access Layer)

데이터를 전송하는 케이블에 프레임을 송수신

## ✅ OSI 7 Layer

- 모든 네트워크에서 발생하는 여러 **충돌 문제를 해결하기 위해** 국제표준화기구(ISO)에서 **표준화된 네트워크**를 제시 + **접속에 필요한 통신 절차**를 정의
- 여러 통신 기능 중 **유사한 기능을 제공하는 모듈을 → 동일계층으로 분할**해 모두 7 계층 분할
- 7개 계층을 수직계층으로 분할해 → 각 계층마다 다른 계층과 독립적인 기능을 지원하도록 구성 → 다른 계층에 미치는 영향 최소화

### 1️⃣ 1계층 Physical Layer (물리계층)

실제 장치들을 연결하기 위한 전기적, 물리적 세부 사항을 정의한 계층

### 2️⃣ 2계층 Data Link Layer (데이터 링크 계층)

Point-to-Point 방식으로 **신뢰성 있는 전송을 보장**하기 위한 계층

- 물리 계층(1계층)으로부터 제공되는 물리적 특성을 이용해 / **인접한 두 장치 간의 오류 없는 데이터 송수신 수행**
- 물리계층(1계층)에 있는 그대로 전송 설비를 → 신뢰할 수 있는 링크로 변환
  네트워크계층(3계층)에게 오류 없는 물리계층으로 보이도록 함
- 상위 계층에서 받은 packet에 / 발신자와 + 다음 장치의 MAC 주소를 / 헤더에 추가해 프레임을 만듦
- 물리계층(1계층)에서 전송하는 비트들에 대한 비트 동기/식별 기능, 매체접근제어, 원활한 데이터 전송을 위한 흐름제어, 오류제어(에러검출, 에러 정정) 기능 수행
- 논리적 링크 제어(LLC)와 매체 접근제어(MAC) 두 부계층으로 분류
  - **LLC(Logical Link Control: 논리적 링크 제어) 부계층**: 네트워크 계층과 MAC 계층 간 인터페이스를 제공
    - 흐름/오류 제어, 주소 지정 담당
  - **MAC(Medium Access Control: 매체 접근 제어) 부계층:** 물리 매체 접근 및 데이터 전송 제어, 충돌 방지 기능 (CSMA/CD) 수행
    - 데이터 링크 계층의 주소 지정을 지원
    - 사용하는 데이터 링크 계층 프로토콜 타입과 매체의 요구조건, 물리적 신호에 의해 → 데이터의 범위가 정해짐

### 3️⃣ 3계층 Network Layer (네트워크 계층: Network Layer)

패킷 정보를 전송하기 위한 계층

- 여러 개의 노드를 거칠 때마다 경로를 찾아주는 역할
- 다양한 길이의 데이터를 네트워크를 통해 전달
- 전송 계층(4계층)이 요구하는 서비스 품질(QoS) 제공하기 위한 기능적, 절차적 수단 제공
- 상위 계층에서 받은 segment에 / 발신자와 + 목적지의 논리적 주소(IP주소)를 / 헤더에 추가해 패킷을 만듦
- 중간 라우터를 통한 라우팅을 포함해 패킷 포워딩을 담당
- 3계층: IP, ICMP, ARP/RARP

### 4️⃣ 4계층 Transport Layer (전송 계층: Transport Layer)

End-to-End에 대한 흐름 제어를 제공

- End-to-End 사용자들의 신뢰성 있는 데이터를 송수신할 수 있도록 하여 → 상위 계층들이 데이터 전달의 유효성, 효율성을 신경 쓰지 않게 해주는 계층
- End-to-End 전송이 단순히 한 컴퓨터에서 다른 컴퓨터로 전달하는 게 아니라,
  송신 컴퓨터의 응용 프로그램(process)에서 수신 컴퓨터의 응용 프로그램(process)으로 전달을 의미
- 메세지 분할/조립, 순서화, 포트 주소 지정, 연결제어, 다중화/역 다중화 등 기능 수행
- 4계층 프로토콜: TCP, UDP

### 5️⃣ 5계층 Session Layer (세션 계층: Session Layer)

통신 시스템 간에 **상호 대화를 설정**하고 + **유지, 동기화**하는 기능

세션 연결/관리/종료 → 전송모드(전이중, 반이중 방식)

### 6️⃣ 6계층 Presentation Layer (표현 계층: Presentation Layer)

송/수신자가 공통으로 이해할 수 있도록 → **정보의 데이터 표현형식**을 바꾸는 기능

- 응용 개체들 간에 사용되는 구문(Syntax)을 정의하며
  부호화, 데이터 압축, 암호화 등 3가지 주요 동작 서비스 제공

### 7️⃣ 7계층 Application Layer (응용 프로그램 계층: Application Layer)

최상위 계층으로, **사용자**(사람 or 소프트웨어)**가 네트워크에 접속**하는 것을 가능하게 함

- 응용 프로세스와 직접 관계하여 / 일반적인 응용 서비스 수행하는 계층
- 전자우편, 원격 파일 접속과 전송, 공유된 DB 관리, UI 제공
- 7계층 프로토콜: HTTP, Telnet, FTP, SSH

> [!NOTE]
>
> - 7계층 프로토콜: HTTP, Telnet, FTP, SSH
>   - Secure Shell: 명령어 해석기
>   - 전송되는 양쪽에 SSH를 사용해서 암호화 → 해커가 스니핑할 수 없음
> - 5계층 세션: 동기 제공, 세션 연결/관리/종료 → 전송모드(전이중, 반이중 방식)
> - 4계층 프로토콜: TCP, UDP
> - 3계층: IP, ICMP, ARP/RARP…
> - 2계층: MAC

## ✅ OSI 7 Layer별 Internetworking 장비

### 1️⃣ **1계층 Physical Layer (물리계층)**

:**랜카드, 네트워크 드라이버, 리피터, 허브**

**[랜카드**(NIC; Network Interface Card)]

- 개방형 시스템 네트워크 통신을 위한 가장 하위 계층으로 / 네트워크를 통한 **데이터 전송과 수신의 역할 담당**
- 한 컴퓨터에서 처리된 **데이터를 → 전기신호로 변환해서 → 네트워크 내 다른 컴퓨터로 전송**
- **전기신호를 수신**하여 → 다시 컴퓨터가 처리할 수 있도록 **데이터로 변환**하는 역할

**[네트워크 드라이버]**

컴퓨터와 랜카드 사이를 논리적으로 묶어주는 소프트웨어

**[리피터]**

- 케이블 전송으로 약화된(감쇄된) 신호를 초기화시키고, 증폭 재전송 기능 수행
- MAC 주소나 IP 주소를 이해하지 못하므로 / 오직 신호만 증폭하는 네트워크 장비
- 연속적으로 2개 이상 케이블을 연결해 / 케이블의 거리 제한을 극복

**[허브]**

- 전기적 신호만을 증폭하여 → LAN 전송 거리 연장 + 여러 대 장비를 LAN 접속할 수 있게 함
- 한 장비에서 전송된 데이터 프레임을 → 허브에 연결된 모든 장비에 전송
- 충돌이 발생하기 때문에 많은 장비를 연결할 수 없으며
  허브에 연결된 장비들은 하나의 충돌 도메인(Collision Domain) 안에 있음
- 이더넷 멀티 포트 리피터 또는 연결 집중 장치라고도 함

### 2️⃣ **2계층 Data Link Layer (데이터 링크 계층)**

**: 브릿지, 스위치**

**[브릿지]**

- 전기적 신호 증폭 + **프레임을 다시 만들어 전송하는 기능**
- (허브와 다르게) (Layer2 주소인) MAC 주소를 보고 프레임 전송 포트를 결정할 수 있음
- 물리계층(Layer1)과 데이터 링크 계층(Layer2)을 연결
- 상위 계층(Layer3)과는 무관

**[스위치]**

- (MAC 주소와 + 해당 장비의 포트번호가 기록된) **MAC 주소 Table**을 보고 → 목적지로 프레임을 전송하는 장비
- 한 포트에서 전송되는 프레임이 / MAC 주소 Table을 읽고 / 특정 포트로만 전송되기 때문에 → 다른 포트가 전송하는 프레임과 **충돌이 발생하지 않음**
- 스위치는 **각각의 포트가 → 하나의 충돌 도메인**에 있음

### 3️⃣ **3계층 Network Layer (네트워크 계층) : 라우터(Router)**

- 네트워크 계층 주소를 기반으로 → 최적화된 경로를 찾음으로써 → 네트워크 간 패킷 전달 기능 수행
- 최적의 경로 선택, 세그먼트 분리, 이종 네트워크 간의 연결
- 송신측/수신측 간 가장 빠르고 신뢰성 있는 경로를 설정/관리, 데이터 전달하는 역할 (End-to-End)
- 주로 같은 프로토콜을 사용하는 네트워크 사이에 / 최적의 경로를 설정하기 위해 / 패킷이 지나가야 할 정보를 테이블에 저장하여 → 저장된 경로를 통해 전송

**[라우터 기능]**

- **네트워크들을 연결하는 기능**
  - 각기 독립된 네트워크들을 연결시켜주는 장비
- **패킷 스위칭 기능(Forwarding)**
  - 현재 포트에서 패킷을 받아서 → 다른 포트로 전송하는 기능
  - 데이터그램(또는 패킷)을 소프트웨어 기반으로 스위칭
- **경로 설정** **기능**
  - 라우터끼리 상호 연결된 복잡한 망에서 경로의 배정, 제어를 자동적으로 수행
  - 라우터 상호 간의 라우팅 정보를 주고받으며, 동적으로 라우팅 테이블을 만들어감
- **네트워크의 논리적 구조(Map)를 습득(Learning) 기능**
  - 이웃 라우터와 지속적으로 라우팅 정보 교환
  - 라우터는 서로 다른 네트워크의 존재를 인식/기록/관리
- **로드 밸런싱(Load Balancing) 기능**
  - 라우터로부터 나오는 여러 케이블 선들의 트래픽 양을 고르게 분산 → 안정적 부하
- **우회 경로**
  - 링크 중 하나가 고장나면 우회 경로 구성

### 4️⃣ 4계층 Transport Layer (전송 계층): L4 스위치

- L4 스위치는 **포트 번호를 기준**으로 **패킷을 전송**
- **네트워크 암호화**나 **애플리케이션 프로토콜에 대한 패킷 필터링**에 사용
- 대표 기능: **부하 분산** (과도한 트래픽이 몰릴 경우 트래픽 분산시키는 역할을 하는 장비)
- 전송 계층(Layer4) 포트번호를 통해 → 응용 계층(Layer7) 서비스(HTTP(80), SMTP(25), Telnet(23) …) 구분
- L4 스위치가 관리하고 있는 **서버의 부하에 따라 →** segment 적절히 분배

### 7️⃣ 7계층 Application Layer (응용 프로그램 계층)

: L7 스위치, 게이트웨이

- **L7 스위치**
  - OSI Layer 3~7에 속하는 IP 주소, TCP/IP 포트 정보 및 패킷 내용까지 참조하여 스위칭
  - 고수준의 정교한 네트워크 트래픽 분산 로드 밸런싱(Load Balancing) 지원
  - 시스템 부하 감소(Connection Pooling), 콘텐츠 압축 전송(Traffic Compression), 보안 기능
- **게이트웨이**
  - 현재 사용자가 위치한 네트워크(segment)에서 → 다른 네트워크(segment)로 이동하기 위해 **반드시 거쳐야 하는 지점**을 의미

## ✅ TCP/IP 프로토콜 계층별 비교

## ✅ TCP/IP 프로토콜 계층별 캡슐화 및 데이터 단위

## ✅ TCP/IP 프로토콜을 이용한 인터넷의 4가지 계층 주소 Address

**물리(링크) 주소, 논리 주소, 포트 주소, 응용특수 주소 (application-specific address)**

### 1️⃣ 물리 주소 physical address

물리주소 = MAC address

**링크 주소**이며, **LAN이나 WAN에서 정의된 노드의 주소**

- 최하위 계층 주소
- (Data Link Layer(OSI Layer2)에 의해 사용되는) **프레임**이 포함됨
  - 프레임은LAN을 통해 전달됨
  - 목적지 MAC 주소가 / 프레임에 있는 목적지 주소와 / 다른 물리주소를 갖는 지국은 → 프레임 목적지 주소가 자신의 물리 주소와 **일치하지 않기 때문에** **폐기**
  - 목적지 MAC 주소 == 자신의 물리 주소 **일치하면** → 헤더, 트레일러가 벗겨지고 데이터 부분이 **상위 계층에 전달**

### 2️⃣ 논리 주소 logical address

논리 주소 = IP address

기존의 물리적인 네트워크와 관계 없이, **각 호스트를 유일하게 식별할 수 있는 전 세계적인 주소 지정 시스템 필요** 목적을 위해 탄생

- 현재 인터넷에 연결된 호스트 컴퓨터를 유일하게 식별할 수 있는 32bit 주소 체계(IPv4)와 128bit 주소 체계인 IPv6 사용
- 인터넷 상의 두 호스트는 동일한 IP address를 사용할 수 X

### 3️⃣ 포트 주소 port address, port number

다량의 데이터를 / 발신지에서 → 목적지 호스트까지 전송하기 위해서는 MAC 주소, IP주소가 필요함

but 목적지 호스트에 도착하는 것이 데이터 통신의 최종 목적이 아님

---

**인터넷 통신의 최종 목적:** **한 프로세스가 다른 프로세스와 통신할 수 있도록 하는 것**

ex. 컴퓨터 A (1) TELNET을 이용해 컴퓨터 C와 통신 (2) 동시에 FTP를 이용하여 컴퓨터 B와 통신

→ 동시에 발생하는 프로세스들을 위해 **서로 다른 프로세스를 식별하는 방법**이 필요 → 주소가 필요

---

TCP/IP 구조에서 **프로세스를 구분할 수 있도록 하는 식별자 역할**을 하는 것 → **포트 번호**

## ✅ 데이터그램

Data + Program

연결 설정 없이 **독립적으로 목적지까지 전송되는 데이터 패킷**을 말함

**비연결형 패킷교환 방식:** 독립적인 패킷이 네트워크를 통해 이동하며, 각 패킷이 다른 경로를 선택할 수 있음

- 수신지 주소와 라우팅 정보를 포함
- IP, UDP에서 사용됨
- 네트워크 계층(OSI7 Layer3) 상의 프로토콜 데이터 단위(PDU)를 데이터그램이라고 함
- 소프트웨어적으로 처리됨
  - 형식과 내용이 HW적으로 제약을 받지 X
  - 데이터그램을 중계하는 라우터는 일종의 SW 처리장치

### ✔️ 데이터그램 축적 후 교환 방식 (패킷교환)

- **축적 후 교환 방식:** 데이터를 작은 단위(패킷)로 나눠 전송하고, / 각 패킷은 네트워크 노드에 잠시 저장된 후 → 다음 경로로 전달되는 방식

### ✔️ 가상회선 방식 vs. 데이터그램 방식

- **가상회선 방식:**
  - 연결 기반: 통신 전 데이터를 전송할 경로(가상회선) 미리 설정
  - 순서 보장: 모든 패킷이 동일 경로를 따라 전달되므로 도착 순서가 일치
  - 신뢰성 높음: 패킷 손실, 순서 문제 적음
- **데이터그램 방식:**
  - 비연결형: 경로를 사전 설정하지 X, 각 패킷이 독립적으로 전송
  - 순서 및 신뢰 미보장: 도착 순서가 달라질 수 있고 패킷 손실 가능

### ✔️ 데이터그램 방식의 특징

- 비연결 방식: 경로를 사전 설정하지 X
  - 목적지가 같은 패킷이라도 항상 같은 경로를 따르지 않음
- 각 패킷들을 독립적으로 처리 → 순서와 무관하게 전달
- 통상적으로 양단 간 요청-응답 형태를 가짐

## ✅ TCP segment

TCP segment는 전송 계층(OSI7 Layer4)의 데이터 단위

신뢰성 있는 데이터 전송을 위해 구성됨

**TCP/IP 전송계층: TCP 프로토콜, UDP 프로토콜**

- **연결형 서비스를 제공하는 TCP 프로토콜**

  - 연결형: 데이터 전송 전 ⭐ **3-way handshake**로 연결 설정

    > [!NOTE]
    >
    > **⭐ 3-way handshake**
    >
    > TCP에서 신뢰성 있는 연결을 위해 사용하는 과정
    >
    > 1. **SYN:** 클라이언트가 → 서버에 연결 요청
    > 2. **SYN-ACK:** 서버가 요청 수락 및 확인 응답
    > 3. **ACK:** 클라이언트가 최종 확인

  - TCP는 전송계층에서 종단간 연결 개설, 오류 발생 시 데이터 재전송, 패킷 전달순서 확인, 중복 패킷 제거, 흐름 제어, 네트워크 오동작 시 보고 등을 제공하는 서비스
  - 안정적인 데이터 전달을 필요로 하는 응용 프로그램 대부분 TCP 사용

- **비연결형 서비스를 제공하는 UDP 프로토콜**
  - 단순히 패킷을 하나씩 **목적지 주소로 전송만** 함
  - UDP를 안정적으로 사용하려면 **응용 프로그램에서 데이터 분실, 흐름 제어, 오류 등 처리해야** 함
  - UDP를 사용해야만 하는 경우
    - 응용 프로그램이 UDP만 사용하도록 작성되어 있는 경우
    - 패킷을 방송 또는 멀티캐스팅해야 하는 경우
    - TCP 처리 오버헤드 때문에 TCP로 처리할 시간이 없는 경우 (실시간 서비스 등)

**[TCP segment 구조]**

1. **헤더(Header)**: 데이터의 제어 정보를 포함하며, 최소 20바이트로 구성.
   - **출발지/목적지 포트 번호:** 통신하는 응용 프로그램 식별.
   - **시퀀스 번호:** 데이터의 순서 지정 및 재조립.
   - **확인 번호:** 수신 데이터에 대한 ACK 응답.
   - **플래그 비트:** SYN, ACK, FIN, RST 등 제어 플래그.
   - **윈도우 크기:** 흐름 제어를 위한 수신 버퍼 크기.
   - **체크섬:** 데이터 무결성 확인.
   - **옵션 필드:** 예: TCP 창 크기 확장.
2. **데이터(Payload)**: 전송하려는 실제 데이터.

> [!NOTE]
>
> **⭐ 3-way hand shaking**
>
> Code Bits알아둬야 한다
>
> ACK, PSH, RST, SYN, FIN

### ✔️ TCP 포트 번호

포트 번호는 **응용 서비스가 통신하기 위한 논리적 접속 장소**

- 컴퓨터는 동시에 하나 이상의 응용 프로그램들을 실행하기 때문에 → IP주소만으로는 특정 서비스에 접근할 수 없음
- 포트는 1~65,535까지 숫자로 표기
- 각 포트는 특정 서비스에 할당될 수 있고, 포트를 통해 원하는 서비스에 접근할 수 있음

- Soket: SW로 작성된 통신 접속점(네트워크 응용 프로그램은 소켓을 통해 → 통신망으로부터 데이터를 송수신)
- 응용 프로그램에서 TCP/IP를 이용하는 창구 역할을 하며,
  응용 프로그램과 TCP/IP 사이의 인터페이스 역할
- 서버 소켓: 서버 프로그램에서만 사용하는 소켓 → 클라이언트로부터 연결 요청이 오길 기다리다가 → 요청 오면 클라이언트와 연결을 맺고 / 다른 소켓을 만드는 역할
- 클라이언트 소켓: 기다릴 필요 없이 바로 생성
  - 서버 프로그램에 연결 요청 + 데이터 전송하는 일 수행

> [!NOTE]
> 포트번호 20번 FTP(데이터 전송 포트), 21번 FTP(제어 포트), 23번 Telnet, 25번 SMTP, 53번 DNS, 69번 TFTP, 80번 HTTP, 110번 POP3, 111번 RPC, 161번 SNMP

### ✔️ UDP 헤더 구조

- UDP(User Datagram Protocol)의 **오버헤드는 TCP보다 작음**
- 송신지 및 목적지의 포트 번호(16비트), 데이터그램 길이(16비트), Checksum, 사용자 데이터로 구성
- UDP는 신뢰할 수 있는 종점 간 데이터 송수신을 보장하지 **않으므로 →** 파일 전송, 메일 서비스 등에는 적합하지 않음
- 도메인 네임 서비스(DNS)나 Time 서비스(NTP; Network Time Protocol)와 같이 **한 패킷의 송수신으로 어떤 서비스가 이루어지는 경우**에 많이 사용됨
- LAN과 같이 전**송 오류가 거의 없고 패킷 전달 순서가 바뀌지 않는 환경**에서는 TCP보다 **처리 속도가 빠른 UDP**가 유리함

> [!NOTE]
>
> NTP: 표준 시간(기준 시간)을 서버에서 제공해주는 프로토콜
>
> TCP 세그먼트가 IP 패킷에 캡슐화되는 과정
>
> - Message → Segment → Packet

## ✅ IPv4 패킷 구조

[각 필드 설명]

1. **Version(버전 숫자)**: IP 프로토콜 버전. IPv4는 4
2. **HLEN(Header Length)**
3. **ToS(Type of Service: 서비스 유형):** 서비스 품질에 따라 패킷의 등급 구분
   - 높은 값 우선처리 (3비트는 우선순위, 5비트는 서비스 유형)
4. **Total Length**: 헤더 + 데이터 크기, 패킷의 전체 길이

---

5. **Identification:** 모든 IP 패킷은 생성될 때 → 식별번호를 부여받음

   - 식별번호는 16비트 필드 안에 있음
   - IP 패킷은 더 작은 조각난 패킷(Fragment 패킷)으로 분리되어 목적지로 전송됨
   - Fragment 패킷은 고유번호가 같기 때문에 → 전송된 패킷이 다른 패킷과 같은 식별자를 가지면 같은 패킷에서 조각났음을 알 수 있음

6. **Flag(플래그 필드):** 3개의 bits로 구성되는 플래그 → Fragment 패킷의 상태나 생성 여부를 결정하는 플래그

7. **Fragmentation Offset(단편 옵션):** 전체 패킷에서 해당 단편의 Offset을 나타내며, 8bytes(16bits) 단위로 표기

---

8. TTL(Time To Live: 수평 필드): IP 패킷이 라우터를 지날 때마다 → 라우터는 TTL 값이 1씩 감소됨

   - 0이 되면 전송할 수 없어서 폐기

9. Protocol(프로토콜 타입): IP 계층의 서비스를 사용하는 / 상위 계층 프로토콜에서 부여된 번호

10. Header Checksum: IP 헤더가 생성/수정될 때마다 IP헤더 내 비트를 검사함

- IP 패킷이 전송되고 계산결과가 같이 나타나면 → IP 헤더의 모든 비트는 정확하게 전송된 것
- 다른 결과가 나타나면 → 전송 중 일부 손상/조작됐음을 의미

---

11. Source Address / Destination Address(송수신자 IP Address): 32bit 주소

### ✔️ IPv4 패킷이 MAC 프레임에 캡슐화되는 과정

## ✅ MAC 프레임 구조

상위 계층인 LLC(Logical Link Control) (2_DataLine Layer) 부계층에서 내려온 프레임을 → 상대 호스트에게 전송하려면 → MAC 계층에서 정의한 프레임 구조에 맞게 포장해야 함

- MAC 프레임 == (이더넷 프로토콜에서) 이더넷 프레임
- MAC 프레임은 LLC 계층에서 보낸 모든 정보를 전송 데이터로 취급

  - 데이터 앞: 헤더, 뒤: 트레일러 위치

- Preamble: 수신 호스트가 송신 호스트의 클럭과 동기를 맞출 수 있도록 시간 여유 제공
- Start Frame Delimiter(시작 구분자): 프레임의 시작 위치를 표기
- Length: Data 필드가 포함된 가변길이의 전송 데이터 크기
- Source MAC Address / Destination MAC Address: MAC 계층에서 사용하는 송수신 MAC Address

<br />

# 04 IP (Internet Protocol)

**전송 경로의 확립**, **네트워크 주소와 호스트 주소** 정의에 의한 → **네트워크 논리적 관리** 등을 담당

- TCP: 데이터의 효율적인 전달을 담당
- IP: 데이터가 어디로 전달되면 되는지에 대한 규칙

## ✅ TCP/IP 프로토콜에서 많이 사용되는 프로토콜

- **DHCP(Dynamic Host Configuration Protocol**; 동적 호스트 구성)
  - 프로토콜 - DHCP 서버를 사용하여 → 네트워크의 클라이언트에게 **IP주소를 동적으로 할당**
- **DNS(Domain Name System):** 도메인 이름을 → IP로 변환
- **FTP(File Transfer Protocol):** TCP/IP 프로토콜을 가지고 / 서버와 클라이언트 사이의 **파일 전송**을 하기 위한 프로토콜
- **HTTP(HyperText Transfer Protocol):** W3 상에서 **정보를 주고받을 수 있는** 프로토콜 → **주로 HTML 문서를 주고받는 데에 사용**
- **TELNET:** **인터넷이나 로컬 영역 네트워크 연결**에 쓰이는 네트워크 프로토콜
- **MQTT(Message Queuing Telemetry Transport):** 발행-구독 기반의 메시징 프로토콜
- **SMTP(Simple Mail Transfer Protocol):** 간이 전자 우편 전송 프로토콜
- **SNMP(Simple Network Management Protocol):** 간이 망관리 프로토콜 - IP 네트워크상의 장치로부터 정보를 수집/관리하며, 정보를 수정하여 장치의 동작을 변경하는데 사용되는 프로토콜
- **TFTP(Trivial File Transfer Protocol):** 간단한 파일 전송 프로토콜 (임베디드 시스템에서 OS 업로드용)

## ✅ IP 특성

- **비 신뢰성(Unreliable):** IP 데이터그램이 / 목적지에 성공적으로 도달한다는 것을 보장하지 않음
- **비접속형(Connectionless):** 전달되는 데이터그램에 대해 / **상태 정보를 유지하지 않음**
- **주소 지정:** 각 네트워크 상에 접속해 있는 노드의 주소를 지정해서 → 데이터를 전송할 목적지를 지정
- **경로 설정:** IP의 주요 기능으로서 **목적지의 주소를 가지고** 패킷을 전송하기 위해 최적의 경로를 설정해주는 역할

## ✅ IP Header

- 선택 사항(Option)이 사용되지 않는 경우 → 20byte(각 행 32bit)
- Byte offset: 하나의 필드가 **시작되는 지점으로부터 byte 수**
- RFC(Request For Comments): 비평을 기다리는 문서 (인터넷 기술에 적용 가능한 새로운 연구, 혁신, 기법 등 아우르는 메모)
- Flag(3bit), Fragment Offset

### ✔️ 헤더 필드

- 버전(Version): 프로토콜의 버전을 나타내며, 현재의 버전은 4
- 헤더 길이(Header Length): 선택 사항(Option)을 포함한 헤더의 길이
- Type-Of-Service(TOS)
- 전체 길이 (Total Length): IP 데이터그램의 전체 길이를 byte로 표현
- Time-To-Live (TTL):데이터그램이 지날 수 있는 라우터의 수에 대한 상한을 설정하여 → 데이터그램의 생존 시간 제한
- 식별자 (identification): 호스트가 보낸 각 데이터그램을 식별
- DF(Don’t Fragment): 패킷이 분할되지 않도록 함 → 1로 지정
- MF(More Fragment) 1로 지정하여 패킷이 뒤에 계속 발생됨을 표시. 마지막 패킷은 MF 비트를 0으로 지정하여 분할 패킷이 더 없음을 표시

## ✅ IP 주소 (IP Address)

- **인터넷 주소**로, **전세계 IP 주소**를 IANA(Internet Assigned Numbers Authority; 인터넷 할당 번호 관리기관)에서 대륙별로 할당 관리
- **네트워크 장비 식별을 위해 고유한 IP 주소**를 사용
- 총 32bit로 이루어진 주소(2^32 = 약 43억 개의 주소)
- **IP 주소 = Network ID + Host ID**
  - Network ID: 네트워크를 나타내는 ID
  - Host ID: 네트워크에 포함된 호스트를 나타내는 ID
- TCP/IP 헤더:
  - L2: Link Layer(LAN)
  - L3: Internet Layer (IP)
  - L4: Transport Layer (TCP)
  - L7: Application Layer (HTTP)

### ✔️ IPv4 주소 구성

- `dot(.)`로 구분된 **Octec 4개**로 구성, 총 32bit로 0~255의 값을 가짐
- 각 Octec은 **8bit**로 구성 (8bit 1 Octec) → 10진수로 변환하여 점을 찍어 구분
- **0.0.0.0 ~ 255.255.255.255** 사이 주소

### ✔️ IPv6 주소 구성

- `콜론(:)`으로 구분된 8개의 16bit 숫자, 128bit로 이루어진 주소체계
- 총 128bit의 숫자로 이루어져 있음 2^128개의 IP 주소를 만들 수 있다

### ✔️ 사설 IP (Private IP) / 공인 IP (Public IP)

- **사설 IP**
  - IPv4 주소가 한정되어 있는 문제로 고안한 방법
  - 내부에서만 사용할 수 있는 IP주소라면 → 외부의 IP와 중복되더라도 상관 없음
  - 공유기에 연결된 각 기기들의 주소
- **공인 IP**
  - 와이파이 공유기의 주소
- 공유기는 고유의 공인 IP 주소를 가지지만,
  공유기에 연결된 기기들은 다른 네트워크 기기와 같은 사설 IP 주소를 가짐

### ✔️ 전송하기 위한 목적지의 대상에 따라 IP 주소 타입 구분

- **유니캐스트(Unicast):** 보내는 패킷의 헤더에서 → 목적지가 하나의 호스트를 가리키는 경우
- **브로드캐스트(Broadcast):**
  - 주어진 네트워크의 **모든 호스트에게** 보내는 경우
  - 주소는 호스트 식별자에 255를 붙여서 사용
- **멀티 캐스트(Multicast):**
  - 보내는 패킷의 헤더에서 → 목적지가 **호스트들의 집합(그룹)**으로 이루어진 경우
  - 멀티캐스트를 사용하기 위해서는 → **원하는 그룹 주소를 이용해 그룹에 가입**해야 함
- **애니캐스트(Anycast)**
  - one-to-one-of-many
  - 가장 가까운 호스트에게 보냄
  - IPv6 주소체계

### ✔️ Class

IP주소를 효율적으로 나눠놓은 범위

**[A Class]** **대규모 네트워크** 지원하기 위한 주소 범위

- 첫 한 비트가 항상 0
- 첫 Octet 하나를 Network ID로 사용 → 1~126 사이 숫자로 시작
  - 네트워크 주소 범위: 1.0.0.0 ~ 126.0.0.0
- 첫 Octet이 0, 127로 시작하는 주소는 예약되어 있어 사용 할 수 X
  - 0.0.0.0 = 미지정 주소, 127.0.0.0 = Loopback 주소

---

**[B Class]** **중대규모 네트워크** 지원하기 위한 주소 범위

- 첫 두 비트가 항상 10
- 두 Octet을 Network ID로 사용
- 범위: 첫 Octet이 128~191 사이 숫자로 시작
  - 네트워크 주소 범위: 128.0.0.0 ~ 191.255.0.0

---

**[C Class] 소규모 네트워크**를 지원하기 위한 주소 범위

- 첫 세 비트가 항상 110
- 세 Octet을 Network ID로 사용
- 범위: 첫 Octet 192~223 사이
  - 네트워크 주소 범위: 192.0.0.0 ~ 223.255.255.0

---

- **D Class:** 멀티캐스트용 주소 범위
- **E Class:** 연구용 주소 범위

## ✅ Subnet Mask (Subnetting)

IP를 효율적으로 사용하기 위한 방법

- IP 주소에서 **Network ID와 Host ID를 구분**하기 위해 사용
- 32비트로 구성되어 있으며, **IP 주소와 동일한 표기법**을 사용
- **네트워크 ID는 1로, 호스트 ID는 0**으로 표기

> [!NOTE]
>
> 네트워크 주소와 브로드캐스트 주소(사용할 수 없는 주소)
>
> - 네트워크 주소: Host ID가 모두 0인 주소
> - 브로드캐스트 주소: Host ID가 모두 1인 주소
>   - 네트워크의 모든 호스트로 데이터를 전달하기 위한 주소

## ✅ 슈퍼넷팅 (Supernetting)

여러 개의 네트워크를 → **하나의 네트워크 형태로 합치는 것**

- ✨ 서브넷의 수가 많을 경우 → 라우터 테이블의 규모가 커지고 라우터의 부담을 증가시킴
  → 슈퍼네팅을 이용해 **서브넷의 수를 줄여서 라우터 부담을 경감**
- 인터넷의 폭발적 증가로 문제점 발생
  - Class A와 B 네트워크의 주소 공간이 고갈
  - Class C 주소 사용으로 → 인터넷의 **라우팅 테이블 규모의 증대** (서브넷이 많으면)
  - 32비트 **IPv4 주소의 궁극적인 고갈**
- 주소의 고갈을 막기 위해 **IPv6가 제안**
- IPv4에서 IPv6로의 전환까지 과도기적인 사용
  - Class B
    - 14비트의 네트워크 식별자
    - 한 네트워크에 약 2^16 = 65,536개의 호스트 수용

## ✅ 사설 네트워크(Private Network)를 위한 주소 할당

주어진 성격에 따라 다음과 같이 세 가지로 분류

- 1️⃣ **다른 조직**의 호스트 OR 자유롭게 인터넷으로의 **접근이 요구되지 않는** 호스트
- 2️⃣ 제한적이긴 하지만, **외부 서비스**(E-mail, FTP, Netnews, Remote login)에 **접근할 필요**가 있는 호스트
- 3️⃣ **네트워크 층에서** **인터넷으로의 연결이 필요**한 호스트 → 공인 IP로 구성
  - 분류 3의 호스트는 공인IP로 구성

<br />

# 05 UDP (User Datagram Protocol)

## ✅ UDP 특성

1️⃣ **비연결형 (Connectionless)**

- TCP와 달리 연결 설정 없이 데이터 전송
- 연결 설정을 위한 지연시간이 걸리지 않음

2️⃣ **비 상태정보 (Non-State)**

- 연결 정보나 상태 정보를 저장하지 X

3️⃣ **경량의 오버헤드 (Small Overhead)**

- TCP Segment의 헤더는 20byte지만 UDP는 8byte

4️⃣ **비정규적인 송신율 (Unregulated Send Rate)**

- 일부 패킷의 손실이 생기더라도
  최소 전송률을 요구하는 실시간 전송의 경우 → 비정규적 송신율 이요

**5️⃣ 최선의 서비스 (Best Effort)**

서비스 지연 없이 최선의 서비스 제공

## ✅ UDP 헤더

**[포트번호 (Port Number)]**

- 송신/수신 process를 구분
- IP로부터 들어오는 데이터를 수신하기 위해 목적지 포트 번호 사용

**[UDP 길이(UDP Length)]**

UDP 헤더와 + 데이터의 byte 길이를 합친 값

**[UDP Checksum]**

UDP 헤더, UDP 데이터 모두 포함하여 체크

<br />

# 06 TCP (Transmission Control Protocol)

## ✅ TCP 특성

### 1️⃣ 접속형 (Connection-Oriented)

TCP를 사용하는 두 어플리케이션이 / **데이터를 교환하기 전에 TCP 접속을 성립**

### 2️⃣ 신뢰성 (Reliability)

**수신 확인**을 통해 → 신뢰성 있는 통신 수행

### 3️⃣ 흐름 제어 (Flow Control)

- 각 TCP 접속의 종단에 일정 크기의 버퍼 공간을 가짐
- 송신하는 TCP가 → **수신 측 버퍼 크기만큼 데이터를 보내도록** 제어
- 처리 속도가 느린 수신 호스트의 버퍼 크기를 넘치게 하는 것을 방지

### ⭐ 4️⃣ 혼잡 제어 (Congestion Control)

- **혼잡:** 네트워크 내에 존재하는 **패킷의 수가 과도하게 증가**하는 현상
- 혼잡 현상을 방지하거나 제거하는 기능

<br />

# 07 응용 프로토콜

## ✅ DNS (Domain Name System)

- ARPANET(아파넷) 시절에는 일정 주기마다 호스트 명단 파일(HOST.TXT)을 받아서 사용
- **인터넷의 규모, 호스트 수가 증가**함에 따라 → RFC882, RFC883(현재는 RFC1034로 대체됨)에 **새로운 명명 체제에 대한 구현**을 공식 발표
  - RFC(Request For Comment): 네트워크 분야 등 인터넷 기술에 적용 가능한 연구, 혁신, 기법 등의 메모
- 사람이 기억하기 어려운 시스템의 **IP 주소를** → **호스트의 이름과 매핑**해주는 거대한 **분산 네임 시스템**
- DNS 이름 체계 (53번 포트)
  - 각 **도메인별로 트리화하여 계층적인 구조로 관리**

### ✔️ 도메인 네임 변환 과정

1. `Client`상의 응용이 ‘www.website.ac.kr’에 접속하기 위해 / **자신의 Local Name Server에 질의**
2. **`Local NS`**는 먼저 자신의 **캐쉬에 자료가 있는지 확인**한 후
   → 발견되지 않을 시 **`Root NS`에 질의**를 던짐
3. `Root NS`도 ‘www.website.ac.kr’의 자료를 갖고 있지 않으므로,
   **kr 도메인을 관리하는** **NS(kr NS)를 참고하라는 답변**을 보냄
4. `Local NS`는 다시 **`kr NS`**에 질의를 던지고, kr NS는 다시 `ac.kr의 NS`를 반환
5. Local NS는 `ar.kr NS`하고 마찬가지로 `website.ac.kr NS`를 참고하라는 답변을 보냄
6. Local NS는 다시 `website.ac.kr NS`에 질의하고
   website.ac.kr NS는 서브도메인에 대한 자료를 관리하는 실제 NS이므로
   ‘www.website.ac.kr’에 대한 **IP주소인 203.249.33.1을 반환**
7. 마지막으로, `Local NS`는 `Client`에게 결과를 전송

## ✅ TELNET

특정 지역의 사용자가 → **지역적으로 다른 곳에 위치한 컴퓨터를 온라인으로 연결**하여 사용하는 서비스

### 특징

- **원격으로 특정의 컴퓨터 기기에 접속**하는 프로토콜
- **네트워크를 통한 원격 로그인** 또는 **가상 터미널 기능**을 제공하기 위한 프로토콜
- UNIX 시스템의 네트워크로 연결된 터미널에서 호스트의 쉘 모드를 흉내내는 프로그램
- 23번 포트

### 접속 과정

1. telnet domain-name or IP-address
2. 계정과 암호를 입력
3. 원하는 작업 수행
4. 접속 종료

## ✅ FTP (File Transfer Protocol)

**파일 전송**을 위한 인터넷 표준

- 보안상의 이유로 해당 컴퓨터에 등록된 사용자만 파일 전송이 가능하되,
  그 외의 경우에는 `anonymous`로 사용
- **데이터 접속**과 **제어접속**을 위한 **포트가 분리**되어 있음
- 20번 포트: 데이터 전송, (데이터 접속)
  21번 포트: 제어 명령 전송 (제어 접속)

## ✅ SMTP (Simple Mail Transfer Protocol)

- RFC 821에 명시되어 있는 **인터넷 전자 우편을 위한 프로토콜**
- 메시지 전달은 **Store-and-Forward** 방식
- 포트번호 25번

### 동작

- 송신자가 보낸 편지가 → **송신자 측**의 전자우편을 관리하는 **메일서버**에 전달
- 메일 서버는 **수신자의 전자우편 주소를 분석**해서 최단 경로를 찾아 → **근접한 메일 서버에게** 편지를 전달
- 최종 **수신자 측의 메일 서버**에 도착하기까지 **연속적으로 전달하는 중계 작업**
