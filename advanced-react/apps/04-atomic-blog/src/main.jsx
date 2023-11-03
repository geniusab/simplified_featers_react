import ReactDOM from "react-dom/client";
import { BlogProvider } from "./BlogContext";
import "./style.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BlogProvider>
    <App />
  </BlogProvider>
);
