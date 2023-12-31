import { useEffect } from "react";
import { useQuiz } from "./context/QuizContext";
import { useLocalStorage } from "../useLocalStorage";

function FinishScreen() {
  // const [value, setValue] = useLocalStorage(0, "highscore");
  const { points, maxPossiblePoints, highscore, dispatch, setHighscore } =
    useQuiz();
  const percentage = Math.ceil((points / maxPossiblePoints) * 100);

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  useEffect(() => {
    console.log("finished");
    console.log({ highscore, points });
    setHighscore(() => highscore);
  }, []);

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints}({percentage}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button className="btn" onClick={() => dispatch({ type: "reset" })}>
        Reset Quiz
      </button>
    </>
  );
}

export default FinishScreen;
