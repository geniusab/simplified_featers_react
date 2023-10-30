import { useEffect, useState } from "react";

export function useLocalStorage(initialState: unknown, key: string) {
  const [value, setValue] = useState(() => {
    const storedValue = JSON.parse(localStorage.getItem(key) || "");
    return storedValue || initialState;
  });

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
