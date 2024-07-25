
## 참고
- [Dev mode slow compilation #48748](https://github.com/vercel/next.js/issues/48748)
- Next.js 에서 `.next/trace` viewer를 공개함 👉 [comment](https://github.com/vercel/next.js/issues/48748#issuecomment-2119175360)
- https://nextjs.org/blog/next-13-5

## 개요
- 프로젝트가 커지고 의존성도 많아지다보니 개발 서버 성능이 느려짐. 코드 수정하고 반영되는 시간이 오래걸림(체감상)
- UI가 느리게 반영되는 부분이 개발 생산성을 떨어뜨린다 느낌
- app router 적용을 위해 점진적으로 버전업을 하기로 함

## HMR 성능.. 개선됐나?
- 체감상으로는 로컬 서버 성능이 빨라짐을 느낌.
- 어느정도 빨라졌는지 확인해보자
### 측정 방법
- 버전 업 전/후로 코드 수정 후 컴파일 시간을 측정해봄
- 비교군
	- 버전업 전: [v2.1.3](https://github.com/thismeme-team/thismeme-web/tree/v2.1.3)
	- 버전업 후: [v2.2.0](https://github.com/thismeme-team/thismeme-web/tree/v2.2.0)
- 측정값
	- 로컬 서버의 콜드 스타트 시간 측정
	- 각각 20회, 22회 코드 수정 후 컴파일 시간의 평균을 구함
		- 코드 수정은 버전업 전후 각각 동일한 파일들을 수정하는 방식으로 진행
		- **정확한 시간을 기록하기는 하나 전후로 얼마나 빨라졌는지 경향성에 집중하자** -> 개발 환경이 모두 다르기 때문에 항상 이 시간이 나오는건 아니기 때문

## AS-IS
### next info
```bash
// yarn next info
Operating System:
  Platform: darwin
  Arch: arm64
  Version: Darwin Kernel Version 23.1.0: Mon Oct  9 21:28:12 PDT 2023; root:xnu-10002.41.9~6/RELEASE_ARM64_T8103
Binaries:
  Node: 18.19.0
  npm: 10.2.3
  Yarn: 3.3.0
  pnpm: N/A
Relevant packages:
  next: 13.0.5
  eslint-config-next: 13.0.5
  react: 18.2.0
  react-dom: 18.2.0
```

### log
#### 1차
```shell
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info  - Loaded env from /Users/jeongjin/GitHub/thismeme-fe/.env.local
info  - Loaded env from /Users/jeongjin/GitHub/thismeme-fe/.env.development
warn  - Invalid next.config.js options detected:
  - The root value has an unexpected property, sentry, which is not in the list of allowed properties (amp, analyticsId, assetPrefix, basePath, cleanDistDir, compiler, compress, crossOrigin, devIndicators, distDir, env, eslint, excludeDefaultMomentLocales, experimental, exportPathMap, generateBuildId, generateEtags, headers, httpAgentOptions, i18n, images, onDemandEntries, optimizeFonts, output, outputFileTracing, pageExtensions, poweredByHeader, productionBrowserSourceMaps, publicRuntimeConfig, reactStrictMode, redirects, rewrites, sassOptions, serverRuntimeConfig, staticPageGenerationTimeout, swcMinify, trailingSlash, typescript, useFileSystemPublicRoutes, webpack).
  - The root value has an unexpected property, silent, which is not in the list of allowed properties (amp, analyticsId, assetPrefix, basePath, cleanDistDir, compiler, compress, crossOrigin, devIndicators, distDir, env, eslint, excludeDefaultMomentLocales, experimental, exportPathMap, generateBuildId, generateEtags, headers, httpAgentOptions, i18n, images, onDemandEntries, optimizeFonts, output, outputFileTracing, pageExtensions, poweredByHeader, productionBrowserSourceMaps, publicRuntimeConfig, reactStrictMode, redirects, rewrites, sassOptions, serverRuntimeConfig, staticPageGenerationTimeout, swcMinify, trailingSlash, typescript, useFileSystemPublicRoutes, webpack).

See more info here: https://nextjs.org/docs/messages/invalid-next-config
error - Sentry CLI binary not found. Source maps will not be uploaded.

info  - automatically enabled Fast Refresh for 1 custom loader
> [PWA] PWA support is disabled
error - Sentry CLI binary not found. Source maps will not be uploaded.

> [PWA] PWA support is disabled
error - Sentry CLI binary not found. Source maps will not be uploaded.

Browserslist: caniuse-lite is outdated. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
event - compiled client and server successfully in 14.6s (1255 modules)
wait  - compiling...
event - compiled successfully in 338 ms (924 modules)
wait  - compiling...
event - compiled successfully in 62 ms (331 modules)
warn  - You are using an experimental edge runtime, the API might change.
// / path로 들어감
wait  - compiling / (client and server)...
event - compiled client and server successfully in 2.8s (1295 modules)
// 코드 변경
wait  - compiling...
event - compiled client and server successfully in 2s (1295 modules)
// 코드 변경
wait  - compiling...
event - compiled client and server successfully in 4s (1295 modules)

```

#### 2차
```shell
// 2차 시도
event - compiled client and server successfully in 19.3s (1255 modules)
wait  - compiling...
event - compiled successfully in 521 ms (924 modules)
wait  - compiling...
event - compiled successfully in 165 ms (331 modules)
warn  - You are using an experimental edge runtime, the API might change.
wait  - compiling / (client and server)...
event - compiled client and server successfully in 3.7s (1295 modules)
wait  - compiling...
event - compiled client and server successfully in 2.1s (1295 modules)
```

#### 3차
```shell
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info  - Loaded env from /Users/jeongjin/GitHub/thismeme-fe/.env.local
info  - Loaded env from /Users/jeongjin/GitHub/thismeme-fe/.env.development
warn  - Invalid next.config.js options detected:
  - The root value has an unexpected property, sentry, which is not in the list of allowed properties (amp, analyticsId, assetPrefix, basePath, cleanDistDir, compiler, compress, crossOrigin, devIndicators, distDir, env, eslint, excludeDefaultMomentLocales, experimental, exportPathMap, generateBuildId, generateEtags, headers, httpAgentOptions, i18n, images, onDemandEntries, optimizeFonts, output, outputFileTracing, pageExtensions, poweredByHeader, productionBrowserSourceMaps, publicRuntimeConfig, reactStrictMode, redirects, rewrites, sassOptions, serverRuntimeConfig, staticPageGenerationTimeout, swcMinify, trailingSlash, typescript, useFileSystemPublicRoutes, webpack).
  - The root value has an unexpected property, silent, which is not in the list of allowed properties (amp, analyticsId, assetPrefix, basePath, cleanDistDir, compiler, compress, crossOrigin, devIndicators, distDir, env, eslint, excludeDefaultMomentLocales, experimental, exportPathMap, generateBuildId, generateEtags, headers, httpAgentOptions, i18n, images, onDemandEntries, optimizeFonts, output, outputFileTracing, pageExtensions, poweredByHeader, productionBrowserSourceMaps, publicRuntimeConfig, reactStrictMode, redirects, rewrites, sassOptions, serverRuntimeConfig, staticPageGenerationTimeout, swcMinify, trailingSlash, typescript, useFileSystemPublicRoutes, webpack).

See more info here: https://nextjs.org/docs/messages/invalid-next-config
error - Sentry CLI binary not found. Source maps will not be uploaded.

info  - automatically enabled Fast Refresh for 1 custom loader
> [PWA] PWA support is disabled
error - Sentry CLI binary not found. Source maps will not be uploaded.

> [PWA] PWA support is disabled
error - Sentry CLI binary not found. Source maps will not be uploaded.

Browserslist: caniuse-lite is outdated. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
event - compiled client and server successfully in 18.8s (1255 modules)
wait  - compiling...
event - compiled successfully in 435 ms (924 modules)
wait  - compiling...
event - compiled successfully in 88 ms (331 modules)
warn  - You are using an experimental edge runtime, the API might change.
wait  - compiling /_error (client and server)...
wait  - compiling / (client and server)...
event - compiled client and server successfully in 3.6s (1295 modules)
warn  - You have added a custom /_error page without a custom /404 page. This prevents the 404 page from being auto statically optimized.
See here for info: https://nextjs.org/docs/messages/custom-error-no-custom-404
wait  - compiling...
event - compiled client and server successfully in 3.7s (1295 modules)
wait  - compiling...
event - compiled client and server successfully in 3.5s (1295 modules)
wait  - compiling...
event - compiled client and server successfully in 1484 ms (1295 modules)
wait  - compiling...
event - compiled client and server successfully in 1126 ms (1295 modules)
wait  - compiling...
event - compiled client and server successfully in 2.1s (1295 modules)
wait  - compiling...
event - compiled client and server successfully in 1506 ms (1295 modules)
wait  - compiling...
event - compiled client and server successfully in 921 ms (1295 modules)
wait  - compiling...
event - compiled client and server successfully in 2.3s (1295 modules)
wait  - compiling...
event - compiled client and server successfully in 1947 ms (1295 modules)
wait  - compiling...
event - compiled client and server successfully in 2.4s (1295 modules)
wait  - compiling /explore/tags/[tagId]...
event - compiled client and server successfully in 1361 ms (1312 modules)
wait  - compiling...
event - compiled client and server successfully in 2.1s (1299 modules)
wait  - compiling...
event - compiled client and server successfully in 3.2s (1299 modules)
wait  - compiling...
event - compiled client and server successfully in 1769 ms (1299 modules)
wait  - compiling...
event - compiled client and server successfully in 2.4s (1299 modules)
wait  - compiling...
event - compiled client and server successfully in 3.5s (1299 modules)
wait  - compiling...
event - compiled client and server successfully in 3.5s (1299 modules)
wait  - compiling...
event - compiled client and server successfully in 2.6s (1299 modules)
wait  - compiling...
event - compiled client and server successfully in 3.8s (1299 modules)
wait  - compiling...
event - compiled client and server successfully in 3.4s (1299 modules)
wait  - compiling...
event - compiled client and server successfully in 2.9s (1299 modules)
wait  - compiling...
event - compiled client and server successfully in 1156 ms (1299 modules)
```
## TO-BE
### next info

```
Operating System:
  Platform: darwin
  Arch: arm64
  Version: Darwin Kernel Version 23.1.0: Mon Oct  9 21:28:12 PDT 2023; root:xnu-10002.41.9~6/RELEASE_ARM64_T8103
Binaries:
  Node: 18.19.0
  npm: 10.2.3
  Yarn: 3.3.0
  pnpm: N/A
Relevant Packages:
  next: 14.1.0
  eslint-config-next: 14.1.0
  react: 18.2.0
  react-dom: 18.2.0
  typescript: 4.9.3
Next.js Config:
  output: N/A
```

### log
#### 1차
```
next dev
```

```shell
   ▲ Next.js 14.1.0
   - Local:        http://localhost:3000
   - Environments: .env.local, .env.development

 ⚠ Invalid next.config.js options detected:
 ⚠     Unrecognized key(s) in object: 'sentry', 'silent'
 ⚠ See more info here: https://nextjs.org/docs/messages/invalid-next-config
> [PWA] PWA support is disabled
error - Sentry CLI binary not found. Source maps will not be uploaded.

> [PWA] PWA support is disabled
error - Sentry CLI binary not found. Source maps will not be uploaded.

error - Sentry CLI binary not found. Source maps will not be uploaded.

   automatically enabled Fast Refresh for 1 custom loader
 ✓ Ready in 4.1s
 // / 처음 접속
  ○ Compiling / ...
Browserslist: caniuse-lite is outdated. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
 ✓ Compiled / in 14.4s (1365 modules)
 ✓ Compiled in 870ms (1365 modules)
 ✓ Compiled in 1845ms (1365 modules)
 ✓ Compiled in 1120ms (1365 modules)
 ✓ Compiled in 4.9s (1365 modules)
 ✓ Compiled in 1393ms (1365 modules)
 ✓ Compiled in 1358ms (1365 modules)
 ✓ Compiled in 1621ms (1365 modules)
 ✓ Compiled in 1917ms (1365 modules)
 ✓ Compiled in 1167ms (1365 modules)
 
 ○ Compiling /explore/tags/[tagId] ...
 ✓ Compiled /explore/tags/[tagId] in 916ms (1383 modules)
 ✓ Compiled in 2.1s (1383 modules)
 ✓ Compiled in 1054ms (1383 modules)
 ✓ Compiled in 1314ms (1383 modules)
 ✓ Compiled in 1268ms (1383 modules)
 ✓ Compiled in 702ms (1383 modules)
```

#### 2차
```
NEXT_CPU_PROF=1 next dev
```

```shell
   ▲ Next.js 14.1.0
   - Local:        http://localhost:3000
   - Environments: .env.local, .env.development

 ⚠ Invalid next.config.js options detected:
 ⚠     Unrecognized key(s) in object: 'sentry', 'silent'
 ⚠ See more info here: https://nextjs.org/docs/messages/invalid-next-config
> [PWA] PWA support is disabled
error - Sentry CLI binary not found. Source maps will not be uploaded.

> [PWA] PWA support is disabled
error - Sentry CLI binary not found. Source maps will not be uploaded.

error - Sentry CLI binary not found. Source maps will not be uploaded.

   automatically enabled Fast Refresh for 1 custom loader
 ✓ Ready in 4s
 ○ Compiling / ...
Browserslist: caniuse-lite is outdated. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
 ✓ Compiled / in 16.4s (1365 modules)
 ✓ Compiled in 927ms (1365 modules)
 ✓ Compiled in 1736ms (1365 modules)
 ✓ Compiled in 5.1s (1365 modules)
```

#### 3차
> 비디오 촬영
```shell
   ▲ Next.js 14.1.0
   - Local:        http://localhost:3000
   - Environments: .env.local, .env.development

 ⚠ Invalid next.config.js options detected:
 ⚠     Unrecognized key(s) in object: 'sentry', 'silent'
 ⚠ See more info here: https://nextjs.org/docs/messages/invalid-next-config
> [PWA] PWA support is disabled
error - Sentry CLI binary not found. Source maps will not be uploaded.

> [PWA] PWA support is disabled
error - Sentry CLI binary not found. Source maps will not be uploaded.

error - Sentry CLI binary not found. Source maps will not be uploaded.

   automatically enabled Fast Refresh for 1 custom loader
 ✓ Ready in 3.8s
 ○ Compiling / ...
Browserslist: caniuse-lite is outdated. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
 ✓ Compiled / in 20.9s (1365 modules)
 ✓ Compiled in 950ms (1365 modules)
 ✓ Compiled in 4.5s (1363 modules)
 ✓ Compiled in 3.6s (1365 modules)
 ✓ Compiled in 4s (1365 modules)
 ✓ Compiled in 2.2s (1365 modules)
 ○ Compiling /explore/tags/[tagId] ...
 ✓ Compiled /explore/tags/[tagId] in 1219ms (1383 modules)
 ✓ Compiled in 4.1s (1383 modules)
 ✓ Compiled in 5.3s (1383 modules)
 ✓ Compiled in 3.9s (1383 modules)
 ✓ Compiled in 7.4s (1383 modules)
 ✓ Compiled in 2.3s (1383 modules)
 ✓ Compiled in 959ms (1383 modules)
 ✓ Compiled in 789ms (1383 modules)
 ✓ Compiled in 1343ms (1383 modules)
 ✓ Compiled in 1745ms (1383 modules)
 ✓ Compiled in 1007ms (1383 modules)
 ✓ Compiled in 3s (1383 modules)
 ✓ Compiled in 4.1s (1383 modules)
 ✓ Compiled in 976ms (1383 modules)
 ✓ Compiled in 696ms (1383 modules)
 ✓ Compiled in 1422ms (1383 modules)
 ✓ Compiled in 4.2s (1383 modules)
 ✓ Compiled in 1141ms (1383 modules)
 ✓ Compiled in 1274ms (1383 modules)
 ✓ Compiled in 1641ms (1383 modules)
```
#### 4차
```shell
   ▲ Next.js 14.1.0
   - Local:        http://localhost:3000
   - Environments: .env.local, .env.development

 ⚠ Invalid next.config.js options detected:
 ⚠     Unrecognized key(s) in object: 'sentry', 'silent'
 ⚠ See more info here: https://nextjs.org/docs/messages/invalid-next-config
> [PWA] PWA support is disabled
error - Sentry CLI binary not found. Source maps will not be uploaded.

> [PWA] PWA support is disabled
error - Sentry CLI binary not found. Source maps will not be uploaded.

error - Sentry CLI binary not found. Source maps will not be uploaded.

   automatically enabled Fast Refresh for 1 custom loader
 ✓ Ready in 4.9s
 ○ Compiling /_error ...
Browserslist: caniuse-lite is outdated. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
 ✓ Compiled /_error in 3.6s (1324 modules)
 ✓ Compiled in 449ms (945 modules)
 ✓ Compiled in 206ms (379 modules)
 ⚠ You have added a custom /_error page without a custom /404 page. This prevents the 404 page from being auto statically optimized.
See here for info: https://nextjs.org/docs/messages/custom-error-no-custom-404
 ⚠ Fast Refresh had to perform a full reload. Read more: https://nextjs.org/docs/messages/fast-refresh-reload
 ○ Compiling / ...
 ✓ Compiled / in 624ms (1365 modules)
 ⚠ Fast Refresh had to perform a full reload. Read more: https://nextjs.org/docs/messages/fast-refresh-reload
 ✓ Compiled in 3.7s (1363 modules)
 ✓ Compiled in 1072ms (1363 modules)
 ✓ Compiled in 702ms (1365 modules)
 ✓ Compiled in 1813ms (1365 modules)
 ✓ Compiled in 1726ms (1365 modules)
 ✓ Compiled in 1915ms (1365 modules)
 ✓ Compiled in 2.2s (1365 modules)
 ✓ Compiled in 1167ms (1365 modules)
 ✓ Compiled in 1623ms (1365 modules)
 ✓ Compiled in 1620ms (1365 modules)
```


#### 5차
```shell
➜  thismeme-fe git:(v2.2.0) ✗ yarn dev
   ▲ Next.js 14.1.0
   - Local:        http://localhost:3000
   - Environments: .env.local, .env.development

 ⚠ Invalid next.config.js options detected:
 ⚠     Unrecognized key(s) in object: 'sentry', 'silent'
 ⚠ See more info here: https://nextjs.org/docs/messages/invalid-next-config
> [PWA] PWA support is disabled
error - Sentry CLI binary not found. Source maps will not be uploaded.

> [PWA] PWA support is disabled
error - Sentry CLI binary not found. Source maps will not be uploaded.

error - Sentry CLI binary not found. Source maps will not be uploaded.

   automatically enabled Fast Refresh for 1 custom loader
 ✓ Ready in 3.6s
 ○ Compiling / ...
Browserslist: caniuse-lite is outdated. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
 ✓ Compiled / in 14.2s (1365 modules)
 ✓ Compiled in 591ms (1365 modules)
 ✓ Compiled in 1914ms (1365 modules)
 ✓ Compiled in 3s (1365 modules)
 ✓ Compiled in 1928ms (1365 modules)
 ✓ Compiled in 2.4s (1365 modules)
 ✓ Compiled in 2.6s (1365 modules)
 ✓ Compiled in 1770ms (1365 modules)
 ✓ Compiled in 1225ms (1365 modules)
 ✓ Compiled in 1720ms (1365 modules)
 ✓ Compiled in 1403ms (1363 modules)
 ✓ Compiled in 1509ms (1365 modules)
 ○ Compiling /explore/tags/[tagId] ...
 ✓ Compiled /explore/tags/[tagId] in 1020ms (1383 modules)
 ✓ Compiled in 1764ms (1383 modules)
 ✓ Compiled in 1234ms (1383 modules)
 ✓ Compiled in 982ms (1383 modules)
 ✓ Compiled in 668ms (1383 modules)
 ✓ Compiled in 2.1s (1383 modules)
 ✓ Compiled in 1030ms (1383 modules)
 ✓ Compiled in 1079ms (1383 modules)
 ✓ Compiled in 1776ms (1383 modules)
 ✓ Compiled in 1892ms (1383 modules)
 ✓ Compiled in 1453ms (1383 modules)
 ✓ Compiled in 1831ms (1383 modules)
 ✓ Compiled in 728ms (1383 modules)
```


## 결과 분석
### Next.js 13.0.5 로그

- 컴파일 시간 (초):
    
    - 3.5, 1.484, 1.126, 2.1, 1.506, 0.921, 2.3, 1.947, 2.4
    - 2.1, 3.2, 1.769, 2.4, 3.5, 3.5, 2.6, 3.8, 3.4, 2.9, 1.156
    
    모든 컴파일 시간을 합산하면:
    - 총 합: 3.5+1.484+1.126+2.1+1.506+0.921+2.3+1.947+2.4+2.1+3.2+1.769+2.4+3.5+3.5+2.6+3.8+3.4+2.9+1.156=49.3033.5 + 1.484 + 1.126 + 2.1 + 1.506 + 0.921 + 2.3 + 1.947 + 2.4 + 2.1 + 3.2 + 1.769 + 2.4 + 3.5 + 3.5 + 2.6 + 3.8 + 3.4 + 2.9 + 1.156 = 49.303 초
    - 컴파일 횟수: 20
    - 평균: 49.303/20 ≈ 2.465 초

### Next.js 14.1.0 로그

- 컴파일 시간 (초):
    
    - 1.914, 3, 1.928, 2.4, 2.6, 1.77, 1.225, 1.72, 1.403, 1.509
    - 1.764, 1.234, 0.982, 0.668, 2.1, 1.03, 1.079, 1.776, 1.892, 1.453, 1.831, 0.728
    
    모든 컴파일 시간을 합산하면:
    
    - 총 합: 1.914+3+1.928+2.4+2.6+1.77+1.225+1.72+1.403+1.509+1.764+1.234+0.982+0.668+2.1+1.03+1.079+1.776+1.892+1.453+1.831+0.728=35.5061.914 + 3 + 1.928 + 2.4 + 2.6 + 1.77 + 1.225 + 1.72 + 1.403 + 1.509 + 1.764 + 1.234 + 0.982 + 0.668 + 2.1 + 1.03 + 1.079 + 1.776 + 1.892 + 1.453 + 1.831 + 0.728 = 35.506 초
    - 컴파일 횟수: 22
    - 평균: 35.50622 ≈ 1.614 초

### 요약 비교
- **Next.js 13.0.5**:
    - 전체 평균 컴파일 시간: 약 2.465초
- **Next.js 14.1.0**:
    - 전체 평균 컴파일 시간: 약 1.614초

### 결과
- Next.js 14.1.0 버전에서 코드 수정 후 전체적인 평균 컴파일 시간이 Next.js 13.0.5 버전보다 약 34.5% 더 빠릅니다.
- Next.js 14.1.0 버전은 코드 수정 후 컴파일 시간에서 성능이 향상되어 개발자가 코드 변경을 더 빠르게 확인할 수 있게 됩니다.