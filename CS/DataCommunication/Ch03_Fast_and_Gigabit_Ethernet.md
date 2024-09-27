# Ch03: Fast & Gigabit Ethernet

> [!NOTE]
> 전송 속도의 가장 기본은 bit per sec (10^3 kbps → 10^6 kbps → 10^9 Gbps)

# 01 LAN 스위치의 개요

- 최근 네트워크를 실시간으로 전송하는 경우 혹은 대용량의 데이터를 전송하는 경우에는 → 기존의 공유매체를 사용하는 LAN은 적절하지 못했다.
- 각각의 LAN 세그먼트를 스위치의 포트에 연결한 것이 LAN 스위칭이다.
- 각각의 LAN 세그먼트는 독립적인 LAN으로 동작하며, 충돌 도메인 또한 각각의 LAN 세그먼트로 한정되게 된다.
- 스위치의 처리 속도는 기존의 브리지나 라우터보다 성능이 좋다.
- ASIC(Application Specific Integrated Circuit, 주문형 반도체) 기술의 발전으로 스위칭을 CPU가 아닌, ASIC라는 하드웨어가 수행하게 함으로써, 스위칭 속도를 획기적으로 향상시킬 수 있었다.

> [!NOTE]
>
> - IC(Integrated Circuit): 집적 회로
> - ASIC: 어플리케이션이 지정된 집적 회로. 스위칭을 빨리 할 수 있는 반도체
> - 교통 상황을 통제하여 빠른 속도로 자동차가 이동하듯, 어플리케이션을 지정해 스위칭 속도를 향상시킴

## 충돌 도메인과 브로드캐스트 도메인(Broadcast Domain)

- 2계층은 세그먼트 내의 통신을 담당하고, 세그먼트 범위 안은 허브나 스위치로 분리한다.
- 이때 허브는 CSMA/CD를 통해 충돌을 처리하고, 스위치는 충돌을 미연에 방지하기 위해 MAC 주소 필터링과 버퍼링을 사용한다.
  - 도메인 안에 같은 Mac address가 있으면 피해가서 충돌 방지
- **충돌 도메인:** 충돌이 일어날 수 있는 범위(허브나 스위치가 구분자)
- **브로드캐스트 도메인:** 라우터는 네트워크를 구분지으며 브로드캐스트가 다른 네트워크에 송신되지 않도록 한다. 브로드캐스트가 도달하는 범위(라우터가 구분자)

<br />

# 02 공유 LAN과 스위칭 LAN

- 반 이중 방식 (Half Duplex Mode)
  - 양방향으로 데이터가 전송될 수 있으나, 동시에 전송하는 것은 불가능한 방식
  - 한 번에 한쪽 방향으로만 데이터 전송이 가능한 단방향 통신 방식
  - 교대로 송수신 → ex. 무전기, 워키토키
- 전 이중 방식 (Full Duplex Mode)
  - 하나의 전송 선로에서 데이터가 동시에 양 방향으로 전송될 수 있는 방식으로 충돌이 발생하지 않는다.

<br />

# 03 Switch

## ✅ 스위치의 종류

### 응용 방법에 의한 구분

- **대칭 스위치:** 동일 대역폭을 가진 LAN 세그먼트에 대한 스위칭
- **비대칭 스위치:** 다른 대역폭을 가진 LAN 세그먼트에 대한 스위칭

### OSI 참조모델에 의한 구분

- **Layer 2 Switch(2계층 스위치) - Data link layer**
  - 포트에 연결된 호스트의 MAC 주소를 학습하여 테이블을 생성, 갱신
  - 목적지로 출발한 데이터를 중간에 적합한 경로로 스위칭해주는 역할 (스위칭 테이블을 보고 그에 따라 스위칭)
- **Layer 3 Switch(3계층 스위치) - Network layer**
  - 논리적인 주소(IP주소)를 기반으로 하여 패킷의 경로를 정하여 해당 패킷을 전달
  - IP 주소표기법(CIDR: Classless Inter-Domain Routing)- IP주소 영역을 여러 네트워크 영역으로 나눌 때 사용하는 방식(subnet bit를 1로 표기: 1.1.1.1/24 - 앞 24자리는 1, 나머지 8자리는 0)
  - subnet mask 표기법: 1.1.1.1(255.255.255.255)
  - CIRD 표기법: 1.1.1.1/32

> [!TIP]
> trace route 스마트폰 앱으로 라우터 연결을 확인하고 추적해볼 수 있음.

- **Layer 4 Switch(4계층 스위치) - Transport layer**