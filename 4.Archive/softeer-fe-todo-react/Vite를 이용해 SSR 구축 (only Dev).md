# DEV 환경 SSR 구축

구현 PR https://github.com/ojj1123/fe-react-todo/pull/8

## 학습 내용
### vite dev server 동작 원리
  - `createServer` 함수 호출 -> `ViteDevServer` 인스턴스 반환
  - `viteDevServer.listen` 으로 서버 시작

### 동작원리 및 코드
- 생성된 middleware(`ViteDevServer.middlewares`로 connect 의 인터페이스를 따름 [참고](https://ko.vitejs.dev/guide/api-javascript.html#vitedevserver))를 express에 등록함
	- HMR 등 dev 서버의 기능들을 사용할 수 있게 해줌
```js
import fs from "fs"
import express from "express"
import { createServer as createViteServer } from "vite"

const app = express()

// 0. `createServer`시 `middlewareMode` 설정 + 기타 옵션 설정 -> 자체 서버가 아닌 middleware만 생성해줌
const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: "custom",
})

app.use(vite.middlewares)

app.use("*", async (req, res, next) => {
  const url = req.originalUrl

  try {
    // 1. `index.html`을 읽음
    let template = fs.readFileSync("./index.html", { encoding: "utf-8" })

	// 2. `ViteDevServer.transformIndexHtml`로 `index.html`에 클라이언트측 hmr 로직 주입
    template = await vite.transformIndexHtml(url, template)

    // 3. `ssrLoadModule`을 통해 server-entry 모듈을 불러옴
    const { render } = await vite.ssrLoadModule("./src/entry-server.tsx")

    // 4. server-entry에서 불러온 모듈은 `ReactDOMServer.renderToString` 을 호출하여 결과값을 저장
    const { html: appHtml } = render()

    // 5. 서버측 렌더링 결과 값을 `index.html` 내의 `placeholder`에 넣어줌
    const html = template.replace("<!-- app-body -->", appHtml)
    
    // 6. 최종적으로 생성한 html을 응답으로 보냄
    res.status(200).set("Content-Type", "text/html").end(html)
  } catch (e) {
    vite.ssrFixStacktrace(e)
    next(e)
  }
})

app.listen(5173)
```

```js
// entry-server.tsx
// ReactDOMServer.renderToString을 이용해 React 컴포넌트를 html로 생성함
import React from "react"
import ReactDOMServer from "react-dom/server"
import App from "./App"

export function render() {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  return { html }
}
```

```js
// entry-client.tsx
// html에 해당 모듈을 불러와 hydration을 진행함
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"

// 7. `ReactDOM.hydrateRoot` 를 통해 `hydration` 진행
ReactDOM.hydrateRoot(
  document.getElementById("root")!,
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```


### 궁금증
- `ssrLoadModule`의 기능이 정확히 무엇을 하는 것인가? HMR 을 위한 것인가?

## 고민사항
- 만약 routing 기능을 구현해본다면? 폴더기반 router 를 어떻게 구현해볼 수 있을까?
	- 요청 url path와 component/page 폴더의 폴더 path를 매칭시켜 필요한 컴포넌트를 렌더링하는 방식으로 구현할 수 있을 거 같음

## 참고
- [[Vite docs] 서버 측 렌더링 (SSR)](https://ko.vitejs.dev/guide/ssr.html)
- [[Vite docs] ViteDevServer](https://ko.vitejs.dev/guide/api-javascript.html#vitedevserver)
- [ReactDOMServer.hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)
- [vite ssr ts example](https://github.com/bluwy/create-vite-extra/tree/master/template-ssr-react-ts)
