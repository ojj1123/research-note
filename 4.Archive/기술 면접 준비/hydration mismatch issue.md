
## 정의
- hydration 을 하기 위해서는 ssr 과정에서 생긴 html 이 클라이언트에서의 dom과 동일해야함. 그렇지 못해서 생기는 문제가 hydration mismatch issue

## 내 경험
- waku 프레임워크 디버깅하면서 겪음
- 서드파티 라이브러리 동작때문에 서버에서 생성된 html이 클라이언트에서의 dom과 달라서 생긴 문제