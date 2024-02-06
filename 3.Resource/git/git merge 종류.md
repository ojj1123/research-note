---
tags:
  - "#git-flow"
  - "#git"
---

## Git merge 종류
- merge
	- 일반 merge. merge commit이 생김
- squash and merge
	- 여러개의 commit을 하나로 합칠 때 사용
	- 병합할 브랜치(feature 브랜치)의 모든 commit을 하나로 합쳐 base 브랜치에 새로운 커밋을 추가하는 방식으로 병합
- rebase and merge
	![rebase-and-merge](images/Pasted%20image%2020240206000635.png)
	- base : main 브랜치에서 my-branch 브랜치를 만들었을 때, my-branch의 base는 main의 A커밋이 된다
	- rebase는 base를 다시 조정하는 것이다. main으로 Rebase한다는 말은 main의 최신커밋을 base로 한다는 것을 의미한다

## 어떻게 사용하면 좋을까?
- feature -> develop
	- feature의 지저분한 commit을 develop에 남길필요가 없다
	- squash & merge를 통해 하나의 commit만 develop에 반영한다
	- 단, develop에 merge하기 전 rebase를 한번 진행 후 merge 한다. 왜냐하면 commit 이력을 깨끗하게 만들기 위함이다.
- develop -> main
	- squash merge를 하면 commit 이력이 모두 사라지기 때문에, 배포 후 문제가 생길 시 롤백할 수 없다. 또한 main브랜치에 merge commit을 남길필요가 없다  (rebase를 하면 fast-forward 관계가 되어 main 브랜치에 merge commit이 생기지 않는다)
	- 따라서 rebase & merge가 적합하다

## 참고
- [Git의 다양한 브랜치 병합 방법 (Merge, Squash & Merge, Rebase & Merge)](https://hudi.blog/git-merge-squash-rebase/)