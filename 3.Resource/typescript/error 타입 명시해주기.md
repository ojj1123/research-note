
#타입스크립트

# error 타입 명시해주기



https://github.com/next-step/react-calculator/pull/45/files#r1501705688

> 타입스크립트에서 catch 블록의 error는 unknown 타입입니다. 에러는 무엇이든 될 수 있기 때문이에요.
> 
> 그래서 `error as Error` 처럼 `타입 단언`을 하신 것 같아요. 하지만 타입 단언은 되도록 사용하지 않는 것이 좋아요. 다른 가능성이 있을 수도 있는데 그냥 그렇다고 "단언"하는 것과 같기 때문이에요.
> 
> 따라서 아래의 getErrorMessage 유틸함수를 사용할 것을 제안드립니다. 적절히 타입이 좁혀지도록 타입 가드를 사용한 함수예요. 위에서 말씀드렸다시피 error로 어떤 타입의 무엇이 던져질지 미리 알기 어렵습니다. 그래서 `if(error instanceof Error)` 와 같은 타입가드를 사용하여 error가 내장된 Error 생성자함수의 인스턴스 객체에 해당하는지 확인 후 error 객체의 속성인 message에 안전하게 접근할 수 있습니다. 그리고 이외의 경우에는 error를 Stringify 하여 반환할 수 있을 것 같습니다.
> 
> ```ts
> export const getErrorMessage = (error: unknown): string => {
> 	if (error instanceof Error) {
> 		return error.message;
> 	}
> 	return String(error);
> };
> ```
> 
> 관련하여 참고 가능한 아티클을 공유드려요. https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript

