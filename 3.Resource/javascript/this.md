- **this => 함수가 호출될 때 this 가 동적으로 결정된다.**
	- 프로토타입에 있는 메서드는 this가 생성자에 있는 프로퍼티와 프로포타입까지 모두 묶는다
- 화살표 함수 => 함수가 선언될 때 this는 정적으로 결정된다
- this 바인딩을 하는 방법
	- 화살표 함수 = 정적으로 this가 바인딩됨
	- `that = this`
	- `bind` / `call` / `apply` -> 커링, 클로저 개념
```js
const obj = {}

function foo() {
	console.log(this)
}
foo.bind(obj) // 함수를 반환하는 함수: 커링
```