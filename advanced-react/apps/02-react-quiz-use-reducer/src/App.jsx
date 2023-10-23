import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Welcome from "./components/Welcome";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";

const initialState = {
  questions: [],
  status: "loading", // error | ready | active | finished
  index: 0,
  answer: null,
  answers: [],
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataPending":
      return { ...state, status: "loading" };
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, questions: [], status: "error" };
    case "start":
      return { ...state, status: "active" };
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
      return { ...initialState, questions: state.questions, status: "ready" };
    }

    default:
      throw new Error("Action uknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("useEffect");
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:3003/questions");
        const data = await response.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (e) {
        console.log(e);
        dispatch({ type: "dataFailed" });
      }
    };

    getData();
  }, []);

  const { questions, status, index, points, answer, highscore } = state;
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Welcome numQuestions={questions.length} dispatch={dispatch} />
        )}

        {status === "active" && index < 15 && (
          <>
            <Progress
              index={index}
              points={points}
              numQuestions={numQuestions}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}

        {/* {index === 15 && (
          <>
            <h1>Points: {points}</h1>
            {questions.map((question, i) => {
              return (
                <Question
                  key={i + "_"}
                  question={question}
                  answer={answers[i]}
                  index={i}
                />
              );
            })}
            <button className="btn" onClick={() => dispatch({ type: "reset" })}>
              Reset
            </button>
          </>
        )} */}
      </Main>
    </div>
  );
}

export default App;
