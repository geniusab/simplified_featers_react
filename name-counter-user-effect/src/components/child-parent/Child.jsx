import { memo, useState } from "react";

export function Child() {
  const [age, setAge] = useState(0);

  console.log("Child re-render");

  return <button onClick={() => setAge(prev => prev + 1)}>{age}</button>;
}

export const MemoizeChild = memo(Child);
