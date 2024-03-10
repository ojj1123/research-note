# Hash table

- Key-value 로 삽입/조회/삭제를 수행할 수 있는 데이터 구조
- hash function 으로 key의 hashcode를 구하고 index와 maping하여 hash table에서 값을 얻는다

## Hash function
- key의 hashcode를 구해주는 함수
- `buckets[key]` 로 바로 저장하는 것이 아니라 `buckets[hash(key)]` 를 통해 key를 hashing 하여 버킷에 저장
- hash function을 잘 선택해야 하는 이유
	- hash code가 고르게 분포해야 hash 충돌이 발생하지 않는다. 고르게 분포하지 않으면 해시 충돌이 자주 발생한다

## Hash collision
- hash function을 통해 구한 hashcode가 동일하여 충돌하는 현상
- 충돌하게 되면 검색 성능에 영향을 주게 된다. 따라서 이를 조절할 필요가 있다.
- hash collision을 조절하는 방법
	- chaining
	- open addressing
	- double hashing
	- robin hood hashing

## Implementation
- [hash-table.js](./hash-table.js)

```js
const defaultSize = 32;
class HashTable {
	#buckets;
	#size;
	
	constructor(initialSize = defaultSize) {
		this.#buckets = Array.from(Array(initialSize), () => []);
		this.#size = initialSize;
	}
	
	hash(key) {
		const hash = Array.from(key).reduce(
			(acc, cur) => acc + cur.charCodeAt(0),
			0
		);
		
		return hash % this.#size;
	}
	
	set(key, value) {
		const hashCode = this.hash(key);
		const index = this.#buckets[hashCode].findIndex((item) => key === item.key);
		
		if (index > -1) {
			this.#buckets[hashCode][index] = { key, value };
			return;
		}
		
		this.#buckets[hashCode].push({ key, value });
	}
	
	get(key) {
		const hashCode = this.hash(key);
		const item = this.#buckets[hashCode].find((item) => item.key === key);
		
		if (!item) {
			console.log(`The value of key "${key}" do not exist`);
			return;
		}
		return item.value;
	}

	delete(key) {
		const hashCode = this.hash(key);
		const index = this.#buckets[hashCode].findIndex((item) => item.key === key);
		
		if (index > -1) {
			this.#buckets[hashCode].splice(index, 1);
		}
	}
}
```

## 궁금한 것
- collision을 조절하는 방법
- hash table이 너무 커지면 성능에 영향을 줄까? 준다면 어떻게 성능 조절을 할까?

## 참고
- [Data Structures: Hash Tables](https://youtu.be/shs0KM3wKv8?si=3bk_Y2YKpLTUEla9)
- [Hash Table Data Structure - GeeksforGeeks](https://www.geeksforgeeks.org/hash-table-data-structure/)
- [Hash table - Wikipedia](https://en.wikipedia.org/wiki/Hash_table)
- [javascript-algorithms/data-structures/hash-table](https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/hash-table)
