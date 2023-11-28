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
// import GlobalTimer from "./components/GlobalTimer";
// import { useLocalStorage } from "./useLocalStorage";
import { useQuiz } from "./components/context/QuizContext";

// filter number of questions
// difficulty questions
// store highscore
// all list results
function App() {
  const { status, highscore } = useQuiz();

  return (
    <div className="app">
      <Header />

      <Main>
        <p className="highscore">(Highscore: {highscore} points)</p>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <Welcome />}

        {status === "active" && (
          <>
            <Progress />
            <Question />
            <NextButton />
          </>
        )}

        {status === "finished" && <FinishScreen />}
        <Footer>
          <Timer />
        </Footer>
      </Main>
    </div>
  );
}

export default App;
