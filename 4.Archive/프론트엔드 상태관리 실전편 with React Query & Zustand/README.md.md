[https://youtu.be/nkXIpGjVxWU?si=9jGpWeDncrTL_4Sn](https://youtu.be/nkXIpGjVxWU?si=9jGpWeDncrTL_4Sn)

> 형식보다는 본질에 집중하라
> 본질은 컴포넌트에 있는 비즈니스 로직을 레이어층에 적절히 책임을 분산해서 가독성을 높이고 동시에 개발자 경험을 개선하면서 유지보수가 용이하게 코드를 변경한다. 이를 통해 사업적 가치와 고객 가치에 기민하게 대응한다

> 29분 - 마지막에 발표에서 말하지 않은걸 찾아보라는거지

# React query & zuztand

- React query - query, mutate
- zustand - 간단한 코드 베이스
- redux, zustand : flux 패턴 구현
![스크린샷 2023-12-28 22.11.22](스크린샷%202023-12-28%2022.11.22.png)

# 프러덕트에 어떻게 녹였는지

- 팀내 표준 개발 환경 구축 - layered architecture
![스크린샷 2023-12-28 22.13.38](스크린샷%202023-12-28%2022.13.38.png)

- store layer의 역할
	- reqct query쿼리키 관리 => 잘 만들어진 거 쓰자
	- zustand => 스토어 선언
- queries와 store가 어떻게 컴포넌트부터 시작해 아래로 내려가는가?
![스크린샷 2023-12-28 22.17.18](스크린샷%202023-12-28%2022.17.18.png)


![스크린샷 2023-12-28 22.22.43](스크린샷%202023-12-28%2022.22.43.png)