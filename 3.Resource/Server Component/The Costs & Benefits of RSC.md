> RSC의 장점과 단점을 잘 설명해준 영상
> https://youtu.be/TJOiXyVKExg?si=lSQof4JEi-f4dTMK



![스크린샷 2023-12-19 00.35.16](스크린샷%202023-12-19%2000.35.16.png)
- CSR: client
- SSR: server(render) + client(hydrate)
- Server Component: server, client, server-only environment
	- server-only 환경이 무엇인가? 서버에서만 실행되어야 하는 함수, 컴포넌트
	- 

- 서버컴포넌트가 성능적인 이점은 분명 있지만, 아직은 단점도 존재한다
	- 장점
		- 스트리밍을 통한 빠른 렌더링
		- parallel, non blocking data loading by default
		- 필요한 곳에만 hydration
		- 세밀한 캐시 조절 가능
	- 단점
		- server-only 환경에 대한 이해가 필요하다
		- 무엇을 hydrate할지 안할지 통제해야 한다
		- 코드 복잡도가 올라감 - Dan abramov의 RSC관련 퀴즈 tweets
		- 서버 인프라 구축 비용 증가

- RSC를 처음 도입했던 shopify의 hydrogen (커머스 구축 프레임워크)도 RSC의 복잡도 때문에 뺏다고 함

- RSC는 언제 적합한가?
	- 복잡하지 않은 서비스의 경우 RSC는 적합하지 않을 수 있다
		- 초기 스타트업은 RSC가 그리 효과적이지 못하다. 오히려 RSC로 인해 복잡도가 올라갈 것이다.
	- 어플리케이션이 복잡해진다면, 대규모라면 유용할 것이다
		- 더 적은 번들로 가져올 수 있는 성능 향상
- 결국은 Framework가 이런 복잡도를 낮추기 위해 노력할 것이고 언젠가는 그 복잡도가 낮아질 것이다