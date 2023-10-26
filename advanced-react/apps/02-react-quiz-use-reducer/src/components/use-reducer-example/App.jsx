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
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import GlobalTimer from "./components/GlobalTimer";
import { useLocalStorage } from "./useLocalStorage";

const initialState = {
  questions: [],
  status: "loading", // error | ready | active | finished
  index: 0,
  answer: null,
  answers: [],
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const QUESTION_PER_SECOND = 10;

function reducer(state, action) {
  switch (action.type) {
    case "dataPending":
      return { ...state, status: "loading" };
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
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
      return { ...initialState, questions: state.questions, status: "ready" };
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

// filter number of questions
// difficulty questions
// store highscore
// all list results
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("useEffect");
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:3003/questions");
        const data = await response.json();
        dispatch({ type: "dataReceived", payload: data.splice(0, 3) });
      } catch (e) {
        console.log(e);
        dispatch({ type: "dataFailed" });
      }
    };

    getData();
  }, []);

  const {
    questions,
    status,
    index,
    points,
    answer,
    highscore,
    secondsRemaining,
  } = state;
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  const [highscore_value] = useLocalStorage("highscore");

  if (highscore !== highscore_value) {
    useLocalStorage("highscore", highscore);
  }
  return (
    <div className="app">
      <Header />
      <h1>{highscore_value}</h1>
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
        <Footer>
          <Timer
            dispatch={dispatch}
            secondsRemaining={secondsRemaining}
            status={status}
          />
          <GlobalTimer />
        </Footer>

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
