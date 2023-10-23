import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Welcome from "./components/Welcome";
import Question from "./components/Question";

const initialState = {
  questions: [],

  // loading error ready active finished
  // status: "loading",
  // index: 0,

  status: "loading",
  index: 0,
  answers: [],
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataPending":
      return {
        ...state,
        status: "loading",
      };
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "active",
      };
    case "dataFailed":
      return {
        ...state,
        questions: [],
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
      };
    case "answer":
      return {
        ...state,
        answers: [...state.answers, action.payload.question],
        index: state.index < 15 ? state.index + 1 : state.index,
        points: state.points + action.payload.point,
      };

    case "reset": {
      return initialState;
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

  const { questions, status, index, points, answers } = state;

  return (
    <div className="app">
      <Header />
      <Main>
        <h1>Step: {index}</h1>
        <h2> Points: {points}</h2>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Welcome numQuestions={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && index < 15 && (
          <Question
            question={questions[index]}
            answer={answers[index]}
            dispatch={dispatch}
          />
        )}

        {index === 15 && (
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
        )}
      </Main>
    </div>
  );
}

export default App;
