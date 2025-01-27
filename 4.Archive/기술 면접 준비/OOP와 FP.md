## OOP (Object-oriented Programming)
- 객체를 기준으로 설계하는 프로그래밍 페러다임, 객체간의 상호작용으로 프로그램이 동작한다
- 객체는 상태(프로퍼티)와 동작(메서드)를 가지고 있음
- 키워드: 캡슐화, 상속(재사용성), 다형성, 추상화(복잡성 관리)
- 사용경험
	- 컴포넌트나 훅을 나누는 것
	- 컴포넌트에서 input 등의 폼상태를 재사용하기 위해 커스텀 훅으로 분리
	- react-hook-form, formik 처럼 폼에 대한 검증, 오류 상태, 입력값 등에 대한 관리를 추상화하는 것 자체가 oop의 정신을 따르고 있는 것
	- 합성컴포넌트, 역할이 다른 컴포넌트(=객체)간 상호작용으로 하나의 큰 합성컴포넌트를 만들 수 있다

## FP(Functional Programming)
- 함수를 일급객체로 바라봄. 불변성을 강조함. 순수함수와 고차함수를 사용함
- 사용경험
	- 함수 컴포넌트 자체 -> 순수 함수, 사이드이펙트가 없는 컴포넌트 = 들어오는 input(props)에 동일한 결과
	- redux의 reducer 작성(순수 함수)
	- JS에서 map, filter, forEach 등 고차 함수 사용 -> 함수를 일급객체로 여긴다
	- curring
	- HoF, HoC -> lazy evaluation