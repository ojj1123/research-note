# 현상 파악
- DEV환경에서 런타임에 JS를 통해 CSS를 로드된다. JS를 로드하고 실행하는 동안 FOUC 발생한다
- JS 를 disable 하고 실행하면 스타일 시트가 head inject되지 않는다 [waku-comment#323](https://github.com/dai-shi/waku/issues/323#issuecomment-1876486708)
- PRD에서는 FOUC발생하지 않는다. 정적 html에 css 파일이 link로 들어가 있기 때문이다.
- vite SSR 솔루션은 어떻게 해결하고 있는지
- solidJS팀에서 이 문제를 해결했다고 한다. [tweet](https://x.com/markdalgleish/status/1719879166890484088?s=20)
- 

# 가설
1. vite dev server를 실행하기 전에 모듈 관계를 파악해 미리 css를 정적 HTML에 link로 삽입할 수 있을까?
2. 서버 컴포넌트를 변경하면 full-reload 되는데 이 문제를 먼저 해결해야하는가?

# TODO
- [ ] RSC 환경 구축 (using vite)
- [ ] vite 플러그인 중 SSR 관련된 것 찾아보기
- [ ] waku 프로젝트 아키텍처, 구조 파악
- [ ] 다른 SSR 솔루션들은 어떻게 해결했는지

# 가설 검증
2. 서버 컴포넌트를 변경하면 full-reload 되는데 이 문제를 먼저 해결해야하는가?
	- full-load하면 무조건 fouc발생, 즉 현재는 rsc에 대한 fast refresh가 full-load이기 때문에 fouc발생
	- client컴포넌트에서는 fouc발생 X

### 다른 SSR 솔루션은 어떻게 해결하는지
- css를 변경할 때