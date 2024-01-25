- Redux 의 `store.subscribe` 메서드가 low-level API 인 이유 [redux#303](https://github.com/reduxjs/redux/issues/303)
> In fact Redux `createStore` API can probably be implemented with two or three lines in Rx.
> 
> My intention was to extract a subset that can be used by people who don't want Rx dependency and want some opinionated wiring defaults (one root reducer, actions as plain objects) to get some -benefits (logging, record/replay, time travel) “by default”.
> - Dan abramov
> 
> 
> 의도는 rx 의존성을 원하지 않고 일부 의견에 따른 기본값(루트 리듀서, 자바스크립트 객체인 액션)을 사용하여 몇가지 이점(로깅, 기록/재생, 시간여행) 을 얻고자 하는 사람들이 사용할 수 있는 하위 집합을 추출하는 것이다
> -> 원하면 subscribe를 obervable 로 감싸면 된다

- [Dan abramove comment](https://github.com/reduxjs/redux/issues/303#issuecomment-125184409)
>**The store API is meant to be extensible.** This is why it _needs_ to be as orthogonal as possible. The methods shouldn't duplicate functionality because otherwise creating extensions to it like [Redux DevTools](https://github.com/gaearon/redux-devtools) becomes harder. If extensions want to do something to the state before passing it to the consumer, they'll now have to do it in two different places (three if we add two parameters!) which is error prone.
>
>store API는 확장가능성을 염두해두었다. 왜 store API를 가능한 한 독립적으로(orthognol)하게 한 이유다. 메서드들은 기능적으로 중복되면 안된다. 왜냐하면 redux devtools와 같은 익스텐션을 만드는 것이 더 어려워지기 때문이다.
>
> The solution is simple: don't use `subscribe` directly! **It's a low level API.** If you want it to behave as an Observable, write a function that turns it into an observable! It isn't hard to do:
>
>`subscribe` 를 바로 사용하지 마세요. 이는 low level API이다. Observable하게 사용하고 싶다면 observable로 바꾸는 함수를 작성하세요.

