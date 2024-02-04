# Git tag

- 특정 커밋에 tag를 생성할 수 있다. 특정 커밋에 대한 링크 정도로 생각하면 되겠다.
- 특정 커밋으로 checkout 이 가능하며, 일반 커밋과 다르게 read-only 이다

## 태그 조회
- 만들어진 태그 조회
	```base
	git tag
	```

- 특정 패턴의 태그 조회
```base
git tag -l "v2*"
```

## 태그 생성
### annotated tag 생성 (`-a` option)
- 태그를 생성할 때 태그를 생성한 사람의 이름, 이메일, 생성 날짜 등의 메타데이터도 함께 저장함
- 태그 메세지도 지정할 수 있음
```base
git tag -a v1.0.0 -m "Release version 1.0.0"
```
- 특정 태그의 정보와 커밋 정보를 확인할 수 있음
```bash
$ git show v1.0.0

tag v1.0.0

Tagger: Jeongjin Oh <rojay.developer@gmail.com>
Date:   Sun Feb 4 19:45:18 2024 +0900

Release version 1.0.0

commit ca323598fb6b2804ca82f653b25865079ccb0c74 (**tag: v1.0.0**)
Merge: 883339e b8af807
Author: Jeongjin Oh <rojay.developer@gmail.com>
Date:   Sun Feb 26 04:54:42 2023 +0900

    🎉 1.5차 MVP 배포 (#123) 🎉
```

### lightweight tag 생성
- 단순 태그에 대한 포인터.
- 메타데이터를 저장하지 않음
```base
git tag v1.0.0
```
- 특정 태그의 커밋 정보 확인할 수 있음
```bash
$ git show v1.4-lw

commit ca82a6dff817ec66f44342007202690a93763949
Author: Scott Chacon <schacon@gee-mail.com>
Date:   Mon Mar 17 21:52:11 2008 -0700

    changed the version number
```

## 특정 커밋에 태그 달기
- 커밋 체크섬을 함께 명시함
```bash
git tag -a v1.0.0 9fceb02
```

## 태그를 remote 에 올리기
- 특정 태그 올리기
	```
	git push origin {특정 태그}
	```

- 등록한 태그 전부 올리기
	```bash
	git push origin --tags
	```


## 태그를 checkout
```
git checkout v2.1.3
```

## 참고
- https://git-scm.com/book/ko/v2/Git%EC%9D%98-%EA%B8%B0%EC%B4%88-%ED%83%9C%EA%B7%B8
- https://johngrib.github.io/wiki/semantic-versioning/