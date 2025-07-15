import "./EditQuestion.css";

import { useContext, useState } from "react";
import Button from "../Button/Button.jsx";
import { MyQuizzesContext } from "../../Store/my-quizzes-context.jsx";

export default function EditQuestion({ question, index, id, setIsEditing }) {
  const { updateAndSaveQuestion, deleteQuestion } =
    useContext(MyQuizzesContext);
  const [questionAndAnswers, setQuestionAndAnswers] = useState({
    question: question.question,
    options: question.options,
    correctAnswerIndex: question.correctAnswerIndex,
    correct_answer: question.correct_answer,
  });

  function handleSetQuestion(value) {
    setQuestionAndAnswers((prev) => ({ ...prev, question: value }));
  }
  function handleSetOption(index, value) {
    setQuestionAndAnswers((prev) => ({
      ...prev,
      options: prev.options.map((option, i) => (i === index ? value : option)),
    }));
  }
  function handleCheckboxChange(index) {
    setQuestionAndAnswers((prev) => ({
      ...prev,
      correctAnswerIndex: index,
      correct_answer: prev.options[index],
    }));
  }
  function finishEditing() {
    updateAndSaveQuestion(id, questionAndAnswers, index);
    setIsEditing(false);
  }
  function handleDeleteQuestion() {
    deleteQuestion(id, index);
    setIsEditing(false);
  }
  return (
    <>
      <div className="create-question-container">
        <div className="create-question">
          <input
            type="text"
            value={questionAndAnswers.question}
            onChange={(e) => handleSetQuestion(e.target.value)}
          />
        </div>
        <div className="create-options">
          {questionAndAnswers.options.map((option, index) => (
            <div className="create-option" key={index}>
              <input
                type="checkbox"
                checked={questionAndAnswers.correctAnswerIndex === index}
                onChange={() => handleCheckboxChange(index)}
              />
              <input
                type="text"
                value={questionAndAnswers.options[index]}
                onChange={(e) => handleSetOption(index, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="edit-question-buttons">
          <Button onClick={finishEditing}>Save</Button>
          <Button path={`/edit-quiz/${id}`} onClick={handleDeleteQuestion}>
            Delete Question
          </Button>
        </div>
      </div>
    </>
  );
}
