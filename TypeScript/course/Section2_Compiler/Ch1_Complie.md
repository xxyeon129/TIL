매번 tsc 명령어 써서 컴파일하기 번거로움 → 여러 방법의 컴파일 기능들이 존재

# watch 모드 사용하기

ts 파일을 변경할 때마다 변경 사항을 웹페이지 출력에 반영하고 싶다면 → watch 모드

```tsx
tsc app.ts -w
```

- 허용되지 않는 작업을 수행하는 경우 → re-compile 되지만, command를 직접 실행해 보면 터미널에 컴파일 오류가 출력됨
- 단점: 파일을 구체적으로 지정해야 함
- 규모가 큰 프로젝트에서는 보통 사용하지 않음

# 전체 프로젝트 다수의 파일 compile

- ~~index.html에서 `<script src=”파일명.js” defer>` 추가하고 `tsc` 명령어 입력하면 모든 스크립트 파일을 다시 컴파일할 수 있음~~
- `tsc --init` tsconfig.json 파일이 만들어지는 명령어 → 커맨드가 실행되는 폴더의 모든 항목을 알려줌
  - tsconfig.json 파일 만들고 터미널에 `tsc` 명령어 입력하면 모든 ts 파일을 컴파일하고 js파일을 생성해줌
  - `tsc -w` `tsc --watch` 모든 ts 파일에 watch 모드가 적용됨
  - 이제 변경 사항을 적용하고 저장하면 변경된 파일이 다시 컴파일되고, js파일로 변경사항이 저장됨

# 파일 포함 및 제외하기

tsconfig.json 파일에서 맨 아래 중괄호로 닫은 부분 뒤에 옵션을 추가할 수 있음

## exclude

```json
{
  "compilerOptions": {
    ...
    /* Completeness */
    // "skipDefaultLibCheck": true,
    "skipLibCheck": true
  },
  "exclude": [
    // js 파일로 컴파일 시 포함되어서는 안 되는 ts파일
		"analytics.ts"

		// dev.ts로 끝나는 모든 파일이 컴파일되지 않도록 입력하기
		"*.dev.ts"
		// 어떤 폴더에 있는 어떤 파일이라도 dev.ts로 끝나면 모두 다 무시됨
		"**/*.dev.ts"

		// 일반적으로 exclude에 설정하는 파일
		"node_modules"
		// 근데 "exclude" 옵션을 아예 지정하지 않으면
		// node_modules는 기본 설정상 자동으로 제외됨
		// 따라서 node_modules만 제외할 거라면 excludes를 쓸 필요가 없음
		// 하지만 다른 파일도 exclude에 넣어서 추가했다면, node_modules도 설정해야 함
  ]
}
```

- 이 옵션은 컴파일러나 컴파일 단계 동작에 영향을 미치지 않고, 컴파일러가 프로젝트에서 작동하는 방식임

## include

컴파일 과정에 포함시킬 파일을 타입스크립트에 알려서, 포함되지 않은 것은 컴파일되지 않도록 함

```json
},
	"include": [
		"app.ts" // app.ts 파일만 컴파일되고, 나머지 ts 파일은 컴파일 X
	]
}
```

- exclude와 include를 함께 설정하면, exclude를 제외한 채 include를 컴파일함

## files

files 옵션으로 개별 파일을 지정할 수 있음

- include: 제외하고자 하는 항목으로 전체 폴더를 지정
- files: 컴파일하고자 하는 개별 파일만을 지정
- 규모가 작은 프로젝트에 사용

```json
},
	"files": [
		"app.ts"
	]
}
```
