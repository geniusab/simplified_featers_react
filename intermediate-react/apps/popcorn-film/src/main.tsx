import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import App from "./App-v1.tsx";
import "./index.css";
// import { StarRating } from "./components/StarRating.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <App />
    {/* <StarRating maxRating={10} />
    <StarRating maxRating={5} />
    <StarRating />
    <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating size={24} color="red" className="test" defaultRating={2} /> */}
  </>
);
