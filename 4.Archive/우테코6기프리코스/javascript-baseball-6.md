- node version update
	- https://www.freecodecamp.org/korean/news/how-to-update-node-and-npm-to-the-latest-version/
- .npmrc
	- npm 설정 파일
	- `engine-strict = true` : package.json 에 있는 `engines` 옵션을 강제하는 것 [](https://docs.npmjs.com/cli/v10/using-npm/config#engine-strict)
		- `package.json`의 `engines` 옵션 : 작업중인 프로젝트의 node 버전을 권고하는 것 [](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#engines)

- vscode javascript 디버깅 할 때 사용자 입력을 콘솔로 받게 하려면
	- launch.json 에 configurations 내에 다음과 같은 옵션을 넣어줘야 함
	- [I'm using JS in VScode and I'm trying to take user input through prompt cmd, but it's not working. I've already installed prompt-sync](https://stackoverflow.com/questions/74222369/im-using-js-in-vscode-and-im-trying-to-take-user-input-through-prompt-cmd-but)
```json
{

"version": "0.2.0",

	"configurations": [

		{
	
			"console": "integratedTerminal", // -> 이 옵션을 통해 터미널과 콘솔을 연결
			
			"type": "node",
			
			"request": "launch",
			
			"name": "프로그램 시작",
			
			"skipFiles": ["<node_internals>/**"],
			
			"program": "${workspaceFolder}/src/App.js"
		
		}

	]

}
```