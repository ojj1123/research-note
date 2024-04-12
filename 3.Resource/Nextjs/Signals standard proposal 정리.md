---
tags:
  - javascript
links:
  - https://github.com/proposal-signals/proposal-signals
  - https://github.com/dai-shi/use-signals
---

# Signals standard proposal

## 배경
- native JS는 reactive programming 할 수 있는 API가 없었음.
	- reactive programming: 상태 변경에 따라 업데이트하는 선언적인 프로그래밍 모델, 방식
- 이런 reactive상태가 변경되면 UI에 반영되는 로직은 application 단에서 직접 구현해야 했음
- React같은 UI 라이브러리가 이런 signal 모델을 구현하고 있음. 구현하기 위한 많은 시도들이 있었음. 즉, 뷰와 모델을 바인딩 추상화를 제공하기 위한 노력들이 있었음
- native JS 에서 라이브러리에서 제공하고 있는 signal을 직접 구현해 제공하고자 함
- Signal 은 UI 가 아닌 곳에서도 활용될 수 있음

