---
tags:
  - pnpm
---

# pnpm은 어떻게 symlink를 생성하는가?

1. [@pnpm/core](https://github.com/pnpm/pnpm/tree/main/pkg-manager/core) 내부 패키지에서 install 관련 로직 실행
2. `symlinkDependency` 함수를 통해 symlink 생성 로직 실행
	- https://github.com/pnpm/pnpm/blob/3097bcf3739600723b7cdccefcd25462350e946f/pkg-manager/core/src/install/link.ts#L480
	- [symlinkDependency 함수 구현체](https://github.com/pnpm/pnpm/blob/3097bcf3739600723b7cdccefcd25462350e946f/fs/symlink-dependency/src/index.ts#L7-L15)
3. `symlinkDependency`함수는 symlink-dir 패키지에 의존
	-  [symlink-dir](https://www.npmjs.com/package/symlink-dir) : pnpm에서 만든 cross-platform directory symlinking 패키지, pnpm 내부에서 사용하기 위해 만든 symlinking 구현체
4. symlink-dir 패키지의 `symlinkDir` 메서드는 `target`에서 `path`로 이어지는 symlink를 생성해줌
	```ts
	symlinkDir.sync(target, path, opts?): { reused: boolean, warn?: string }
	```
	- symlink 생성 관련 테스트코드
		```ts
		// https://github.com/pnpm/symlink-dir/blob/fe49d5372c0882ff82a50dd95cced40a186bd33c/test/sync.ts#L9-L22
		test('rename target folder if it exists', async (t) => {
		  const temp = tempy.directory()
		  t.comment(`testing in ${temp}`)
		  process.chdir(temp)
		
		  await fs.mkdir('src')
		  await fs.mkdir('dest')
		
		  const { warn } = symlink.sync('src', 'dest')
		
		  t.ok(warn && warn.indexOf('Symlink wanted name was occupied by directory or file') === 0, 'dest folder ignored')
		
		  t.end()
		})
		```

5. node의 [`fs.symlink`](https://www.geeksforgeeks.org/node-js-fs-symlink-function/) 함수 사용
	- https://github.com/pnpm/symlink-dir/blob/fe49d5372c0882ff82a50dd95cced40a186bd33c/src/index.ts#L46
	```ts
	async function forceSymlink (
	  target: string,
	  path: string,
	  opts?: {
	    overwrite?: boolean
	    renameTried?: boolean
	  }
	): Promise<{ reused: Boolean, warn?: string }> {
	  try {
	    await fs.symlink(target, path, symlinkType)
	    return { reused: false }
	  } catch (err) {
	  ...
	```