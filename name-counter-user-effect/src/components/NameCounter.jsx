import { useState } from "react";

export function NameCounter() {
  const [name, setName] = useState("kirrill");

  const [age, setAge] = useState(0);

  return (
    <>
      <p>{name}</p>
      <p>{age}</p>
      <input onChange={e => setName(e.target.value)} />
      <button onClick={() => setAge(prev => prev + 1)}>+</button>
      <button onClick={() => setAge(prev => (prev > 1 ? prev - 1 : prev))}>
        -
      </button>
    </>
  );
}
