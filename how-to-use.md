# 구성이 완료된 프로젝트 다운로드 설명

3장 4절의 "프로젝트 구성" 단계에서 문제가 생겨 더이상 프로젝트에 진행이 되지 않는 분들은 아래 설명을 따라 구성이 완료된 프로젝트에서 곧바로 시작할 수 있습니다.

## 준비사항

1. Git이 설치되어 있어야 합니다.
2. Github 아이디가 있고, 본인의 Github 아이디로 현재 로그인 되어 있어야 합니다.

## 주의

Docker, MySQL, Redis, VSCode 와 같은 경우에는 책의 내용에 따라 설치를 진행하셔야 합니다.

## 설명

프로젝트 진행에 필요한 구성이 완료된 상태를 그대로 가져가 작업하시기 위한 작업에 대한 설명입니다.

1. 먼저 Github Fork를 진행합니다.

   현재 페이지 우측 상단의 `Fork` 버튼을 눌러 자신의 Github 저장소로 현재 저장소를 복제합니다.

2. 생성된 저장소의 코드를 `clone` 하여 로컬 환경에 작업환경을 생성합니다.

   ```bash
   # 프로젝트를 진행할 디렉토리에서
   git clone https://github.com/<자신의Github아이디>/graphql-book-fullstack-project
   ```

3. 원격에 존재하는 `chapter-3` 브랜치로 현재 브랜치를 변경합니다. `chapter-3` 브랜치는 3챕터까지의 내용만 반영되어 있어, 프로젝트가 구성된 상태까지만 가져와 작업을 시작할 수 있습니다.

   ```bash
   git checkout chapter-3
   ```

   미리 구성된 접근 가능한 브랜치는 다음과 같습니다.

   - 완성된 프로젝트: [master](https://github.com/hwasurr/graphql-book-fullstack-project/tree/master)
   - 챕터별 구성된 브랜치
     - [chapter-3](https://github.com/hwasurr/graphql-book-fullstack-project/tree/chapter-3)
     - [chapter-4](https://github.com/hwasurr/graphql-book-fullstack-project/tree/chapter-4)
     - [chapter-4.1](https://github.com/hwasurr/graphql-book-fullstack-project/tree/chapter-4.1)
     - [chapter-4.2](https://github.com/hwasurr/graphql-book-fullstack-project/tree/chapter-4.2)
     - [chapter-4.3](https://github.com/hwasurr/graphql-book-fullstack-project/tree/chapter-4.3)
     - [chapter-5](https://github.com/hwasurr/graphql-book-fullstack-project/tree/chapter-5)
     - [chapter-5.2](https://github.com/hwasurr/graphql-book-fullstack-project/tree/chapter-5.2)
     - [chapter-5.3](https://github.com/hwasurr/graphql-book-fullstack-project/tree/chapter-5.3)
     - [chapter-5.4](https://github.com/hwasurr/graphql-book-fullstack-project/tree/chapter-5.4)
     - [chapter-6](https://github.com/hwasurr/graphql-book-fullstack-project/tree/chapter-6)
     - [chapter-6.1](https://github.com/hwasurr/graphql-book-fullstack-project/tree/chapter-6.1)
     - [chapter-6.2](https://github.com/hwasurr/graphql-book-fullstack-project/tree/chapter-6.2)
     - [chapter-7](https://github.com/hwasurr/graphql-book-fullstack-project/tree/chapter-7)

4. 이제 구성된 프로젝트에서 작업을 시작할 수 있습니다. 본인만의 브랜치를 따로 만들고 싶은 경우 `git checkout -b <브랜치명>`명령 을 통해 새로운 브랜치를 만들어 진행할 수 있습니다.

문제가 있는 경우, issue 게시판을 활용해주세요.
