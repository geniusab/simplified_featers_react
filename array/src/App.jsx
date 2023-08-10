import "./App.css";
import { TestComponent } from "./TestComponent";
import { TestComponent1 } from "./TestComponent1";
import { TestComponent2 } from "./TestComponent2";
import { useRef } from "react";

function App() {
  const inputValue = useRef(null);

  return (
    <>
      <TestComponent title={"111"}></TestComponent>
      <TestComponent1></TestComponent1>
      <input ref={inputValue} type="number" defaultValue="3" />

      <TestComponent2 name="NAna">
        <label>
          check <input type="checkbox" />
        </label>
      </TestComponent2>
    </>
  );
}

export default App;
