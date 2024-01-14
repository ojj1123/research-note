## RSC 가 기존 SSR과 다른 점


## RSC가 해결하고 있는 문제


## RSC 를 프러덕트에서 잘 활용하려면 무엇이 필요한가?
[RFC about Server Component](RFC%20about%20Server%20Component.md)
> 아직 React 팀에서도 연구하고 있는 부분

- 개발자 도구
- Framework ([Bundler](Bundler), [Router](Router.md) 통합)
- 캐싱 (mutation, invalidate) => [Caching in Next.js](Caching%20in%20Next.js.md) (next.js 가 서버컴포넌트에 대해 어떤 캐시 레이어를 만들었는지?)
- refetch (pagination, particial refetch)
- pre-rendering
- SSG와 RSC와의 통합

## 현재 RSC의 문제점?

## RSC가 실제 프러덕트(내가 알고 있는 구체적인 프러덕트: 토스, 당근, saas 서비스 등)에 사용된다면 어떤 비즈니스 이점을 가져올 수 있는지?
- 