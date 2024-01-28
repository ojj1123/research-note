## Problem
- Anyone have this issue using `next-mdx-remote`?

- Waku's docs use this package. **I think this package is why waku's website run on DEV for a long time initially.**
![](images/Pasted%20image%2020240128004643.png)
## Solution
- I externalize `next-mdx-remote` in only dev
	```js
	// vite.config.js
	import { defineConfig } from "vite";
	export default defineConfig(({ mode }) => {
		if (mode === "development") {
			return {
				ssr: {
					external: ["next-mdx-remote"],
				},
			};
		}
		return {};
	});
	```


- [Vite ssr external option](https://vitejs.dev/guide/ssr#ssr-externals)
	- Dependencies are "externalized" from Vite's SSR transform module system *by default*. This helps both dev and build speed up
	- Taking advantage of Vite's HMR, Linked dependencies are NOT externalized by default.

## Wrap up
- externals [webpack externals 참고](https://webpack.js.org/configuration/externals/)
	- 번들에 의존성을 포함하지 않도록 해주는 기능
	- 런타임에 node_modules, CDN 등 외부에서 의존성을 검색할 수 있음
- vite ssr 모듈 시스템은 기본적으로 의존성을 번들에 포함하지 않음. 단 기본적으로 HMR을 위해 열결된 의존성들이 번들에 포함될 수 있음
	- vite는 ESM 모듈에서 CJS 모듈을 import할 때 위 캡쳐와 같이 에러를 내보냄 related issue: [vite#3024](https://github.com/vitejs/vite/issues/3024)
- **rsc에서 사용되는 라이브러리가 esm을 제공하지 않고 cjs만을 제공한다면 해당 라이브러리를 번들에 포함하지 말아야함.(즉, `ssr.external` 옵션에 해당 의존성을 추가해 줘야함)**