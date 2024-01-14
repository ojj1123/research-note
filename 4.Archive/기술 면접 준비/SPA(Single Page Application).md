https://poiemaweb.com/js-spa
https://developer.mozilla.org/ko/docs/Web/API/History

- 단일 웹 문서만 로드한 다음 콘텐츠를 표시할 때마다 js를 통해 콘텐츠를 업데이트 하는 방식
- 장점
	- 페이지를 새로고침하지 않고 브라우저에서 콘텐츠를 렌더링하기 때문에 성능 향상과 동적인 경험
	- 서버 부하를 줄일 수 있다
- 단점
	- 단일 페이지를 로드할 때 모든 JS와 CSS 파일을 브라우저로 가져와야해서 TTI 가 길어질 수 있다
	- SEO 안됨

- 동작원리
	- 첫 페이지 요청 시, 그 어플리케이션에 필요한 리소스를 모두 받아온다
	- 사용자가 새로운 URL로 이동한다
	- 해당 URL에 필요한 리소스를 클라이언트에서 직접 생성한다
	- 그 URL의 컨텐츠를 렌더링한다

- 구현방법
	- ajax 이용 => history 가 관리되지 않음
	- hash이용
	- history API 이용
- history API 이용
	- routes 배열을 통해 어떤 url에 어떤 리소스(컴포넌트)를 보여줄지 정의
	- history API의 pushState을 통해 어떤 url로 이동할지 이벤트 핸들러 함수를 작성해준다
	- 해당 path의 리소스(컴포넌트)를 보여준다
	- 브라우저의 뒤로가기/앞으로가기 버튼 클릭은 popstate 이벤트가 발생할 때 해당 path를 보여줄 수 있도록 이벤트 핸들러를 달아준다