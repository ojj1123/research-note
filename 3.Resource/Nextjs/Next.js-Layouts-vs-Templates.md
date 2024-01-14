https://www.builder.io/blog/nextjs-14-layouts-templates

## 공통점
- 페이지마다 공통된 스타일을 적용해주고 싶을 때 사용
```tsx
// app/layout.tsx

import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
```

```tsx
// app/template.tsx

"use client";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log("Log page view");
  }, []);
  return <div>{children}</div>;
}
```

## 차이점
- Layout
	- 페이지 라우트할 때마다 상태가 유지됨
	- 페이지 사이에 공통된 상태를 공유해야할 때 사용
	- 리렌더링이 되지 않기 때문에 성능상 이점
```tsx
"use client";
import Link from "next/link";
import { useState } from "react";

export default function AuthLayout({ children }) {
  // 페이지 이동을 하더라도 feedback 상태가 유지됨
  
  const [feedback, setFeedback] = useState("");
  return (
    <div>
      <label htmlFor="feedback">Your UX Feedback</label>
      <input
        id="feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <nav>
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/register">Register</Link>
      </nav>
      {children}
    </div>
  );
}
```
 
- Template
	- 페이지 라우트마다 re-render, re-mounting 됨
	- 페이지를 이동할 때마다 특정 effect나 상태 변경이 필요한 경우 유용
	- (layout에서는 할 수 없는) 페이지 라우팅 시 suspense boundary에서 fallback 를 보여줄 수 있음