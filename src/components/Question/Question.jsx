import PosibleAnswer from "../PosibleAnswer/PosibleAnswer.jsx";
import "./Question.css";
import { useState, useEffect } from "react";

export default function Question({ question, onAnswered }) {
  const [answered, setAnswered] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState("");
  function handleAnswer(option) {
    const isItCorrect = option === question.correct_answer;
    onAnswered(isItCorrect);
    setAnswered(true);
    setChosenAnswer(option);
  }

  function getClass(option) {
    if (answered) {
      if (option == chosenAnswer && chosenAnswer === question.correct_answer) {
        return "correct-answer";
      }

      if (chosenAnswer !== question.correct_answer) {
        if (option == chosenAnswer) {
          return "incorrect-answer";
        }

        if (option == question.correct_answer) {
          return "correct-answer";
        }
      }
    }

    return "";
  }

  useEffect(() => {
    setAnswered(false);
    setChosenAnswer("");
  }, [question]);
  return (
    <div className="question-container">
      <h2>{question.index + 1 + "." + " " + question.question}</h2>
      <div className="answers-container">
        <PosibleAnswer
          onClick={() => handleAnswer(question.options[0])}
          option={question.options[0]}
          disabled={answered}
          className={getClass(question.options[0])}
        >
          {question.options[0]}
        </PosibleAnswer>
        <PosibleAnswer
          onClick={() => handleAnswer(question.options[1])}
          option={question.options[1]}
          disabled={answered}
          className={getClass(question.options[1])}
        >
          {question.options[1]}
        </PosibleAnswer>
        <PosibleAnswer
          onClick={() => handleAnswer(question.options[2])}
          option={question.options[2]}
          disabled={answered}
          className={getClass(question.options[2])}
        >
          {question.options[2]}
        </PosibleAnswer>
        <PosibleAnswer
          onClick={() => handleAnswer(question.options[3])}
          option={question.options[3]}
          disabled={answered}
          className={getClass(question.options[3])}
        >
          {question.options[3]}
        </PosibleAnswer>
      </div>
    </div>
  );
}
