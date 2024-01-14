https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md
## 서버컴포넌트의 Motivation
- 개발자가 기본적으로 좋은 퍼포먼스를 가져갈 수 있도록 하는 것
- 리액트 앱에서 data fetching을 더욱 쉽게 해주는 것

✅ : 내가 공감하는 RSC의 motivation

1. ✅ Zero-Bundle-Size Components
	- 사용자와 상호작용하지 않는 컴포넌트라면 서드파티 라이브러리의 번들을 사용자가 모두 받을 필요가 없을 수 있다
	- 서버에서 렌더링하여 서드파티 라이브러리 번들을 zero로 만들어줄 수 있다
2. Full Access To the Backend
3. ✅ Automatic Code Splitting
	- Code Spliltting을 통한 성능 향상
4. ✅ No Client-Server Waterfalls
5. Avoiding the Abstraction Tax
6. ✅ Distinct Challenges, Unified Solution
	- 순수한 서버 렌더링과 순수한 클라이언트 렌더링으로는 충분하지 않다
	- 서버 렌더링은 서버 리소스에 쉽게 접근해 정적인 콘텐츠를 빠르게 보여줄 수 있는 반면 클라이언트 렌더링은 사용자에게 즉각적은 피드백을 제공해줄 수 있는 풍부한 인터렉션을 제공해줄 수 있다
	- 서버 렌더링을 위해 PHP, Rails를 이용하고 클라이언트 렌더링을 위해 React를 사용할 수 있겠지만 이는 곧 여러 기술을 알고 있어야 함을 의미한다
	- **React 의 목표는 React라는 하나의 라이브러리로 서버/클라이언트 렌더링을 지원해주는 것이다**

## 서버컴포넌트 세부 디자인
- 프레임워크 제작자 입장에서 고려할 것

- 