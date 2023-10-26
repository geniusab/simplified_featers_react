import { useEffect } from "react";
import { useLocalStorage } from "../useLocalStorage";
import { useQuiz } from "./context/QuizContext";

function NextButton() {
  const [value, setValue] = useLocalStorage(0, "highscore");
  const { dispatch, answer, index, highscore, status, numQuestions, points } =
    useQuiz();

  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion", payload: 0 })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1) {
    const handleResult = () => {
      dispatch({ type: "finish" });
      setValue(highscore);
    };

    return (
      <button className="btn btn-ui" onClick={handleResult}>
        Finish
      </button>
    );
  }
}

export default NextButton;
