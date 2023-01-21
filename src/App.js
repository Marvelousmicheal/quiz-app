import Home from "./components/Home";
import QuizInstruction from "./components/quiz/QuizInstruction";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Play from "./components/quiz/Play";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <withRouter><Route path="/" exact element={<Home />} /></withRouter>
        <Route path="/play/instructions" exact element={<QuizInstruction />} />
        <Route path="/play/quiz" exact element={<Play />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
