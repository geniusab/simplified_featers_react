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
  status: "loading",
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
        status: "ready",
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

    default:
      throw new Error("Action uknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getData = async () => {
      // dispatch({ type: "dataPending" });
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

  const { questions, status } = state;

  console.log(questions);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Welcome numQuestions={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && <Question />}
      </Main>
    </div>
  );
}

export default App;
