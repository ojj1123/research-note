credentials 요청 헤더 : https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials

withCredentials 요청 헤더 : https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials

- credentials 이란?
	- cookie, authorization header, TLS client certificate 등이 있음
- credentials 요청 헤더 : 요청 헤더 중 하나로 요청에 credential을 포함할지 안할지를 나타내는 헤더
	- include: 요청에 *항상* 자격증명(credential)을 포함함
	- same-origin: 같은 origin 간에만 자격증명을 포함
	- omit: 자격증명을 받거나 보내지 않음
- 