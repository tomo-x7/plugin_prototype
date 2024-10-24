export default function Plugin1({ count: countinit, React, }) {
    const [count, setcount] = React.useState(countinit);
    return (React.createElement(React.Fragment, null,
        React.createElement("h1", null, "This is Plugin2"),
        React.createElement("div", null,
            "counter",
            count),
        React.createElement("button", { type: "button", onClick: () => {
                setcount(count + 1);
            } }, "+")));
}
