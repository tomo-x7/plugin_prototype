import { useEffect, useRef, useState } from "react";
import { Notfound } from "./notfound";
import Reactns from "react";

type plugins = { elem1: string };
type elem1 = React.FC<{ count: number; React: typeof Reactns }>;

function App() {
	const [plugins, setplugins] = useState<plugins>();
	const [Elem1, setElem1] = useState<React.ReactNode>();
	const pluginurlinput=useRef<HTMLInputElement>(null)
	useEffect(() => {
		const savedplugins = localStorage.getItem("plugins");
		
		const raw=JSON.parse(savedplugins??"")
		if (!savedplugins||!raw.elem1) {
			const defaultplugin: plugins = {
				elem1: "http://localhost:8080/dist/plugin2.js?import",
			};
			setplugins(defaultplugin);
			localStorage.setItem("plugins", JSON.stringify(defaultplugin));
		} else {
			setplugins(raw);
		}
	}, []);
	useEffect(() => {
		if (!plugins) {
			return;
		}
		import(plugins.elem1)
			.then(({ default: E1 }: { default: elem1 }) => {
				setElem1(<E1 React={Reactns} count={999} />);
			})
			.catch((e) => {
				console.error(e);
				setElem1(<Notfound />);
			});
	}, [plugins]);
	const save = () => {
		const url=pluginurlinput.current?.value
		localStorage.setItem("plugins", JSON.stringify(Object.assign(plugins??{},{elem1:url??plugins?.elem1??""})));
		location.reload()
	};
	return (
		<>
			<h1>プラグインのテストページ</h1>
			<div>↓ここにプラグインのURLを入力</div>
			<input ref={pluginurlinput} defaultValue={plugins?.elem1} />
			<button onClick={save} type="button">保存</button>
			<div>↓プラグインによって表示された要素</div>
			{Elem1}
			<div>テスト用に用意したプラグインはこちら</div>
			<ol>
				<li>URL1</li>
				<li>URL2</li>
			</ol>
			<div>プラグイン作ってみたい人はGithubを参考に</div>
		</>
	);
}

export default App;
