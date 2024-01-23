https://youtu.be/TQQPAU21ZUw?si=2Y8m6MXnrtVjOUS0

## 리액트팀이 서버컴포넌트를 통해 얻고 싶은 것
by Dan Abramov
- Good User Experience
- Cheep Maintainance
- Fast Performance

## 서버컴포넌트의 특징
- 번들이 클라이언트 사이드로 넘어오지 않음
- 서버컴포넌트는 백엔드 리소스에 직접적으로 접근할 수 있다
- 서버컴포넌트는 클라이언트 컴포넌트를 import 할 수 있고, props도 넘겨줄 수 있음
	- 그러나 props는 [직렬화(serialization)](serialization) 가능한 것만 가능하다.
	- 함수를 넘겨줄 수 는 없다
	- jsx는 가능하다
- 서버컴포넌트는 interactive할 수 없다
	- state, effect, 이벤트 리스너를 가질 수 없다
- SSR과는 다른 점이 있다
	- SSR은 HTML을 서버에서 렌더링하고 javascript 번들을 클라이언트로 함께 보낸다.
	- 서버컴포넌트는 refetch되더라도 클라이언트 상태가 유지된다. 이는 서버컴포넌트는 서버에서 HTML로 렌더링 되지 않기 때문이다
	- ![스크린샷 2023-12-17 00.05.02](스크린샷%202023-12-17%2000.05.02.png)
	- SSR과 서버컴포넌트는 서로 상호보완적이다
- 네트워크가 느린 환경에서 서버컴포넌트를 사용하면 오히려 사용자 경험이 안좋은거 아니야?
	- Suspense와 서버컴포넌트를 같이 사용하여 서버컴포넌트가 렌더링 되는 동안 fallback을 보여줄 수 있다
- 서버컴포넌트는 필요한 코드만 다운로드할 수 있게 해준다
	- 자동으로 코드 스플릿팅 지원해준다
	- 이는 번들러 덕분에 가능한 것이다