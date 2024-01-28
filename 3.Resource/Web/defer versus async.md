[defer, async 스크립트](https://ko.javascript.info/script-async-defer)

- 스크립트가 무거워짐에 따라 다운로드 하는데 오랜 시간이 걸리게 됨. 스크립트 태그는 DOM 파싱을 중단함
```html
<p>Before</p>
...
<!-- script태그는 DOM 파싱을 blocking 한다  -->
<script src='./index.js'></script>
...
<!-- 스크립트 다운 전에는 보이지 않음 -->
<p>index.js 에서 접근하지 못하는 요소</p>
```

- defer 속성
	- `DOMContentLoaded` 이벤트가 호출되기 전에 defer 속성을 가진 script 가 실행됨

	```html
	<script defer src='./index.js'></script>
	```

	- 실행순서 보장 - 위에서 아래 순으로 스크립트 실행됨
	```html
	<script defer src='./main.js'></script>
	<script defer src='./index.js'></script>
	```

- async 속성
	- `DOMContentLoaded` 이벤트 전에 script 태그가 실행될 수 있다
	- 실행순서를 보장해주지 않음 - 스크립트 간에 독립적으로 실행됨, 먼저 다운된 스크립트가 먼저 실행됨(load-first order)
	- 언제 유용할까?
		- DOM과 아무런 관련이 없는 작업
		- 예를 들어 카카오, 네이버 API와 같은 3rd-party library 인 경우 async 속성