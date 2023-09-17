import { useState } from "react";
import { /*Child*/ MemoizeChild } from "./Child";

export function Parent() {
  const [name, setName] = useState("kirrill");

  console.log("Parent re-render");
  return (
    <>
      <p>{name}</p>
      {/* <Child /> */}

      <MemoizeChild />
      <input onChange={e => setName(e.target.value)} />
    </>
  );
}
