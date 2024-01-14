참고 : https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo

- [모노레포](모노레포)란?
	- 모노레포는 단일 레포지토리에 여러 개의 서브 프로젝트가 존재하는 방식
	![Pasted image 20230922231933](Pasted%20image%2020230922231933.png)
	- 모놀로식 방식은 소스코드를 모듈화 하지 않고 하나의 레포지토리에 모두 넣은 형태
		- 모든 코드가 단일 버전으로 서로 의존하기 때문에 재사용이 용이하고 빌드가 단순
		- 그러나 관심사 분리가 어렵고 기능 추가 삭제가 레포지토리 전체에 영향을 줄 수 있음
	- 이런 단점을 해결하고자 멀티레포 방식 등장
		- 소스코드를 모두 모듈화해 각 모듈에 독자적인 영역을 부여하고 버전 관리를 통해 관심사를 분리함
		- 각 모듈간 관심사를 분리해 기능 변경이 다른 레포에 영향을 주지 않으나 각 모듈이 서로 독립된 영역에 존재하기 때문에 코드 단계에서 재사용이 어려워짐, 빌드와 배포 과정이 복잡해짐
	- 모노레포는 모놀로식과 멀티레포의 장점을 모두 취하는 방식
- Turborepo란?
	- 
- Turborepo에 스크립트간(빌드 단계간) 의존성을 위임
- package.json의 종속 분리
	- 복잡하게 이어져 있던 스크립트 의존성을 모두 분리
```json
// before 예:
"scripts": {
  "deploy:storybook": "yarn lint && yarn uvp-core build && yarn uvp build && yarn storybook build && yarn test && yarn storybook deploy"
}
 
// after 예:
"scripts": {
  "deploy:storybook": "turbo run deploy --scope='storybook'"
}
```
- turbo.json에 각 태스크의 의존성과 설정을 작성해 파이프라인 구성
```json
{
  "baseBranch": "origin/main",
  "pipeline": {
    // 스크립트와 매핑되는 태스크 이름을 작성합니다.
    "build": {
      // 의존성 빌드 명령이 실행된 후 build 커맨드가 실행됩니다.
      "dependsOn": ["^build"],
      // 기본 캐시 폴더를 지정합니다.
      "outputs": [".next/**", "lib/**", "storybook-static/**"]
    },
    "snapshots": {
      "dependsOn": ["@linecorp/uvp#build"]
    },
    "lint": {},
    "deploy": {
      // 의존성을 여러 개 지정할 경우 터보가 똑똑하게 순서를 맞춰서 진행합니다.
      "dependsOn": ["build", "cypress:ci", "snapshots", "lint"]
    },
    "profile": {
      "dependsOn": ["deploy"]
    },
    "dev": {
      "dependsOn": ["@linecorp/uvp#build"],
      "cache": false
    },
    "clean": {
      "cache": false
    }
  }
}
```
- 최상위 package.json에서 Turborepo 명령어를 적절하게 
	- 스크립트 의존성은 Turborepo에서 `태스크 단위로 관리`하며 `실행순서를 자동으로 위상정렬`해서 `병렬처리를 최대한 활용`해 빌드 스크립트 실행
```json
// package.json
"scripts": {
  "snapshot": "turbo run snapshots",
  "build": "turbo run build",
  // --scope는 build를 실행할 패키지 범위를 지정합니다. --no-deps와 --include-dependencies를 함께 사용하면 해당 스크립트에 필요한 의존성과 함께 실행합니다.
  "build-uvp": "turbo run build --scope='@linecorp/uvp' --no-deps --include-dependencies",
  // 이와 같이 run 다음에 태스크를 나열하면 각 작업의 우선순위에 따라 터보가 자동으로 정렬해 실행합니다.
  "test": "turbo run build lint cypress:ci snapshots",
  // --force 옵션을 넣으면 캐시된 작업을 다시 실행합니다. --profile, --graph 옵션은 아래에서 다시 다루겠습니다.
  "profile": "turbo run profile --profile --force && turbo run profile --graph",
  "clean": "turbo run clean && rm -rf node_modules"
}
```
