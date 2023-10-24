import React, { memo, useState, useEffect } from "react";

const Timer = memo(({ secondsRemaining, dispatch, status }) => {
  const [time, setTimer] = useState(0);
  const [minute, setMinutes] = useState(0);

  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer(prev => prev + 1);
      if (status === "active") {
        dispatch({ type: "tick" });
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [status]);

  return (
    <>
      <div className="timer">
        Timer &nbsp; {Math.floor(time / 60) < 10 ? "0" : ""}
        {Math.floor(time / 60)} : {time % 60 < 10 ? "0" : ""}
        {time % 60}
      </div>
      {secondsRemaining && (
        <div className="timer">
          Left Time &nbsp; {mins}:{seconds}
        </div>
      )}
    </>
  );
});

export default Timer;
