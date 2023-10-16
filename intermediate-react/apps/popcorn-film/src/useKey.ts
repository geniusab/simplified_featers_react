import { useEffect } from "react";

export function useKey(key: string, action: any) {
  useEffect(() => {
    function callback(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action(null);
        console.log("closing");
      }
    }
    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, [key, action]);

  return;
}
