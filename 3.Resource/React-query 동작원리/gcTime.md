[staleTime](staleTime.md)

- v4 이전까지는 `cacheTime`이었는데 v5부터 `gcTime`으로 필드명 변경됨

- `scheduleGc` 메서드 내 `optionalRemove` 추상 메서드가 호출되고 있는데 `Removable` 추상 클래스를 상속하는 클래스가 `optionalRemove` 메서드를 구현한다.
	- 보면 `cacheTime` 을 `setTimeout`의 `delay` 로 설정하고 있다
https://github.com/TanStack/query/blob/6312d1297614738e14ef07892a40d0d825aae0c2/packages/query-core/src/removable.ts#L11-L19

- `Query` 가 `Removable`을 상속해 `optionalRemove를` 구현하고 있다.
	- 여기서 `this.#cache.remove(this)`는 `QueryCache`의 `remove` 메서드를 호출하는 것으로 해당 쿼리(`this`)를cache에서 remove 하는 것이다
https://github.com/TanStack/query/blob/6312d1297614738e14ef07892a40d0d825aae0c2/packages/query-core/src/query.ts#L193C1-L197

- `QueryCache` 의 `remove` 메서드
	- 위에서 `this.#cache.remove(this)` 를 호출할 때 `QueryCache` 의 `remove` 메서드를 호출된다.
	- 쿼리키를 이용해 해당 쿼리 캐시를 지우는 것을 알 수 있다.
	- 여기서 궁금한 건 쿼리 캐시를 remove할 때 삭제되었다는 것을 `notify`하고 있다. 이건 어디로 `notify`하는 것인지 알아볼 필요가 있다! 아마도 Observer 패턴을 내부에서 사용하고 있는데 어떤 구조를 띄고 있는지 정확히는 모르겠다
https://github.com/TanStack/query/blob/6312d1297614738e14ef07892a40d0d825aae0c2/packages/query-core/src/queryCache.ts#L136-L148