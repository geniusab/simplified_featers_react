import { useReducer, useEffect, useContext, createContext } from "react";
import { useLocalStorage } from "../../useLocalStorage";

const QuizContext = createContext(null);

const QUESTION_PER_SECOND = 10;

const initialState = {
  questions: [],
  status: "loading", // 'loading', 'error', 'ready', 'active', 'finished'
  index: 0,
  answer: null,
  answers: [],
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataPending":
      return { ...state, status: "loading" };
    case "dataReceived":
      return {
        ...state,
        questions: action.payload.questions,
        highscore: action.payload.highscore,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, questions: [], status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * QUESTION_PER_SECOND,
      };
    case "newAnswer":
      // eslint-disable-next-line no-case-declarations
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        // answers: [...state.answers, action.payload.question],
      };
    case "nextQuestion": {
      return { ...state, answer: null, index: state.index + 1 };
    }
    case "finish": {
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    }
    case "reset": {
      return {
        ...initialState,
        questions: state.questions,
        highscore: state.highscore,
        status: "ready",
      };
    }

    case "tick": {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    }
    default:
      throw new Error("Action uknown");
  }
}

function QuizProvider({ children }) {
  const [value, setHighscore] = useLocalStorage(0, "highscore");
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },

    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:3003/questions")
      .then(res => res.json())
      .then(data =>
        dispatch({
          type: "dataReceived",
          payload: { questions: data, highscore: value },
        })
      )
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,

        dispatch,
        setHighscore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
