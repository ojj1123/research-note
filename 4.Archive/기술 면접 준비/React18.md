[React Blog - React v18.0](https://react.dev/blog/2022/03/29/react-v18)
[How React 18 Improves Application Performance](https://vercel.com/blog/how-react-18-improves-application-performance)

# Automatic batching
[# Automatic batching for fewer renders in React 18](https://github.com/reactwg/react-18/discussions/21)
- 리액트가 자동으로 상태 업데이트를 그룹화하는 것 => 여러번의 렌더링을 하나의 렌더링으로 합쳐 성능 #최적화  가능
- Before React18
	- 이전에는 batching이 이벤트 핸들러 내에서만 일어났음
```jsx
const Comp = () => {
	const [state, setState] = uesState(0);
	
	// 이벤트 핸들러에서만 batching 이루어졌음
	const handleClick = () => {
		setState(prev => prev + 1);
		setState(prev => prev + 1);
	}
	
	return <button onClick={handleClick}>...</button>
}
```

```js
const Comp = () => {
	const [state, setState] = uesState(0);
	
	const handleClick = () => {
		setTimeout(() => {  
			setCount(c => c + 1);  
			setFlag(f => !f);  
			// React will render twice, once for each state update (no batching)  
		}, 1000);
	}
	
	return <button onClick={handleClick}>...</button>
}
// 이벤트 핸들러 외에는 batching 일어나지 않음

```

- After React18
	- 이벤트 핸들러 뿐만아니라 프로미스, setTimeout 등에서도 batching 가능
```js
// After: updates inside of timeouts, promises,  
// native event handlers or any other event are batched.  
setTimeout(() => {  
	setCount(c => c + 1);  
	setFlag(f => !f);  
	// React will only re-render once at the end (that's batching!)  
}, 1000);
``` 

- batching을 원하지 않으면 `flushSync` 메서드를 사용하면 됨

# Transitions & Concurrent mode
- 배경
	- 상태 업데이터를 urgent와 transition으로 나눔으로써 사용자 경험을 향상시키고자 함
	- concurrent 모드에서는 리액트의 렌더링 과정을 중단할 수 있다(interruptable).
	- 18버전 이전에는 렌더링 과정을 중단할 수 없었고, 무거운 렌더링 과정 때문에 (main thread가 블락되어) 사용자 경험을 저해됬었다
	- concurrent rendering은 렌더링 과정을 중단할 수 있게 설계했고, main thread를 블락하지 않고 백그라운드에서 렌더링을 진행하게 되었다
	- **이를 통해 사용자는 화면과 인터랙션 하며 무거운 렌더링 과정이 있음에도 즉각적으로 화면에서 피드백을 받을 수 있게 되어 UX를 향상시킬 수 있다**
	- 내 생각 : UX은 물론 성능을 고민해야하는 개발자 입장에서도 React가 Concurrent Rendering 기능을 제공해주니 DX도 향상되었음

- 백그라운드에서 전환 업데이트가 일어나는 동안 현제 콘텐츠를 계속 보여줄 수 있다

- 상태가 urgent와 transition 업데이트로 나뉨
	- urgent update: 유저 인터랙션(입력, 클릭 등) => 사용자가 즉각적인 반응을 원함
	- transition update: 하나의 뷰에서 다른 뷰로 트랜지션하는 업데이트 => 뷰 변경이 즉각적이지 않아도됨
- 유저의 인풋은 즉각적으로 화면에 표시하고 인풋값에 따른 결과(검색결과 등)은 non-urgent 해도 됨
	- startTransition API를 통해 어떤 상태 업데이트를 transition으로 할지 리액트에게 알릴 수 있다
```js
import { startTransition } from 'react';  

// Urgent: Show what was typed
setInputValue(input);

// Mark any state updates inside as transitions  
startTransition(() => {
	// Transition: Show the results  
	setSearchQuery(input);
});
```

- [Lane model](../../3.Resource/React18/Lane%20model.md) 을 통해서 구현했다고 함
- 이런 Transition 기능은 Suspense와 결합해서 활용될 수 있음
	- Suspense의 fallback을 보여주는 것 대신에 이전 결과값을 보여주어 사용자 경험을 해치지 않을 수 있다

# Suspense for Data fatching


# React Server Component(RSC)
[Understanding React Server Components](https://vercel.com/blog/understanding-react-server-components)

- 배경
	- 기존의 SSR 퍼포먼스 문제를 해결해줌
- 기존 SSR은 서버에서 Data fetching을 '모두' 완료하고 HTML로 "렌더링"하여 JS번들과 함께 클라이언트에게 보낸다. 그리고 JS번들을 통해 클라이언트에서 hydration 과정을 거치게 된다. hydration 과정은 DOM에 이벤트 핸들러를 부착하거나 데이터 패칭 작업들을 하게 된다.
- 즉 Data fetching 완료 => JS번들 로드 => hydration 과정을 거쳐야 비로소 사용자가 화면에서 인터렉션을 할 수 있다.
- 이런 과정은 FCP를 빠르게 해줄 수 있지만 TTI(Time To Interactive)가 올라가 TBT(Total-Blocking-Time)이 높아져 사용자 경험을 해칠 수 있게 된다.
- RSC는 기존의 SSR의 문제점을 해결해줄 수 있다.
- RSC는 서버에서 미리 리액트 컴포넌트를 렌더링한다. 컴포넌트 개별적으로 데이터 패칭을 진행한다. RSC 페이로드를 클라이언트로 보낸다. 이때 이미 리엑트 컴포넌트 트리가 직렬화되어서 클라이언트로 보내지기 때문에 JS번들은 요구하지 않는다.(번들 사이즈 감소) 이는 성능 향상을 가져온다.