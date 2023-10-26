function Question({ question, answer, dispatch }) {
  const hasAnswered = answer !== null;

  const handleClick = index => {
    dispatch({ type: "newAnswer", payload: index });
  };

  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, i) => {
          const classNames = `btn btn-option ${i === answer ? "answer" : ""} ${
            answer === i
              ? question.correctOption === answer
                ? "correct"
                : "wrong"
              : ""
          }`;

          return (
            <button
              key={`option-${i}`}
              disabled={hasAnswered}
              className={classNames}
              onClick={() => handleClick(i)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Question;
