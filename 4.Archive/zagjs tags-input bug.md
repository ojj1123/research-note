## [2023-09-13](0.DailyNote/2023-09-13.md)
- tags-input을 모바일에서 사용하려 할때 tag 수정 시모바일 키보드가 올라오지 않는 이슈
- https://zagjs.com/components/react/tags-input#navigating-and-editing-tags
	> Pressing `Enter` or double clicking on the tag will put the it in edit mode, allowing the user change its value and press `Enter` to commit the changes.
	
	1. 태그가 선택된 상태에서 enter를 누르거나
	2. 수정하려는 태그를 double click 하거나
- chakra-ui의 ark 라는 UI 컴포넌트 라이브러리가 있는데 여기서 zagjs를 의존성으로 가져가고 있어서 여기에 먼저 Issue 를 올렸었음(zagjs는 UI컴포넌트의 상태머신이고 ark는 이 상태머신을 기반으로 구현한 headless UI 라이브러리)
	- https://github.com/chakra-ui/ark/issues/1396
	- 아직 maintainer의 답변이 없는 상황
	- 아무래도 직접 해결해서 PR을 올려야겠음
- ark의 tags-input이 zagjs의 tags-input에 의존하고 있어 zagjs/tags-input에 문제가 있는 것으로 파악했음
- zagjs가 어떻게 UI 상태를 상태머신으로 구현했는지 파악하는 중
	- [At this point, I had no idea how we were going to achieve that but it became clearer when I built a proof of concept for some of the components in Chakra UI using XState.](https://www.adebayosegun.com/blog/the-future-of-chakra-ui#:~:text=At%20this%20point%2C%20I%20had%20no%20idea%20how%20we%20were%20going%20to%20achieve%20that%20but%20it%20became%20clearer%20when%20I%20built%20a%20proof%20of%20concept%20for%20some%20of%20the%20components%20in%20Chakra%20UI%20using%20XState.)
	- 중요한 개념: finite state machine, connect, state

