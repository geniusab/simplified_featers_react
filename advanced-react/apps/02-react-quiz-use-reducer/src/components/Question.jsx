function Question({ question, answer, dispatch }) {
  const handleClick = numberAnswer => {
    const points = numberAnswer === question.correctOption;
    dispatch({
      type: "answer",
      payload: {
        question: numberAnswer,
        point: points ? 10 : 0,
      },
    });
  };

  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, i) => {
          return (
            <Option
              key={i + "_option"}
              option={{
                option,
                i,
                answer,
                correctOption: question.correctOption,
              }}
              onHandleClick={handleClick}
            />
          );
        })}
      </div>
    </div>
  );
}

export function Option({ option, onHandleClick }) {
  const classNames = "btn btn-option ";
  const statusClass =
    option.answer === option.i
      ? option.correctOption === option.answer
        ? "correct"
        : "wrong"
      : "";

  return (
    <button
      className={classNames + statusClass}
      onClick={() => onHandleClick(option.i)}
    >
      {option.option}
    </button>
  );
}

export default Question;
