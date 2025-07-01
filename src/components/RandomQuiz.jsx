import { useState, useEffect } from "react";
import QUESTIONS from "../assets/general_knowledge_questions.json";
import Question from "./Question.jsx";
import ResultModal from "./ResultModal.jsx";

export default function RandomQuiz(handleAnswer) {
  const [randomQuiz, setRandomQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [collectedResults, setCollectedResults] = useState([]); //Array of booleans
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function createRandomQuiz() {
      const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10);

      setRandomQuiz(selected);
    }
    createRandomQuiz();
  }, []);

  function questionAnswered(isItCorrect) {
    setCollectedResults((prev) => [...prev, isItCorrect]);
  }

  //   const whatWillIReturn = randomQuiz.length <= 0 ? null : <Question question={randomQuiz[currentQuestion]} />

  useEffect(() => {
    if (collectedResults.length > 0) {
      const timer = setTimeout(() => {
        if (currentQuestion < 9) {
          setCurrentQuestion(currentQuestion + 1);
        }
        if (collectedResults.length === 10) {
          setIsOpen(true);
        }
      }, 2000);
    }
  }, [collectedResults]);
  console.log(isOpen, "open");
  return (
    <>
      {randomQuiz.length === 0 ? null : (
        <Question
          onAnswered={questionAnswered}
          question={randomQuiz[currentQuestion]}
        />
      )}
      {isOpen && <ResultModal results={collectedResults} />}
    </>
  );
}
