```ts
useEffect(setup, dependencies?)
```

- setup: 컴포넌트가 Dom에 추가될 때 실행되는 함수
- dependencies가 변경될 때마다 setup을 실행함
- setup함수는 cleanup함수를 반환함
	- dependencies 변경되면 (변경되기) 이전 dependencies 로 cleanup함수를 실행
	- 새로운 dependencies 로 setup함수 실행
	- 컴포넌트가 dom에서 제거되면 cleanup함수 실행