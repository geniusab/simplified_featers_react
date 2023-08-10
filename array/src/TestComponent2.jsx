import { useEffect } from "react";

export function TestComponent2({
  children,
  name = "test name",
  isPublic = false,
}) {
  console.log("isPublic", isPublic);

  // useEffect(() => {
  //   console.log("isPublic1", isPublic);
  // }, []);

  return (
    <div>
      {name}

      <p>{children}</p>
    </div>
  );
}
