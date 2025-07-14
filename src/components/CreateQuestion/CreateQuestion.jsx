import Button from "../Button/Button";
import "./CreateQuestion.css";
import { useContext, useState } from "react";
import { MyQuizzesContext } from "../../Store/my-quizzes-context";
import { useNavigate } from "react-router-dom";

export default function CreateQuestion() {
  const navigate = useNavigate();
  const { addQuestion, endQuestions } = useContext(MyQuizzesContext);
  const [questionAndAnswers, setQuestionAndAnswer] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswerIndex: null,
  });

  function handleSetQuestion(e) {
    setQuestionAndAnswer((prev) => ({ ...prev, question: e.target.value }));
  }
  function handleCheckboxChange(index) {
    setQuestionAndAnswer((prev) => ({
      ...prev,
      correctAnswerIndex: index,
    }));
  }
  function handleSetOption(index, value) {
    setQuestionAndAnswer((prev) => {
      const updatedOptions = [...prev.options];
      updatedOptions[index] = value;
      return { ...prev, options: updatedOptions };
    });
  }
  function handleCreateQuestion() {
    const { question, options, correctAnswerIndex } = questionAndAnswers;

    if (correctAnswerIndex === null) {
      alert("Please select the correct answer!");
      return;
    }
    if (question === "") {
      alert("Please write your question in the top field.");
      return;
    }
    if (options.includes("")) {
      alert("Please give four different posible answers before proceeding.");
      return;
    }

    addQuestion({
      question: question,
      options: options,
      correct_answer: options[correctAnswerIndex],
      correctAnswerIndex: correctAnswerIndex,
    });
    setQuestionAndAnswer({
      question: "",
      options: ["", "", "", ""],
      correctAnswerIndex: null,
    });
  }
  function handleRedirectToMyQuizzes() {
    navigate("/my-quizzes");
    setTimeout(() => {
      endQuestions();
    }, 0);
  }
  function handleSaveAndLeave() {
    const { question, options, correctAnswerIndex } = questionAndAnswers;

    if (question === "") {
      handleRedirectToMyQuizzes();
      return;
    }

    if (correctAnswerIndex === null) {
      alert("Please select the correct answer!");
      return;
    }

    if (options.includes("")) {
      alert("Please give four different posible answers before proceeding.");
      return;
    }
    addQuestion({
      question: question,
      options: options,
      correct_answer: options[correctAnswerIndex],
      correctAnswerIndex: correctAnswerIndex,
    });

    handleRedirectToMyQuizzes();
  }

  return (
    <>
      <div className="create-question-container">
        <div className="create-question">
          <input
            type="text"
            placeholder="Write your question here."
            value={questionAndAnswers.question}
            onChange={handleSetQuestion}
          />
        </div>
        <div className="create-options">
          {questionAndAnswers.options.map((option, index) => (
            <div className="create-option" key={index}>
              <input
                type="checkbox"
                checked={questionAndAnswers.correctAnswerIndex === index} // Only the selected checkbox is checked
                onChange={() => handleCheckboxChange(index)} // Update the selected checkbox
              />
              <input
                type="text"
                value={option}
                onChange={(e) => handleSetOption(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <p className="warning">
          * Don't forget to tick the box of the correct answer!
        </p>
        <div className="create-question-btns">
          <Button onClick={handleCreateQuestion}>Add question +</Button>
          <Button onClick={handleSaveAndLeave}>Save & Leave</Button>
        </div>
      </div>
    </>
  );
}
