[](https://vercel.com/docs/speed-insights#core-web-vitals-explained)

# FCP(First contentful Paint)

- 페이지가 로드될 때부터 페이지 콘텐츠 일부를 그리는데 걸리는 시간
- 한계: 화면에 빨리 그리는 것은 ‘사용자가 화면과 상호작용하는 것’과는 별개의 이야기임
- 그래서 FID 메트릭이 나옴

# LCP(Largest Contentful Paint)

- 화면에 가장 큰 요소가 완전히 보이는데 걸리는 시간

# CLS(Cumulative Layout Shift)

- 레이아웃 쉬프트가 얼마나 발생하는지 나타내는 매트릭

# FID(First Input Delay)

- `사용자가 처음 페이지와 상호작용한 시점`부터 (즉, 사용자가 링크를 클릭하거나 버튼을 탭하거나 맞춤 JavaScript 기반 컨트롤을 사용하는 시점) `브라우저에서 상호작용에 대한 응답으로 이벤트 핸들러 처리를 실제로 시작할 수 있는 시점`
    - Event Timing API를 사용해서 점수를 매기는 데 몇가지 단점(첫번째 상호작용만 고려, 스크롤 상호작용 측정 못함)으로 인해 INP가 새로 도입되고 있음

# INP(Interaction Next Paint)

- 유저의 인터렉션부터 그 인터랙션이 화면에 보이는데까지 걸리는 시간

# TBT(Total Blocking Time)

- FCP와 TTI(Time to Interactive)간 차이