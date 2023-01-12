# 버그 목록

독자분들의 제보를 통해 알려진 버그의 목록과 그 해결방법에 대한 문서입니다.
제보해주신 분들께 깊은 감사의 말씀 드립니다.

## 바로가기

1. [.prettierrc endOfLine 옵션의 누락](#prettierrc-endofline-옵션의-누락)
2. [type-graphql의 graphql 16 버전 지원 관련 문제](#type-graphql의-graphql-16-버전-지원-관련-문제)
3. [(p. 112 두 번째 코드블럭) 여러 개의 Skeleton 컴포넌트를 렌더링 할 때, key가 동일한 값으로 설정되어 올바르지 않은 버그](#p-112-두-번째-코드블럭-여러-개의-skeleton-컴포넌트를-렌더링-할-때-동일한-값으로-key를-설정하는-문제)

### .prettierrc endOfLine 옵션의 누락

제보 이슈: [#2](https://github.com/hwasurr/graphql-book-fullstack-project/issues/2)

p. 85 ~ p. 90 까지의 eslint, prettier 설정 과정 중, prettier 옵션의 누락이 있어 특정 개발 환경에서 개행문자로 인한 버그가 발생하였습니다.
`endOfLine` 옵션의 값을 `auto` 로 지정하여 해결합니다.

- 기존

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "semi": true,
  "useTabs": false
}
```

- 올바른 .prettierrc 또는 .prettierrc.js

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "semi": true,
  "useTabs": false,
  "endOfLine": "auto"
}
```

### type-graphql의 graphql 16 버전 지원 관련 문제

제보 이슈: [#4](https://github.com/hwasurr/graphql-book-fullstack-project/issues/4), [#8](https://github.com/hwasurr/graphql-book-fullstack-project/issues/8)

type-graphql의 현재(22. 12. 19.) 최신 배포 버전 1.1.1 에서는 graphql 16 버전을 지원하지 않는 것으로 보입니다.

책의 예제를 올바르게 실행하기 위해서는 현재 깃헙 리파지토리의 master 브랜치의 project/server와 project/web의 package.json 파일을 참고하여 버전을 그대로 따라가는 것이 안전하다고 말씀드립니다. 추가로, graphql 16 버전으로 작업하고 싶으시다면 다음 명령어를 통해 graphql 16버전과 호환되는 type-graphql의 베타버전을 설치하여 작업을 진행할 수 있습니다. 그러나 버전 업그레이드로 인해 생겨날 수 있는 새로운 다른 미지의 문제들은 따로 해결해 나가야할 것으로 보입니다. 버전을 변경한 이후에 발생하는 문제와 관련해서는 type-graphql 리파지토리의 이슈를 확인하거나 제안할 수 있습니다.

```bash
# project/server 아래에서
yarn add type-graphql@next
```

또는

```bash
# project/server 아래에서
yarn add type-graphql@2.0.0-beta.1
```

### (p. 112 두 번째 코드블럭) 여러 개의 Skeleton 컴포넌트를 렌더링 할 때, 동일한 값으로 key를 설정하는 문제

제보 이슈: [#10](https://github.com/hwasurr/graphql-book-fullstack-project/issues/10)

- 기존

```typescript
new Array(6).fill(0).map((x) => <Skeleton key={x} height="400px" />
```

- 올바른 코드블럭

```typescript
// eslint-disable-next-line react/no-array-index-key
new Array(6).fill(0).map((_, index) => <Skeleton key={index} height="400px" />
```
