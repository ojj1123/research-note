https://fe-developers.kakaoent.com/2022/220519-garbage-collection/

- heap영역은 new space와 old space 로 나뉘어짐
- new space는 생성된지 얼마 되지 않은 객체가 있는 곳이고, old space는 생성된 후 가비지 컬렉션이 2번 발생할 동안 살아남은 객체
- the generational hypothesis 에 의거해 새로운 객체가 오래된 객체보다 더 쓸모없어질거라는 가설을 세움 -> new, old 객체를 모두 GC하는건 비효율적이기 때문에 이 둘을 나눠서 GC함
- 마이너 GC는 new space를 담당하고, 메이저 GC는 old space를 담당함
- mark-and-sweep 알고리즘 : root 부터 시작해서 참조되는 객체에 mark를 표시하고 최종적으로 mark 되지 않은 객체는 메모리에서 제거함