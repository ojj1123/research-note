## Hot Module Replacement (HMR)
- Hot Module Replacement (HMR): 개발자가 코드를 변경할 때 새로고침 없이 앱/웹의 상태를 날리지 않고 바로 변경사항을 확인할 수 있도록 한다
- react는 내부적으로 HMR을 제공하기 위해 원래 Dan abramove가 만든 react-hot-loader 사용했다. 이는 react native 에서 hot reload를 지원해주기 위한 용도였다고 한다
- react-hot-loader 에서 react-refresh 패키지로 교체했다고 한다 [react-refresh](https://github.com/facebook/react/issues/16604#16604%20comment](https://github.com/facebook/react/issues/16604#16604%20comment](https://github.com/facebook/react/issues/16604#issuecomment-528663101)
- react-refresh 패키지는 bundler 개발자가 HMR를 구축할 수 있도록 범용해서 사용하는 목적을 가진다

## RSC 에 대해 HMR 을 어떻게 지원할건지?
https://github.com/dai-shi/waku/issues/113
![스크린샷 2023-12-27 02.05.16](스크린샷%202023-12-27%2002.05.16.png)

- [Waku](../../3.Resource/Waku.md) 에는 현재 RSC에 대한 HMR 지원하고 있지 않다. 단순히 full page reload를 지원해서 서버컴포넌트를 수정할 때 웹의 상태가 모두 날라간다
- [Waku](../../3.Resource/Waku.md) 는 내부적으로 vite를 사용하고 있는데 vite의 HMR 모듈은 클라이언트 측의 HMR만 지원해준다
- 그래서 직접 [vite-plugin-rsc-reload](https://github.com/dai-shi/waku/blob/c599251c69add15be9ad1f7d42a4116deb66149d/packages/waku/src/lib/plugins/vite-plugin-rsc-reload.ts) 를 구현해두었다. 하지만 이는 full page reload 만 지원하고 있다.
- Next.js는 RSC에 대한 fast refresh를 지원하고 있다. 어떻게 구현하고 있는지 참고해봐야 겠다. [Nextjs Docs Fast refresh](https://nextjs.org/docs/architecture/fast-refresh)
- vite에 (오피셜 혹은 커뮤니티) 플러그인 중에 RSC에 대한 HMR을 지원하는 것이 있는지 확인해봐야 겠다. 없다면 만들어야 겠다.

## Next.js의 HMR 솔루션
- Next.js 는 RSC에 대한 fast refresh 를 자체적으로 구현하고 있다. [hot-reload-webpack 모듈](https://github.com/vercel/next.js/blob/fc25fcef3edc488c17ea6da7259a352e2dcca1d8/packages/next/src/server/dev/hot-reloader-webpack.ts#L186)
- 어떤 모듈(컴포넌트 종류, 파일 종류 등)변경했는지에 따라 reload action 타입을 정의해두었다. [](https://github.com/vercel/next.js/blob/7c7d981b2d3b5a3025a0a4f17e82d2644e3b5286/packages/next/src/server/dev/hot-reloader-types.ts#L10-L26)
- 또한 [hot-reloader-webpack 모듈](https://github.com/vercel/next.js/blob/7c7d981b2d3b5a3025a0a4f17e82d2644e3b5286/packages/next/src/server/dev/hot-reloader-webpack.ts#L86)하는 것으로 파악된다.
