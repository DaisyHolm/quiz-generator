import { useContext, useState, useEffect } from "react";
import { MyQuizzesContext } from "../../Store/my-quizzes-context";
import { useParams } from "react-router-dom";
import Question from "../Question/Question.jsx";
import ResultModal from "../ResultModal/ResultModal.jsx";

export default function PlayQuiz() {
  const params = useParams();
  const { quizzesList } = useContext(MyQuizzesContext);
  const currentQuiz = quizzesList[params.quizId];
  const { questions } = currentQuiz;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [collectedResults, setCollectedResults] = useState([]); //Array of booleans
  const [isOpen, setIsOpen] = useState(false);

  function questionAnswered(isItCorrect) {
    setCollectedResults((prev) => [...prev, isItCorrect]);
  }

  useEffect(() => {
    if (collectedResults.length > 0) {
      setTimeout(() => {
        console.log(
          currentQuestion,
          questions.length,
          collectedResults.length,
          "view"
        );
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1);
        }
        if (collectedResults.length === questions.length) {
          setIsOpen(true);
        }
      }, 2000);
    }
  }, [collectedResults]);
  console.log(questions, currentQuestion, "!!!!");
  return (
    <>
      <Question
        onAnswered={questionAnswered}
        question={questions[currentQuestion]}
        index={currentQuestion}
      />
      {isOpen && <ResultModal results={collectedResults} />}
    </>
  );
}
