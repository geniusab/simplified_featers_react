import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QuizProvider } from "./components/context/QuizContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <QuizProvider>
    <App />
  </QuizProvider>
);
