## Motivation
https://waku.gg/blog/introducing-waku

- [Data fetching with RSC](Server%20Component/Data%20fetching%20with%20RSC.md) 기능은 일부 프레임워크에 의존하고 있다 (최소한 번들러만큼은 필요함)
- 기존 프레임워크는 SSR, SSG 위에서 동작하는 RSC를 설계하고 있다. RSC 기능만으로는 어플리케이션이나 라이브러리를 개발하는 방법을 배우고 실험하는 것은 다소 복잡하다
- **Waku는 RSC 의 기능을 탐구하고 학습할 수 있도록하는 최소한의 API를 제공하는 것이 목표이다. 뿐만아니라 SSR, SSG에 의존하지 않고 RSC의 best practice를 발굴하는 것이 목표이다**

## waku pageage structure
- lib - waku 메인 비즈니스 로직
	- builder - dev or 빌드할 때 필요한 로직
		- build.ts - PRD에서 사용됨
	- handlers - (plugins폴더에 있는) vite 플러그인 사용, renderer 로 html/rsc 렌더링
		- dev-worker-api.ts: worker 를 사용하는데 필요한 API 구현
			- initializeWorker
			- getWorker
			- registerReloadCallback
			- registerImportCallback
			- registerModuleCallback
			- renderRscWithWorker
			- getSsrConfigWithWorker
		- dev-worker-impl.ts : dev환경에서 2개의 thread(main thread와 worker thread)를 사용함.
		- vite 플러그인을 사용하는 dev, prd 전용 핸들러 있음
	- middleware
	- plugins - vite rsc 플러그인
		- vite-plugin-rsc-delegate.ts
		- vite-plugin-rsc-hmr.ts
		- vite-plugin-rsc-reload.ts
	- renderers - [renderToReadableStream](https://react.dev/reference/react-dom/server/renderToReadableStream) 메서드 사용
		- html-renderer.ts : build, prd, dev 에서 html을 만드는 로직
		- rsc-renderer.ts : rsc 를 만드는 로직
	- utils
	- config.ts
- router - router 로직
	- client.ts - 클라이언트 컴포넌트에서 router 관련 조작(라우팅), 상태를 위한 컴포넌트/메서드
	- common.ts
	- server.ts - 라우팅을 정의 `createPages`, 레이아웃 정의 `createLayout`, defineEntries 에 의존
- cli.ts - CLI 명령어 로직(dev, build, start)
- client.ts - Root, Slot 컴포넌트, **클라이언트에서 서버컴포넌트 호출하는 로직**
- server.ts - `defineEntries`(서버컴포넌트 엔트리)
- prd.ts
	- lib/middleware/hono-prd.js
	- lib/middleware/connect-prd.js
	- lib/handlers/handler-prd.js
- dev.ts
	- lib/middleware/hono-prd.js
	- lib/middleware/connect-prd.js
	- lib/handlers/handler-prd.js
	- lib/builder/build.js
- 