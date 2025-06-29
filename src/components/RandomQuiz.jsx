import { useState, useEffect } from "react";
import QUESTIONS from "../assets/general_knowledge_questions.json";
import Question from "./Question.jsx";

export default function RandomQuiz() {
  const [randomQuiz, setRandomQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    function createRandomQuiz() {
      const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10);

      setRandomQuiz(selected);
    }
    createRandomQuiz();
  }, []);
  console.log(randomQuiz, "!");
  //   const whatWillIReturn = randomQuiz.length <= 0 ? null : <Question question={randomQuiz[currentQuestion]} />

  return randomQuiz.length <= 0 ? null : (
    <Question question={randomQuiz[currentQuestion]} />
  );
}
