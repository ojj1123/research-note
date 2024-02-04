# Thismeme nextjs 13에서 14로 upgrade 하기
## 개요
- 현재는 nextjs 13.0.5 사용 중이다. 해당 버전을 사용한지 1년이 넘어가고 있다.
- nextjs 가 13.4 버전에 app router 를 정식 출시(stable) 한 이후로 많은 변화가 있었다.
	- nextjs의 app router는 Streaming SSR, Selective hydration, RSC 등 react 18의 기능을 담고 있으며, 이 밖에도 image 컴포넌트 변경, og/font/metadata 등의 기능이 nextjs 로 내재화되었다.
	- 뿐만 아니라 nextjs14 버전으로 오면서 DX 개선도 이루어졌다.
- 따라서 레거시를 걷어내고 14버전으로 업그레이드하고자 한다.
- 나아가 react 18 기능을 점진적으로 도입하고자 한다.

## 기대 효과
- react 18의 기능을 점진적으로 도입한다
- nextjs 13에서 14버전으로 오면서 DX개선이 이루어졌다. 현재 13.0.5 버전의 개발 경험은 좋지 못하다. 느린 fast reload 때문에 코드 변경사항이 느리게 화면에 반영된다. DX 향상을 기대한다

## 할 것
- [x] 13 to 14 버전 업그레이드
- [ ] 버전업에 따라 변경된 API 반영
	- [ ] new Image components
	- [x] next/font
	- [x] improved next/link
	- [x] edge runtime stable
		- https://nextjs.org/blog/next-13-1#a-light-nodejs-runtime-for-the-edge-now-stable-for-api-routes
	- [ ] file based metadata api -> app router 로 바꾸면서 시도
	- [ ] dynamic open graph images -> app router 로 바꾸면서 시도
		- https://nextjs.org/blog/next-13-3#dynamic-open-graph-image-generation

## 하지 않은 것
- app router 도입

## 주의사항
- [ ] API 변경사항 확인하기(side-effect 확인)


## 진행
- https://github.com/thismeme-team/thismeme-web/pull/84

## 트러블 슈팅
### `is not a valid JSX element type` error
- 상황 : @types/react, @types/react-dom 업데이트 후, 몇몇 컴포넌트에서 위 에러 발생
- 해결
	- 몇몇 라이브러리가 의존성으로 @types/react를 잘못 지정하는 문제
	- yarn v3 를 사용하고 있었기 때문에 `yarn dedupe @types/react` 를 통해 중복되는 @types/react 를 제거함
- 참고 issue
	- https://github.com/canonical/react-components/issues/983
	- https://github.com/DefinitelyTyped/DefinitelyTyped/issues/66841
	- https://github.com/facebook/react/issues/24304#issuecomment-1094565891