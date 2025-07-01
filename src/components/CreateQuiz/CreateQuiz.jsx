import Button from "../Button/Button.jsx";
import "./CreateQuiz.css";

export default function CreateQuiz() {
  return (
    <div className="create-question-container">
      <h2>Let's Create A Fun New Quiz!</h2>
      <p>
        Add a title and a small description that match your theme to get
        started. Then whenever you are ready, start adding your questions.
      </p>
      <input type="text" placeholder="Title" className="input-big" />
      <textarea name="description" placeholder="Description"></textarea>
      <div className="create-question-cta">
        <Button>Add question</Button>
        <p className="floating">
          &lt;-- Click here to start creating your quiz
        </p>
      </div>
    </div>
  );
}
