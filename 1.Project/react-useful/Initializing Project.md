
## Todo
- [x] pnpm workspace
- [x] test environment
- [x] prettier, eslint

## npm vs yarn vs pnpm 무엇을 선택할까
### npm
- 장점
	- 손쉬운 세팅
	- [monorepo 지원 (since v7)](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- 단점
	- 패키지가 중복설치되기도 한다. disk 공간 낭비로 이어질 수 있다.
	- 이를 해결하기 위해 flatten node_modules 기능이 나왔지만 이 또한 다른 문제를 야기한다.
		- flattened node_modules로 인한 의존하지 않는 패키지에 접근할 수 있다(의도하지 않게)

### yarn classic
- 장점
	- 손쉬운 세팅
	- npm 보다 빠르고 보안적으로 안전하다
- 단점
	- 패키지가 중복설치되기도 한다. disk 공간 낭비로 이어질 수 있다.
	- 이를 해결하기 위해 flatten node_modules 기능이 나왔지만 이 또한 다른 문제를 야기한다.
		- flattened node_modules로 인한 의존하지 않는 패키지에 접근할 수 있다(의도하지 않게)
### yarn PnP
- 장점
	- 의존성을 ZipFS 로 관리하기 때문에 cache가 된다. zero-install로 ci 과정을 단축시킬 수 있다
	- 의존성을 버전관리할 수 있어 개발자 간에 의존성 불일치 문제를 해소할 수 있다
	- workspace 기능을 제공해준다
- 단점
	- 의존성을 모두 버전관리하기 때문에 git 용량이 커진다.
	- pnp 모드를 지원하지 않는 패키지들도 존재한다
	- zero-install 이기는 하지만 특정 패키지에서 `postinstall`하는 경우 추가적인 의존성이 설치된다. 또한 machine-specific한 의존성이 필요한 경우도 있어 사실상 zero-install이 되기 힘들다. zero-install을 위해서는 추가적인 설정을 해주어야 한다.
		- 관련 이슈 해결 경험 https://github.com/YAPP-Github/thismeme-web/pull/3#discussion_r1037035289
	- window, mac 등 machine-specific 한 의존성을 모두 관리하기 위한 설정이 필요하다
		- 관련 이슈 해결 경험
			- https://github.com/YAPP-Github/thismeme-web/pull/20
			- https://github.com/YAPP-Github/thismeme-web/pull/18#issuecomment-1340691215

### pnpm

#pnpm 

- 장점
	- npm과 yarn classic이 가지고 있던 "깊어지는 의존성 resolution 문제"를 해결해준다. 한 패키지에 대한 의존성 그룹을 만들고 symlink를 통해 실제 패키지(`node_modules/.pnpm`에 있는 실제 패키지)에 접근한다
	- 한 패키지를 여러번 설치하지 않고 의존성을 virtual store에 저장한다. 즉, **disk 공간을 절약할 수 있다**
	- [npm에 비해 yarn이 가진 기능들을 모두 구현해두었다](https://arc.net/l/quote/zsiqgvuk)
	- yarn pnp 보다는 아니지만 대부분의 상황에서 빠른 설치 속도를 보이고 있다
	- workspace 기능을 제공해준다
- 단점
	- pnpm을 아직 사용안해봐서 아직은 잘 모르겠다

### 참고
- [pnpm은 어떻게 symlink를 생성하는가?](../../3.Resource/javascript/pnpm은%20어떻게%20symlink를%20생성하는가?.md)
- [Yarn 대신 pnpm으로 넘어간 3가지 이유](https://engineering.ab180.co/stories/yarn-to-pnpm)
- [Why should we use pnpm?](https://www.kochan.io/nodejs/why-should-we-use-pnpm.html)
- [Benchmarks of JavaScript Package Managers | pnpm](https://pnpm.io/ko/benchmarks)

## jest vs vitest 무엇을 선택할까
### jest

### vitest
