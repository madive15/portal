### 기본 환경
- vue 3.x(최신)
- vue-router(최신)
- pinia(최신)
- Nuxt(최신)
- antd 4.x
- 추후 환경은 변경될 수 있음

## 최초 세팅
- terminal(혹은 command창): yarn install --offline
- 실행 시 yarn dev

## 개발 시 중요 사항
- 환경설정 변경 필요 시 PL 보고(허가 없이 변경 시 책임 추궁)
- 모든 파일은 업무 기준으로 작성됨(예: 사용자 > user)
- 공통사항으로 적용되는 경우 utils 사용할 것!
- 모든 네이밍은 명확한 단어로 사용할 것!
- 반드시 저장할 경우 Eslint, Prettier 적용

## 공통 단어 주의사항
- 비즈니스 로직은 공통이 아님(불허)
- 공통은 언제든지 사용할 수 있는 라이브러리성을 말하는 것임

## Commit 금지 파일 및 디렉토리
- /node_modules/
- 기타 IDE 환경 파일(.classpath 등등)

### 페이지 작성
- pages/도메인/index.vue
- 페이지는 controller와 같은 역할을 함
- useHead를 이용하여 html head 영역을 설정함

### 페이지 내 컴포넌트
- /src/components/도메인/컴포넌트명.vue

### store 작성 위치
- 디렉토리: /src/stores/도메인/index.types.ts

### api 작성 위치
- 디렉토리: /src/apis/도메인/index.types.ts

### Type 지정
- type 및 interface로 타입을 지정하는 경우가 많음
- 법률구조공단은 type으로 모든 객체의 타입을 지정하는 것을 원칙으로 함
- 최대한 undefined를 사용하지 않는 선으로 개발할 것
- 예로 userId: string의 경우 빈값을 표현할 때 userId: '' 형식으로 사용할 것!
- 타입 import 시 아래와 같이 type을 지정해야 함
```
import type {UserItemType} from 'types'
```


### Toast UI Calendar
```
// ES MODULE
import Calendar from '@toast-ui/calendar';

// CSS 적용
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
```

### Toast UI Grid
```
// ES MODULE
import 'tui-grid/dist/tui-grid.css';
import 'tui-date-picker/dist/tui-date-picker.min.css';

// CSS 적용
import Grid from 'tui-grid';
```