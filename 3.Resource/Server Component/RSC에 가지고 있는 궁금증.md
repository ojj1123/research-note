## RSC 가 기존 SSR과 다른 점


## RSC가 해결하고 있는 문제


## RSC 를 프러덕트에서 잘 활용하려면 무엇이 필요한가?
[RFC about Server Component](RFC%20about%20Server%20Component.md)
> 아직 React 팀에서도 연구하고 있는 부분

- 개발자 도구
- Framework ([Bundler](Bundler), [Router](Router.md) 통합)
- 캐싱 (mutation, invalidate) => [Caching in Next.js](../../3.Resource/Nextjs/Caching%20in%20Next.js.md) (next.js 가 서버컴포넌트에 대해 어떤 캐시 레이어를 만들었는지?)
- refetch (pagination, particial refetch)
- pre-rendering
- SSG와 RSC와의 통합

## 현재 RSC의 문제점?

## RSC가 실제 프러덕트(내가 알고 있는 구체적인 프러덕트: 토스, 당근, saas 서비스 등)에 사용된다면 어떤 비즈니스 이점을 가져올 수 있는지?

## Client component 는 서버에서 호출되지 않나?
- 아니다. 서버에서 호출된다. 서버에서 HTML로 생성되 클라이언트로 넘어가고 클라이언트에서 번들된 JS로 Hydrate 한다. Client component 는 기존에 우리가 알고 있는 react 컴포넌트다. server component에 반대되는 개념이다.
	- [Why do Client Components get SSR'd to HTML?](https://github.com/reactwg/server-components/discussions/4)
- RSC는 server-only 환경에서만 실행된다.
- RSC 가 먼저 실행되고 "그 다음" Client component가 실행된다 [tweet](https://x.com/dan_abramov2/status/1747437373036667342?s=20)