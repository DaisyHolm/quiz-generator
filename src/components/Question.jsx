import PosibleAnswer from "./PosibleAnswer.jsx";

export default function Question({ question }) {
  return (
    <div className="question-container">
      <h2>{question.question}</h2>
      <PosibleAnswer>{question.options[0]}</PosibleAnswer>
      <PosibleAnswer>{question.options[1]}</PosibleAnswer>
      <PosibleAnswer>{question.options[2]}</PosibleAnswer>
      <PosibleAnswer>{question.options[3]}</PosibleAnswer>
    </div>
  );
}
