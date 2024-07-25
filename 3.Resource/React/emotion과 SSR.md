---
tags:
  - ssr
  - react
links:
  - https://emotion.sh/docs/ssr
  - https://mitchell-up.github.io/mitchell-dictionary/blog/emotion/emotion-mechanism/
---
- `@emotion/server` 패키지를 통해 emotion 스타일을 SSR할 수 있음

## 1. `@emotion/css` 와 함께 사용

- [`@emotion/css`](https://emotion.sh/docs/@emotion/css) : framework-agnostic 한 emotion 유틸

### On the server
```jsx
import { CacheProvider } from '@emotion/react'
import { renderToString } from 'react-dom/server'
import createEmotionServer from '@emotion/server/create-instance'
import createCache from '@emotion/cache'

const key = 'custom'
const cache = createCache({ key })
const { extractCritical } = createEmotionServer(cache)

let element = (
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>
)

let { html, css, ids } = extractCritical(renderToString(element))

res
  .status(200)
  .header('Content-Type', 'text/html')
  .send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My site</title>
    <style data-emotion="${key} ${ids.join(' ')}">${css}</style>
</head>
<body>
    <div id="root">${html}</div>

    <script src="./bundle.js"></script>
</body>
</html>`);
```

### On the client
```jsx
const cache = createCache()
ReactDOM.hydrate(
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>,
  document.getElementById('root')
)
```

## 2. `@emotion/react` 와 함께 사용
- [`@emotion/react`](https://emotion.sh/docs/@emotion/react): react 에서 스타일링하는 패키지

### On the server
```jsx
import { CacheProvider } from '@emotion/react'
import { renderToString } from 'react-dom/server'
import createEmotionServer from '@emotion/server/create-instance'
import createCache from '@emotion/cache'

const key = 'custom'
const cache = createCache({ key })
const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache)

const html = renderToString(
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>
)

const chunks = extractCriticalToChunks(html)
const styles = constructStyleTagsFromChunks(chunks)

res
  .status(200)
  .header('Content-Type', 'text/html')
  .send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My site</title>
    ${styles}
</head>
<body>
    <div id="root">${html}</div>

    <script src="./bundle.js"></script>
</body>
</html>`);

```

### On the client
```jsx
const cache = createCache()
ReactDOM.hydrate(
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>,
  document.getElementById('root')
)
```

