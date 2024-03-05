---
tags:
  - test
---

# React Testing library

## 프론트엔드에서 테스트를 하는 이유와 방법

> [The more your tests resemble the way your software is used, the more confidence they can give you.](https://twitter.com/kentcdodds/status/977018512689455106) - Kent C. Dodds

- 테스트가 소프트웨어를 사용하는 방식과 흡사해질수록 더 많은 확신을 준다
- 이말은 즉, 소프트웨어의 세부 구현사항에 대한 테스트보다 "사용자가 어떻게 소프트웨어를 사용하는지"를 테스트하라는 말이다.
- 세부 구현 사항을 테스트하면 False Nagative(테스트는 깨지지만 SW가 정상적으로 동작함) 혹은 False Positive(테스트는 동작하지만 SW가 잘 작동함)에 빠질 수 있다.

## 어떤 테스팅 도구를 사용할지?
- [@testing-library/react](https://testing-library.com/) 가 react 생태계에서 가장 많이 사용하는 테스팅 도구이다
- hook 테스팅을 위한 라이브러리인 @testing-library/react-hooks 도 있다. hook을 테스팅하기 위해 둘 중 어떤 도구를 사용할지 고민이 되었다.
- hook 만 테스트하기 위해 @testing-library/react 를 사용할 필요가 있는지 고민하게 되었다. [@testing-library/react-hooks 가 탄생한 이유도 hook 테스팅을 위해 불필요하게 component 를 만들지 않기 위함이다.](https://arc.net/l/quote/fwfjwbby)
- 그러나 [#991 feat: Add `renderHook`](https://github.com/testing-library/react-testing-library/pull/991) 에서 react18과의 호환성을 위해 @testing-library/react 에 renderHook 메서드를 추가했다. 결론은 accept되었다.
- [react18을 지원한다면 `testing-library/react` 를 사용](https://github.com/testing-library/react-hooks-testing-library?tab=readme-ov-file#a-note-about-react-18-support)하라고 권장하고 있다.

> **결과적으로 추후 react18 의 feature를 반영한 Hook을 만들 생각이고, 컴포넌트 테스트도 진행할 거기 때문에 @testing-library/react 를 사용하기로 결정했다.**

## Reference
- https://kentcdodds.com/blog/testing-implementation-details