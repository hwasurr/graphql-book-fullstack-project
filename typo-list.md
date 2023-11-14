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
    <Image src={film.posterImg}
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
