## TL;DR
- ES2015(ES6)명세에서 strict mode일 경우 함수가 stack overflow가 발생하지 않도록 조치하라고 함.
- 하지만 v8 엔진은 아직 tail call을 구현하고 있지 않음(?)
- [다음과 같은 이유로 tail call이 문제가 있다고 생각함](https://v8.dev/blog/modern-javascript#proper-tail-calls). 스택 프레임이 임의로 제거된다면,
	- 스택이 불완전하기 때문에 프로그램이 특정 지점에 어떻게 도달했는지 디버깅하기 힘들다(디버깅 관점)
	- `error.stack`에 실행흐름에 대한 정보가 적어져 원격 분석 소프트웨어(에러를 수집하고 분석하는)가 손상될 수 있다(호환성 관점)
- 그래서 [syntax로 tail call을 opt-in/out할 수 있도록 제안함](https://github.com/tc39/proposal-ptc-syntax)