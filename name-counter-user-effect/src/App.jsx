import { useState } from "react";

import "./App.css";
import { NameCounter } from "./components/NameCounter";
import { Parent } from "./components/child-parent/Parent";

const initialState = ["A", "B", "C"];

function App() {
  const [state, setState] = useState(initialState);
  const [name, setName] = useState("Mark");
  const [age, setAge] = useState(12);

  console.log("render");

  const remove = () => {
    setState(prev => {
      return prev.slice(1);
    });
  };

  const add = () => {
    const value = Math.round(Math.random() * 1000);
    setState(prev => {
      // return [Math.round(Math.random() * 100), ...prev];

      return [value, ...prev];
    });
  };

  const addLast = () => {
    const value = Math.round(Math.random() * 1000);

    setState(prev => {
      return [...prev, value];
    });
  };

  const reset = () => {
    setState(initialState);
  };

  const clear = () => {
    setState([]);
  };

  const update = () => {
    setState(prev => {
      const newPrev = prev.map(() => {
        return "H";
      });

      return newPrev;
    });
  };

  function handleChange() {
    setName("Sally");
    setAge(prev => prev + 1);
    setAge(prev => prev + 1);
  }

  return (
    <>
      <div style={{ position: "relative" }}>
        <NameCounter />
        <button onClick={handleChange}>handleChange</button>
        <h2>
          Name: {name}/ age: {age}
        </h2>
        <header style={{ position: "sticky", top: 0 }}>
          <button style={{ background: "yellow" }} onClick={() => remove()}>
            remove first{" "}
          </button>
          <button onClick={() => add()}>add first </button>
          <button onClick={() => addLast()}>add addLast </button>
          <button onClick={() => clear()}>clear </button>
          <button onClick={() => reset()}>reset </button>
          <button onClick={() => update()}>update H </button>
        </header>
        {state.map((v, i) => (
          <div key={v + "-" + i}>{v}</div>
        ))}

        <hr />
        <Parent />
      </div>
    </>
  );
}

export default App;
