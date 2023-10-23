import { useState, useMemo, memo } from "react";
import React from "react";
import "./App.css";

function slowlyCalculateTextColor(color) {
  const arr = [];
  for (let i = 0; i < 10000110; i++) {
    arr.push(Math.round(i));
  }
  return color;
}

const shouldComponentUpdate = (prevProps, nextProps) => {
  // ✅ Compares this.props.onClick
  return (
    nextProps.color !== prevProps.color ||
    nextProps.onClick !== prevProps.onClick
  );
};
function Button({ color, onClick, children }) {
  console.log("Button rerendered");
  const textColor = useMemo(() => slowlyCalculateTextColor(color), []);
  return (
    // ✅ `color` is always fresh!
    <button
      className={"Button-" + color + " Button-text-" + textColor}
      onClick={onClick}
    >
      {children || "Button"}
    </button>
  );
}

const MemoButton = memo(Button, shouldComponentUpdate);

function App() {
  const [isOk, setIsOk] = useState(false);
  return (
    <>
      <div>
        <MyForm />
      </div>
      <button onClick={() => setIsOk(prev => !prev)}>isOk {isOk + ""}</button>
      // isOk might be driven by state and can change at any time
      <Button color={isOk ? "blue" : "red"} />
      <h1>Principle 1: Don’t Stop the Data Flow</h1>
    </>
  );
}

function MyForm() {
  const [isEnabled, setEnabled] = useState(true);
  const handleClick = () => {
    setEnabled(false);
    console.log({ isEnabled });
    // Do something
  };

  return (
    <>
      <h1>Hello!</h1>
      {[1, 2, 3].map((i, index) => {
        return (
          <React.Fragment key={i}>
            <Button
              color="green"
              onClick={
                // 🔴 Button ignores updates to the onClick prop
                isEnabled ? handleClick : null
              }
            >
              Press me {i}
            </Button>

            <MemoButton color="green" onClick={isEnabled ? handleClick : null}>
              Press me MemoButton {i}
            </MemoButton>
          </React.Fragment>
        );
      })}
    </>
  );
}

export default App;
