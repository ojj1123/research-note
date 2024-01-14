# 개요
- 실제 DOM 구조와 비슷한 자바스크립트 객체
- DOM을 조작하게 되면 렌더 트리를 형성하고 레이아웃 과정을 거치게 되는데 이 과정에서 성능 저하가 발생하게 됨
- 변경된 DOM만 변경할 수 있도록 하자!

# 동작원리
- state와 props가 변경되면 새로운 VirtualDOM이 형성된다
- 새로운 VirtualDOM과 이전 VirtualDOM에서 변경된 부분만 찾아내(diffing algorithm) 실제 DOM에 반영한다.
- VirtualDOM은 DOM이 변경될 때마다 여러번의 reflow를 하는 것이 아닌 한번의 reflow를 통해 성능 향상을 이끌어낸다.