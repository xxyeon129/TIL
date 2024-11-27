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
