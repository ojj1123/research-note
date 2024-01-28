# How to work vite dev server
https://ko.vitejs.dev/guide/why.html

- 개발환경에서 하이브리드 전략
	- 의존성은 pre-bundle using ESbuild
		- "의존성은 개발할 때 내용이 바뀌지 않는" 특성 이용
		- ESbuild의 높은 번들링 속도 이용
	- 소스코드는 esmodule using native module system
		- 소스코드는 개발 시 자주 바뀌는 역할
		- ESM을 제공하는 브라우저가 마치 번들러 역할을 하도록 함

![](images/스크린샷%202024-01-28%20오후%208.36.05.png)