import React, { memo, useEffect } from "react";
import { useQuiz } from "./context/QuizContext";

const Timer = memo(() => {
  const { secondsRemaining, dispatch, status } = useQuiz();
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const timerId = setInterval(() => {
      if (status === "active") {
        dispatch({ type: "tick" });
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [status]);

  return (
    <div className="timer">
      Left Time &nbsp; {mins < 10 ? `0${mins}` : mins}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
});

export default Timer;
