# プラグインの作り方
> [!WARNING]
> これはテスト用です。遊ぶ以外の用途には使えません
## 最小構成
### ソースコード
```TypeScript:plugin.tsx
//型をつけるために必要、バンドルはされない
import type Reactns from "react";
export default function Plugin1({
	count,
	React,
}: { count: number; React: typeof Reactns }) {
	return <h1>This is Plugin1</h1>;
}
```
### ビルド
```Shell
$ pnpm init
$ pnpm i -D typescript @types/react
$ pnpm tsc ./plugin.tsx --jsx React --target es2015 --moduleResolution Bundler
```
出力された`plugin.js`ファイルをURL指定で読み込むことができます
> [!CAUTION]
> MIMEタイプが`text/javascript`でない場合正しく読み込めないことがあります  
> おすすめのデプロイ先はGithub Pagesです