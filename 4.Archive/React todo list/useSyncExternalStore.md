- 외부 스토어와 리액트 내부 상태를 동기화해주는 hook
- React18에서 동시성 기능이 생기면서 리액트 내부 상태와 외부 상태를 동기화해줄 필요가 있음. 동기화해주지 않으면 tearing 현상이 발생함

```ts
useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```
- subscribe: 스토어를 구독하고 구독을 끊는 함수를 반환하는 함수
	- callback함수를 인자로 넘겨받는데 스토어가 변경될 때 그 callback함수를 실행해줘야 한다. 이는 컴포넌트가 리렌더링할 수 있게 해준다

- getSnapshot: 스토어에서 데이터의 스냅샷을 가져오는 함수
		- 컴포넌트에서 필요로하는 스토어의 데이터 스냅샷을 반환하는 함수이다. 스토어가 변경되지 않으면 getSnapshot함수는 같은 값을 반환해야 한다. 스토어가 변경되면 다른 값을 반환하고 리액트는 컴포넌트를 리렌더링한다
