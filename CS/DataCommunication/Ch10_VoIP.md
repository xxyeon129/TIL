# 01 VoIP(Voice over Internet Protocol) 개요

인터넷 텔레포니(=전화) 기술

- IP를 사용하여 → 별도 네트워크로 구성된 **음성과 데이터를** → **하나의 통신 네트워크에 통하여 전송**하는 방식
- 컴퓨터 네트워크 상에서 **음성 데이터를** → **⭐ IP(인터넷 프로토콜) 데이터 패킷으로 변환하여** 일반 전화망에서의 **전화 통화와 같이 음성 통화를 가능하게 해주는 통신 서비스 기술**
- VolP 게이트웨이는 ⭐ **회선 교환망과 패킷 교환망을 연동시키는** 기능을 한다
  - 회선 교환 방식: 일정 회선을 독점하여 사용하는 전화 방식 (회선당 비용 높음)
  - VoIP: **패킷 전송 방식**을 사용 → 기존 전용망을 사용해 **음성 데이터를 패킷이라는 작은 단위로 나눠 전송** → **회선 독점을 막고, 기존 회선을 사용**하므로 보다 **저렴하게** 음성 통화 가능
- TDX(Time Division Exchange): 시분할 전전자교환기

> [!NOTE]
> 인터넷 프로토콜(IP)를 통해 음성, 영상 주고받는 기술
>
> 인터넷 등장 → 디지털 데이터를 보낼 수 있음

<br />

# 02 VoIP 구성

## ✅ VoIP 기본구조

VoIP / IP Telephony

- VoIP는 (인터넷 표준 프로토콜) **IP를 사용**하여 → **음성과 데이터를 통합, 하나의 통신 네트워크에 전송**하는 방식
- 기업, 학교, 공공기관 네트워크도 All IP 기반 단일화된 음성/데이터 통합 네트워크 기반으로 확장, QoS가 보장되는 네트워크 상 **IP Telephony** 도입
- **`IP Telephony`**: 음성 압축 전송하는 VoIP 기술에서 한 단계 더 나아가 → **교환기**를 이용한 기존 **다양한 전화 기능을 IP 상에서 제공**, 다양한 기능을 제공하는 통신 애플리케이션과의 결합으로 업무의 효율성 높임
  - VoIP에서 문제된 열악한 낮은 품질 → **관련 통신 기술이 발전되어 QoS가 보장**되고 + RTP(Real Time Protocol) 기능 지원 등으로 → **신뢰성 확장해 음성 품질 보장**

## ✅ VoIP 단말형태

- **IP 폰/IP 전화기/인터넷 전화기:** 일반 전화기와 같은 모양의 형태
  - 인터넷에 직접 접속되어 있는 IP 기반 전화
- **소프트 폰**: PC, PDA 등 단말에 설치된 SW 기반 인터넷 전화
- **미디어 게이트웨이**
  - 서로 다른 미디어에 특화된 망들을 상호 연결해주는 장치
  - 회선교환망, 패킷교환망 사이에 음성 미디어 처리/변환 수행하는 장치
  - 인터넷에서 만들어진 IP 패킷 등 형태의 음성 신호를 → 공중전화망에서 사용되는 PCM(펄스 부호 변조) 등의 형태로 변환하거나, 그 반대의 변환
- **신호 게이트웨이**
  - IP 네트워크의 가장자리에 위치해 / 회선교환망의 시그널링 신호를 종단하는 역할
  - VoP 및 PSTN 간에 신호 상호 연결을 담당

> [!NOTE]
> PCM: Pulse Code Modulation 펄스 부호 변조

## ✅ VoIP에서의 QoS

### ✔️ 지연

신호가 네트워크를 경유하는 데 소요되는 시간

### ✔️ 지터

지연 시간(Delay)이 일정하지 못하고 시간에 따라 변동되는 것

수시로 변하며 패킷 간 간격이 일정하지 않은 현상

### ✔️ 패킷 손실

음질의 명확성에 영향을 주는 요소

일정 시간 내 도착하지 않은 패킷 폐기

### ✔️ 무음 억제

대화 중 통화가 지속되는 기간에만 음성 패킷 전송

패킷의 수를 줄이기 위해 → 대화 중 무음이 지속되는 기간 활용

VAD (Voice Activity Detector)

### ✔️ 에코

송신자의 음성이 수신자 측을 거쳐 → 다시 송신자에게 들리는 현상

에코 소거 장치

<br />

# 03 VoIP 프로토콜

H.323 기반 패킷망에서 멀티미디어 서비스

## ⭐✅ RTP (Real-time Transport Protocol)

음성 영상 데이터와 같은 **실시간 정보**를 멀티캐스트나 유니캐스트 서비스를 통해 전송하는데 적합한 프로토콜

**인터넷에서** **비디오/오디오 패킷의 실시간 전송을 지원하기 위해 표준화된 실시간 통신 프로토콜**

- UDP를 사용 (신뢰성을 보장하지 않음)

## ⭐✅ **RTCP(RTP Control Protocol)**

**RTP의 품질 제어를 위한 제어용 프로토콜**

RTP의 QoS를 유지하기 위해 **데이터 전송을 감시**하고, **세션 관련 정보를 전송**하는 데 사용되는 프로토콜

- 세션의 품질에 대한 종단 간의 정보를 저장
- RTP 송수신 시 QoS 관련 정보를 주기적으로 교환
- 패킷 지연, 패킷 손실, 지터 등 품질 정보를 통해 **실시간으로 네트워크의 상태**를 평가

## ✅ H.323

> **멀티미디어 통신**(음성, 비디오, 데이터)을 IP 네트워크(**인터넷) 상에서** **지원하기 위한 프로토콜 집합**

여러 **표준을 포괄하는 표준 (Umbrella Standards)**

- **터미널:** 오디오, 비디오 OR 데이터로 통신을 할 수 있는 **종단 장치** → PC 또는 독립된 장치
- **게이트웨이:** 서로 다른 네트워크 프로토콜을 사용하는 **네트워크 사이 연결성을 제공**
  - LAN ~ 공중 교환 전화망 사이에 위치
  - 신호 설정/해제 기능, 프로토콜 변환 기능
- **게이트키퍼: 주소 변환, 수락 제어, 대역폭 제어, 지역 관리**
  - **RAS(Registration(등록), Addmission(수락), Status(대역폭 변경)) - 단말과 게이트키퍼 간 통신 규약 등록, 수락, 대역폭 변경 절차 수행**
  - 논리적 위치: 터미널과 분리 / 물리적 위치: LAN 장치
- **MCU(Multipoint Control Unit):** 3개 이상 단말들 간 회의를 지원하기 위한 제어 기능 제공

## ✅ SIP (Session Initiation Protocol 세션 개시 프로토콜)

VoIP나 **멀티미디어 통신**에서 / **Session이나 Call(호)을 관리**하는 프로토콜

SIP 프로토콜을 사용해서 IP 전화를 제어

- 멀티미디어 데이터 전송: 실시간 전송 기반 RTP
- 어플리케이션 레벨 관리 프로토콜: SIP

Session의 종류:

- 다자간 회의
- 음성/영상 통화
- 이벤트 신청/통지
- 상태 정보 배포

## ✅ MGCP (Media Gateway Control Protocol 게이트웨이 제어용 프로토콜)

인터넷 망(IP망)과 기존 PSTN(Public Switched Telephone Network 공중 교환 전화망) 사이 **게이트웨이를 사용함으로써 → 서로 다른 네트워크를 연동하여 VoIP 서비스 제공**

미디어 제어 요소(MGC) 간 통신을 외부에서 제어

### ✔️ RGW (Residential Gateway)

PSTN 회선과 연결 설정을 위한 MGCP, RTP 등을 지원

### ✔️ TGW (Trunk Gateway)

인터넷 망과 PSTN망을 연결하는 역할 수행

## IP 기반 사설 전화 교환기 IP PBX (Private Branch Exchange)

기업용 서비스 제공을 위하여 특화된 장비

- 기업에서 필요한 다양한 기능을 가지고 있음
- 빠르고 편리하게 통신을 할 수 있도록 해주는 장비
- 비즈니스 전화 시스템 → 데이터 네트워크를 통해 음성과 화상을 전달하도록 설계된 장비
- 일반 공중망(PSTN)과도 연동 가능
- ✨ 거리 제약 없음, 다양하고 쉬운 부가 서비스

> [!NOTE]
>
> RTP 신뢰성 보장하지 않음. UDP를 사용한다
>
> user의 공간이 있고 OS 커널이 있는데 이 둘을 연결시켜주는 게 소켓 인터페이스.
>
> 게이트웨이: 서로 다른 네트워크의 프로토콜을 해당 네트워크의 프로토콜로 변환하는 기능
