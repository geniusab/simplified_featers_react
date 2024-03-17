import "./App.css";
import Counter from "./Counter";
import Modal from "./Modal";
import "./styles.css";

function App() {
  return (
    <>
      <Counter
        iconIncrease="+"
        iconDecrease="-"
        label="My NOT so flexible counter"
        hideLabel={false}
        hideIncrease={false}
        hideDecrease={false}
      />

      <Counter>
        <Counter.Label>My Super flexible counter</Counter.Label>
        <Counter.Decrease icon="-" />
        <Counter.Count />
        <Counter.Increase icon="+" />
      </Counter>
      <br />
      <hr />
      <Counter>
        <Counter.Label>My Super flexible counter</Counter.Label>
        <Counter.Decrease icon="-" />
        <Counter.Count />
        <Counter.Increase icon="+" />
      </Counter>

      <Modal />
    </>
  );
}

export default App;
