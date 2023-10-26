import React, { memo, useState, useEffect } from "react";

const GlobalTimer = () => {
  const [time, setTimer] = useState(0);

  const mins = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="timer">
      Time &nbsp; {mins}:{seconds}
    </div>
  );
};

export default GlobalTimer;
