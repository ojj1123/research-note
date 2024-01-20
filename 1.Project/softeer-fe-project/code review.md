- img 태그에 width, height를 넣어주자 - CLS 방지
- 함수에 의존성을 줄이기 위해 파라미터를 활용해보자
```js
// as is
function foo() {
	const app = document.getElementById('app');
	...
}
// to be
function foo(baseEle) {
// app에 대한 의존성을 줄임
	...
}
const baseEle = document.getElementById('app');
foo(baseEle)
```

- 쌓임 맥락
- 코드 변경 / 유지보수, 의존성 관리해 본 경험이 중요하다.
- Store(or state) : view에서 변경되는 값(데이터)를 관리하는 곳
	- 스토어가 왜 필요했지?
	- 상태(데이터)를 조작하는 로직이 흩어져 있음. 렌더링 로직과 혼용되어 있어 데이터 변경이 추적되지 않았음
- 폴더 구조 잡을 때 **"어떻게 작업"하는지 관점으로 바라보면 좋을거 같다**
