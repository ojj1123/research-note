![flux](flux.png)

- Flux = Dispatcher , Store , View
- 데이터의 흐름이 단방향이다
- 유저가 view에서 인터렉션 => 뷰는 디스패처를 통해서 데이터 혹은 비즈니스 로직이 스토어에 액션을 전파 => 뷰가 변경됨