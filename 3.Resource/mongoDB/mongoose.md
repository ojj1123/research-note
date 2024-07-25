https://mongoosejs.com/

- mongoose : node.js용 mongoDB 모델링 도구

## 용어
- collection: RDB의 table 같은 것. 다만 schemeless이기 때문에 같은 collection에 다른 형식의 document가 올 수 있음
- document: collection에 들어가는 키-값 형식의 BSON(JSON의 이진형태) 데이터
	![](Pasted%20image%2020240723183834.png)



## Mongoose docs

- mongoose에서 document는 Model의 인스턴스임
```js
// document의 scheme을 만드는 것
const kittyScheme = new Scheme({
	name: String
})
```
