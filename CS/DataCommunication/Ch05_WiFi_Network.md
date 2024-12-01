> [!NOTE] > **유선통신망**
>
> LAN → Fast Ethernet → Gigabit Ethernet(1GbE) → 10GbE ~ 40GbE ~ 80GbE ~ 1.6TbE
>
> Metro Access - Metro Core
>
> **무선통신망**
>
> - 무선랜: CSMA/CA(Avoid; 회피), 유선랜: CSMA/CD
> - 무선랜 문제점: 거리, 보안 → 기술개발을 통해 점진적 보안
> - 순수 무선통신: `Ad-hoc 네트워크` (이동하는 탱크, 차..에 기지국 심어서 무전병들과 순수하게 무선 통신) → 상업용으로 쓰기는 어려움

<br />

# 01 무선 LAN(Wi-Fi Network) 개요

- 최초의 무선 LAN: **웨이브랜(Wave LAN)**
  - 802.11 근거한 2Mbit/sec → IEEE 802.11b 11Mbit/sec → Wi-Fi Alliance
- 전기 전자 기술자 협회**(IEEE) 802.11** **무선 표준**
  - 가용 주파수 대역: 2.4, 3.6, 5, 60 GHz (주파수⬆️ 전파 직진성⬆️ 시간⬇️)
  - **매체 접근 제어(MAC)**와 **물리 계층(PHY)** 사양 표준 정의

<br />

# 02 무선 LAN(Wi-Fi Network) 표준

**IEEE 802.11 표준: 무선 LAN의 기술적인 표준**

- 와이파이(Wi-Fi): 표준에 근거한 무선 LAN 장비들에 대한 상표명

## IEEE 802.11 표준에 근거한 무선 LAN의 속성

- IEEE 802.11 (초기 버전) : 2Mbps의 속도, 2.4GHz CSMA/CA 방식
- IEEE 802.11b : 11Mbps 전송속도, CSMA/CA 기술 구현
- IEEE 802.11a : 54Mbps 전송속도, 5GHz OFDM 기술 사용
- IEEE 802.11g : 54Mbps 전송속도, 2.4GHz 대역으로 호환성 확보
- IEEE 802.11n : 300Mbps 전송속도, 2.4GHz & 5GHz 대역 사용
- IEEE 802.11ac : 867Mbps 전송속도, 다중 단말 시 1Gbit/sec, 단일 링크 500Mbit/sec, MIMO 다중 안테나 기술
  - **MIMO: Multiple Input, Multiple Output** 기능
- IEEE 802.11ad : 7Gbit/sec 전송속도, 60GHz 대역 사용
- OFDM (Orthogonal Frequency Division Multiplexing) -고속의 송신 신호를 수백개 이상의 직교(Orthogonal)하는 협대역 부 반송파(Subcarrier) 로 변조시켜 다중화하는 방식
  - 직교 주파수 분할 다중화 기술
- MIMO, Multiple Antenna Technology, **Multiple Input Multiple Output** - **다중 안테나**, 다중 입출력, 다중 송수신 안테나 기술, 다중 입출력 안테나 기술, 다중입력 다중출력
  - 송신: TX(Transmition), 송신: RX

## 변조 방식

- **직접 확산 방식**(**`DSSS`** **: Direct Sequence Spread Spectrum**)은 15개의 중첩 채널을 사용하며 / 실질적으로는 독립 채널은 3개 밖에 사용할 수 없다. / 주파수 채널을 할당할 때 **고정 할당 방식**을 이용하며, / 각 클라이언트에 대한 **수작업 세팅에 의해 → 클라이언트가 사용할 주파수 채널을 고정 할당**한다.
  - 통신하려는 주파수를 직접 수동으로 결정함
  - 도청 어려움 → 보안성(군대에서 주로 사용)
- **주파수 도약 확산 스펙트럼 (`FHSS`** **: frequency hopping spread spectrum**)는 23개의 독립 채널을 사용하고 / **시스템에 의해 자동 할당**되어 / 23개 채널 전체에 걸쳐 Random Hopping Sequence에 의해 → **무작위로 주파수 채널을 도약**하며 데이터를 송수신한다.
  - 특정 채널을 **쓰지 않거나 채널에 문제가 생기면** → 다음 채널을 쓰도록 **자동으로 채널을 바꿔**줌
  - 도청 위험

## 보안 기술

**`WPA(Wi-fi Protected Access)`** : **Wi-Fi 네트워크 보안 기술**, TKIP(Temporal Integrity Protocol)와 AES(Advanced Encryption Standard) 두 가지 표준 기술 중 하나를 사용하여 WEP(Wired Equivalent Privacy)보다 강력한 암호를 제공.

- 현재(WiFi 6 ~ 6E)는 WPA 3 사용

<br />

# 03 무선 LAN(Wi-Fi Network) 기술

- **이동성**, **확장성** 그리고 **편리성**으로 확산 (모바일 네트워크와의 융합으로 확산 속도 증폭)
- 일반 기업, 공공장소, 학교 캠퍼스 및 가정까지 사용 범위 확대
- 관리 무관심과 정보 보호 마인드가 없어 → 보안 유지하기 위해 → 일부 기관은 사용에 제한

> [!NOTE]
> 연결되는 컴퓨터에 LAN 카드가 있어야 함

## 무선 LAN 기술 개요

- **ISM 대역**(ISM band)은 산업·과학·의료(**Industry-Science-Medical**) 등에 쓰이는 **주파수 대역**.
- ISM 대역 중 902~928MHz, 2.4~2.48GHz 그리고 5.725~5.85GHz 주파수 대역을 사용
- 국제 전기 통신 연합 (**ITU**)이 / 전파를 유일하게 무선 통신 이외의 산업, 과학, 의료에 / 고주파 에너지원으로 사용하기 위해 / 지정한 주파수 대역.

## 1️⃣ ⭐ CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)

> [!NOTE]
>
> 전송 감지 + 동시 접속 + 충돌 회피
>
> - 무선 랜에서 쓰는 Media Access Control(매체 접근 제어)
> - 충돌을 미리 피함.
> - 보낼 때마다 확인 신호를 전송하기 때문에 전송 지연 발생

### 무선 LAN 사용 MAC 알고리즘

- 이더넷(CSMA/CD)과는 달리, **데이터 전송이 없어도 충돌을 대비**하여 → **확인 신호 전송 후** (충돌이 없을 경우) 데이터를 전송함
- 💩 **네트워크 사용 빈도 증가 시 → 전송 지연 발생**

### RTS / CTS

- **`RTS(Ready To Send)`**: 송신요구 - 송신측이 → 수신측에게 / 본격적인 데이터를 전송할 의사가 있음을 알리는 신호
- **`CTS(Clear To Send)`**: 송신가능 - 수신측이 → 송식측에게 / 데이터를 받을 준비가 되어서 전송해도 좋다는 허락 신호
- RTS/CTS 교환 절차 (RTS/CTS + ACK;Acknowledgement;확인응답신호)
  1. 송신 노드는 채널이 빈 것(idle)을 알고난 후, **DIFS(Distributed Inter-Frame Space; 데이터 전송하기 전에 기다려야 하는 대기 시간)**만큼 기다린 후, **`RTS`** 송출
  2. 수신 노드는 **`RTS`** 수신 후, **SIFS(Short Inter-Frame Space; 데이터 전송 간 짧은 대기시간)**만큼 기다린 후, **`CTS`** 송출
  3. 송신 노드는 SIFS만큼 기다린 후, 데이터 송출 시작
  4. 수신 노드는 SIFS만큼 기다린 후, **`확인응답(ACK)`** 송출

### IFS(Infer Frame Space)

공유 무선 매체에서 여러 무선 단말이 동시 접근 시 → **충돌 회피를 위해 바로 데이터를 송출하지 않고, 일정 대기하는 접근 연기**(Access Defer)

### SIFS(Short IFS)

가장 짧은 대기지연 시간 (가장 높은 우선순위)

- RTS, CTS, ACK 프레임, Fragment된 연속 프레임 등에 사용됨
- 데이터 패킷의 확인응답/폴링응답 등과 같은 짧은 제어 프레임이 그 대상
  - 폴링(polling): 하나의 장치가 / 충돌 회피 또는 동기화 처리 등을 목적으로 / 다른 장치의 상태를 주기적으로 검사하여 / 일정한 조건을 만족할 때 / 송수신 등의 자료처리를 하는 방식

### ⭐ DIFS(Distributed IFS)

무선단말이 무선매체에 접근하여 / 데이터를 송출하려고 할 때 → 무선단말이 무선매체를 **마지막으로 사용한 직후부터 기다려야 할 최소 시간**(**데이터 전송하기 전에 기다려야 하는 대기 시간**)

- 긴급 성격의 ACK 제어프레임 및 CTS 프레임을 제외하고는 / 모든 다른 프레임들은 전송 전에 최소한 하나의 DIFS만큼 기다려야 함
- DIFS = aSIFSTime + 2(aSlotTime)

## 2️⃣ DSSS, FHSS

### DSSS (Direct Sequence Spread Spectrum; 직접확산방식)

**고정 주파수 할당 방식** 채택

- → 해당 채널이 잡음,전파간섭에 의해 차단됐을 경우 → 시스템에 대한 **자동 채널 변경 능력이 없음**
- → **수작업으로** 해당 채널 사용자의 컴퓨터 셋팅을 변경시켜줘야만 잡음,전파간섭에 의해 **차단되지 않은 채널을 할당**해 데이터 송수신을 할 수 있음
- 군사통신 등 중요한 통신에서 도청을 방지하기 위해 사용했으나, 최근에는 상용무선통신에서도 사용

### FHSS (Frequency Hopping Spread Spectrum; 주파수 도약 확산방식)

- **시스템에 의해 자동 할당** → 23개 채널 전체에 Random Hopping Sequence에 의해 무작위로 주파수 채널을 Hopping하여 데이터를 송수신
- 무작위로 채널 도약(hopping) 시 → 도약하기 전 대상 채널에 대한 사전 스캐닝 기능이 있음
  - 도약하고자 하는 대상 채널에 잡음, 전파간섭 있을 경우 해당 채널 회피
  - 시스템에 의해 자동으로 다른 채널로 도약
  - → 잡음, **전파간섭에 영향받지 않고** 안정된 데이터 송수신 가능

### DSSS vs FHSS 비교

페이딩 현상이 심한 경우(**전파가 불규칙할 경우) 주파수 호핑 방식** 사용

신호 대 잡음 비(Signal/Noise)⬆️ 신호 잘 전달됨

Near-Far 문제: 수신기가 송신기 전파를 과도하게 받아서 (수신기가) 정상적으로 작동하지 못하는 문제

FH는 방식은 오류 정정 기술 필요 → 구조가 복잡하다는 의미

## 3️⃣ OFDM (Orthogonal Frequency Division Multiplexing; 직교 주파수분할 다중 방식)

### 등장배경

10Mbps 이상의 고속 전송 시 DSSS 방식의 하드웨어 복잡성 증가, 정확한 동기의 어려움

→ 고속의 송신 신호를 수백 개 이상의 직교(Orthogonal)하는 협대역(좁은 대역) 부반송파(Subcarrier)로 변조시켜 다중화 방식으로 / **‘변조’ 및 ‘다중화’를 동시에 수행**하는 전송기법인 OFDM 등장

> [!NOTE]
>
> **데이터를 여러 개의 작은 subcarrier로 나누어 전송하는 방식**
>
> 각각의 서브캐리어가 서로 직교 관계를 유지 → 주파수 간섭을 최소화, 데이터 전송 효율 극대화
>
> 특징
>
> - **주파수 분할**
>   - 하나의 넓은 대역을 여러 개의 좁은 서브캐리어로 나눠서 병렬로 데이터를 전송
>   - 서브캐리어가 서로 겹치지 않고 직교 관계에 있어 → 주파수 간섭 최소화 + 데이터 전송 속도 높일 수 있음
> - **직교성(Orthogonality):** 서브캐리어들이 서로 직교 관계 유지 → 서로 간섭하지 않도록 전송 → **주파수 간 간섭을 줄여 → 데이터 손실 방지**, 주파수 자원 효율적 사용
> - **멀티패스 간섭에 강함:** 신호가 여러 경로를 통해 수신되면서 발생하는 멀티패스 간섭 효과적으로 처리

### 원리

- 변조와 다중화를 동시에 수행
- 부 반송파간 직교성을 유지
- 부 반송파 간격
- 부 반송파 개수
- 시간 및 주파수 스케줄링
- FDMA (1G) → TDMA (2G) → CDMA (3G) → OFDMA (4G LTE)

## 4️⃣ MIMO (Multi-Input Multi-Output; 다중입력 다중출력 방식)

- 한정된 주파수 자원의 효율적 활용, 통신 용량의 증대
- 기존방식(SISO; Single-Input Single-Output)으로는 제한적인 대역폭의 배가를 위해 **복수의 안테나**를 적용
