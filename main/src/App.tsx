import { useEffect, useRef, useState } from "react";
import { Notfound } from "./notfound";
import Reactns from "react";

type plugins = { elem1: string };
type elem1 = React.FC<{ count: number; React: typeof Reactns }>;

function App() {
	const [plugins, setplugins] = useState<plugins>();
	const [Elem1, setElem1] = useState<React.ReactNode>();
	const pluginurlinput = useRef<HTMLInputElement>(null);
	useEffect(() => {
		const savedplugins = localStorage.getItem("plugins");

		if (savedplugins) {
			const raw = JSON.parse(savedplugins);
			if (raw.elem1) {
				setplugins(raw);
				return;
			}
		}
		const defaultplugin: plugins = {
			elem1: "https://tomo-x7.github.io/plugin_prototype/plugin1.js",
		};
		setplugins(defaultplugin);
		localStorage.setItem("plugins", JSON.stringify(defaultplugin));
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
		const url = pluginurlinput.current?.value;
		localStorage.setItem(
			"plugins",
			JSON.stringify(
				Object.assign(plugins ?? {}, { elem1: url ?? plugins?.elem1 ?? "" }),
			),
		);
		location.reload();
	};
	return (
		<>
			<h1>プラグインのテストページ</h1>
			<div>↓ここにプラグインのURLを入力</div>
			<input ref={pluginurlinput} defaultValue={plugins?.elem1} />
			<button onClick={save} type="button">
				保存
			</button>
			<div>↓プラグインによって表示された要素</div>
			{Elem1}
			<div>テスト用に用意したプラグインはこちら</div>
			<ul style={{ paddingLeft: "25px" }}>
				<li>https://tomo-x7.github.io/plugin_prototype/plugin1.js</li>
				<li>https://tomo-x7.github.io/plugin_prototype/plugin2.js</li>
			</ul>
			<div>
				プラグイン作ってみたい人は
				<a
					href="https://github.com/tomo-x7/plugin_prototype"
					target="_blank"
					rel="noopener noreferrer"
				>
					Github
				</a>
				を参考にどうぞ
			</div>
		</>
	);
}

export default App;
