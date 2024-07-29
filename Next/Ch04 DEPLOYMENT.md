# CSS Modules

아무런 configuration이 필요하지 않고 CSS 파일을 import하면 됨

## global.css

root layout에 import할 경우 → 전체 애플리케이션에 적용됨

## navigation.module.css

> Next.js에는 .module.css 확장자를 사용하여 CSS 모듈을 기본적으로 지원합니다.
>
> CSS 모듈은 고유한 클래스 이름을 자동으로 생성하여 CSS 범위를 로컬로 지정합니다.
>
> 이를 통해 충돌에 대한 걱정 없이 다른 파일에서 동일한 클래스 이름을 사용할 수 있습니다.
>
> 이러한 동작으로 인해 CSS 모듈은 컴포넌트 레벨 CSS를 포함하는 이상적인 방법이 되었습니다.

- 특정 컴포넌트에 적용되는 CSS 파일

  - css 파일명을 `.module.css`로 설정 (위치는 상관 없음. 다만 스타일링을 적용하는 컴포넌트 옆에 두는 것이 일반적임)

- 태그가 아닌 **classname이나 id로 시작해야 함**

  - 일반적인 것은 global 파일에서 설정

- CSS 파일을 javascript 파일인 것처럼 import (styles를 classname들을 보유한 JavaScript object인 것처럼 처리)

이 방식으로 하면 뒤에 언더바와 랜덤한 문자열이 추가되어 class의 충돌이 일어나지 않음
