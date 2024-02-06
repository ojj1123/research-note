## [2024-01-30](../../0.DailyNote/2024-01-30.md)

- SPA의 등장
- 네이티브 앱 vs 모바일 웹

- 나는 어떤 개발자인가? 무엇을 할 때 좋아하는지

- 렌더링을 #최적화 할 수 있는 방법? (내 경험)
	- memo 사용
	- 컴포넌트 구조 리펙터링 - 변경되는 상태가 자식컴포넌트에 영향을 미치고 있는지?
	- input에 useRef 사용
	- context provider 를 만들 때, 각 상태마다 provider 를 분리하여 특정 값을 select한 컴포넌트만 렌더링한 경험

- state vs props
	- state: 컴포넌트 내의 데이터(상태)
	- props: 부모로 부터 받아오는 데이터(read-only)


## [2024-02-05](../../0.DailyNote/2024-02-05.md)

### 빌드
- 코드 번들링 - SPA로 넘어오면서 번들링 작업
- #최적화 
	- ES모듈 tree shaking
	- 자원압축 - minification
	- 이미지 #최적화 
- 브라우저 호환성
	- polyfill
	- babel - 신버전의 JS스펙을 구버전으로 바꿔주는 도구
- 코드 분할(code splitting)
- **캐싱 및 버전 관리**
- 환경 변수 처리

### Class component를 사용하지 않는 이유
- 참고 https://legacy.reactjs.org/docs/hooks-intro.html#motivation
- Class 컴포넌트를 사용하는 이유는 컴포넌트에서 상태를 관리하기 위해서이다.
- 그러나 버튼, 아이콘 같은 간단한 컴포넌트를 클래스 컴포넌트로 작성하는게 옳을까? 상태가 없는 컴포넌트인데 말이다. 아래와 같은 '상태가 없는 컴포넌트'들은 class를 사용할 이유가 없다
	```jsx
	class Button {
		constructor() {}
		render() {
			return <button>...</button>
		}
	}
	```

- 복잡한 class 컴포넌트를 사용하지 않고 함수로 컴포넌트를 작성하는 것이 간단할 수 있다.
	```jsx
	function Button() {
		return <button></button>
	}
	```

- 또한 함수 컴포넌트에서 상태를 이용하기 위해 hook 이 나오게 된다. hook은 JS의 closure를 이용해 구현되어 있다. 개인적으로 hook은 JS의 본질적인 기능을 잘 이용한거 같다.