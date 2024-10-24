import type Reactns from "react";
export default function Plugin1({
	count: countinit,
	React,
}: { count: number; React: typeof Reactns }) {
	const [count, setcount] = React.useState(countinit);
	return (
		<>
			<h1>This is Plugin2</h1>
			<div>counter:{count}</div>
			<button
				type="button"
				onClick={() => {
					setcount(count + 1);
				}}
			>
				+
			</button>
		</>
	);
}
