function Question({ question, answer, dispatch }) {
  const hasAnswered = answer !== null;

  const handleClick = index => {
    console.log("index", index);
    // const points = numberAnswer === question.correctOption;
    dispatch({
      type: "newAnswer",
      payload: index,
      // payload: {
      //   question: numberAnswer,
      //   point: points ? 10 : 0,
      // },
    });
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

// export function Option({ option, classNames, onHandleClick }) {
//   // const classNames = "btn btn-option ";
//   // const statusClass =
//   option.answer === option.i
//     ? option.correctOption === option.answer
//       ? "correct"
//       : "wrong"
//     : "";

//   return (
//     <button className={classNames} onClick={() => onHandleClick(option.i)}>
//       {option.option}
//     </button>
//   );
// }

export default Question;
