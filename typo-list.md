# 오타 목록

독자분들의 제보를 통해 알려진 책 내의 오타목록과 그 수정사항에 대한 문서입니다.
제보해주신 분들께 깊은 감사의 말씀 드립니다.

## 바로가기

### 114p. 코드 블럭 오타

제보: https://github.com/hwasurr/graphql-book-fullstack-project/issues/14

10번 째 줄 내용

```jsx
<Box bg="gray.100" mt={-3} mx={-3} mb={2} pos="relative">
  <AspectRatio ratio={2 / 3}>
    <Image src={film.posterImg} />
  </AspectRatio>
</Box>
```

을 다음과 같이 정정합니다.

```jsx
<Box bg="gray.100" mt={-3} mx={-3} mb={2} pos="relative">
  <AspectRatio ratio={2 / 3}>
    <Image src={film.posterImg} />
  </AspectRatio>
</Box>
```

### 181p. min -> minLength

제보: https://github.com/hwasurr/graphql-book-fullstack-project/issues/17

암호 필드의 길이를 검사하므로, react-hook-form의 `register` 옵션에 `min`을 `minLength`로 변경해야 합니다.

```jsx
<Input
  type="password"
  placeholder="8자 이상의 영문,숫자,특문"
  {...register('signUpInput.password', {
    required: '암호를 입력해주세요.',
    min: { value: 8, message: '비밀번호는 8자 이상이어야 합니다.' },
    pattern: {
      value:
        // eslint-disable-next-line max-len
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
      message: '암호는 문자,숫자,특수문자를 포함한 8자 이상이어야 합니다.',
    },
  })}
/>
```

을 다음과 같이 정정합니다.

```jsx
<Input
  type="password"
  placeholder="8자 이상의 영문,숫자,특문"
  {...register('signUpInput.password', {
    required: '암호를 입력해주세요.',
    minLength: { value: 8, message: '비밀번호는 8자 이상이어야 합니다.' },
    pattern: {
      value:
        // eslint-disable-next-line max-len
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
      message: '암호는 문자,숫자,특수문자를 포함한 8자 이상이어야 합니다.',
    },
  })}
/>
```
