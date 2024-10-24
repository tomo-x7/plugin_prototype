import type Reactns from "react";
export default function Plugin1({
	count,
	React,
}: { count: number; React: typeof Reactns }) {
	return <h1>This is Plugin1</h1>;
}
