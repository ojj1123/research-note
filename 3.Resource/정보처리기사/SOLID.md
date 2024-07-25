#SOLID

[What are solid principles in JavaScript ?](https://www.linkedin.com/pulse/what-solid-principles-javascript-frontend-interview-questions-0jyif/)

단일 책임 원칙(SRP), 개방 폐쇄 원칙(OCP), 리스코프 치환 원칙(LSP), 인터페이스 분리 원칙(ISP), 의존관계 역전 원칙(DIP)

1. 단일 책임 원칙(Single Responsibility Principle, SRP): 함수나 클래스는 한가지 기능만 수행해야 한다는 원칙
    
2. 개방 폐쇄 원칙(Open-Closed Principle, OCP): 클래스는 확장에 개방적이고 수정에 폐쇄적이어야 한다는 원칙 → 상속, 구현, 의존성 주입으로 OCP를 성취할 수 있음
    
3. 리스코프 치환 원칙(Liskov Substitution Principle, LSP): 파생 클래스(서브 클래스)는 기본 클래스(슈퍼 클래스)로 대체 가능해야 한다는 원칙
	Rectangle이 Square에 적절한 대체가 될 수 없기 때문에 Square은 LSP원칙을 어김. (대체하게 되면 사이드 이펙트가 생길 수 있음)

```tsx
// Bad example
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  calculateArea() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  setWidth(width) {
    this.width = width;
    this.height = width;
  }

  setHeight(height) {
    this.width = height;
    this.height = height;
  }
}

let rect = new Rectangle(30, 40);
let sq = new Square(30, 40);
sq = rect
sq.setWidth(300);
sq.setHeight(400);
// setWidth와 setHeight가 서로 다르게 구현됨 => 사이드 이펙트

// Good
// calculateArea가 서로 독립적으로 구현됨
class Shape {
	calculateArea() {
		// ...
	}
}

class Square extends Shape{
	constructor(side) {
		super();
		this.side = side;
	}
	calculateArea() {
		return this.side * this.side;
	}
}

class Rectangle extends Shape{
	constructor(width, height) {
		super();
		this.width = width;
		this.height = height;
	}
	calculateArea() {
		return this.width * this.height;
	}
} 
```

4. 인터페이스 분리 원칙(Interface Segregation Principle, ISP): 자신이 사용하지 않는 인터페이스는 구현하지 말아야 한다는 원칙, 즉 사용하지 않는 인터페이스에는 의존하지 않는다는 의미 -> 사용하지 않는 인터페이스를 사용자에서 강요할 경우 불필요한 의존 관계가 생길 수 있음

```tsx
// Bad
class Printer {
	print() {
	
	}
	
	scan() {
	
	}
	
	fax() {
	
	}
}

// Good
class Printer {
	print() {
	
	}
}

class Scanner {
	scan() {
	
	}
}

class Fax() {
	fax() {
	
	}
}
```

5. 의존관계 역전 원칙(Dependency Inversion Principle, DIP): 고수준 모듈을 저수준 모듈의 구현에 의존해서는 안된다.

```tsx
import axios from 'axios';
import React, {useEffect, useState} from 'React';

function PostComponent() {
  const [post, setPost] = useState(null);

  function getPost() {
    axios.get('<https://example.com>');
  }

  useEffect(() => {
    getPost();
  }, [])

  return <div>{post.title}</div>;
}
```

- `post` 값을 수정하기 위해 axios 모듈의 내부 코드를 수정하지는 말아야 한다. axios는 고수준 모듈이고 post값을 수정하는 것은 저수준 모듈이기 때문이다. 고수준 모듈을 수정하게 된다면 axios에 의존하는 저수준 모듈이 엉망이 될 것이다.

```tsx
async function getPost() {
    await axios.get('<https://example.com>').then((data)=> {
      setPost(data)
    });
  }
```