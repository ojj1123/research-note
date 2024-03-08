
  
```ts
// easeOutExpo 애니매이션 함수
// see https://easings.net/ko#easeOutExpo
const easeOutExpo = (x: number) => {
	return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
}
// count up 애니매이션 구현 함수
const countUp = (cur: number, target: number) => {
	const frameRate = 1000 / 60
	const totalFrame = Math.round(2000 / frameRate)
	let currentNumber = 0
	const counter = setInterval(() => {
	  const progressRate = easeOutExpo(++currentNumber / totalFrame)
	  // 실제 숫자 countup 변경되는 곳
	  element.innerHTML = `${(cur + Math.round((target - cur) * progressRate)).toLocaleString()} 원`
	
	  // 진행 완료시 interval 해제
	  if (progressRate === 1) {
		clearInterval(counter)
	  }
	}, frameRate)
}
```