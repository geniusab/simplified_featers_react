function Progress({ index, points, numQuestions, maxPossiblePoints }) {
  return (
    <header className="progress">
      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPossiblePoints}
      </p>
      <progress max={numQuestions} value={index}></progress>
    </header>
  );
}

export default Progress;
