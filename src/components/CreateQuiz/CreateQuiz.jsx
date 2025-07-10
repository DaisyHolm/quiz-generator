import Button from "../Button/Button.jsx";
import "./CreateQuiz.css";
import { useRef } from "react";
import CreateQuestion from "../CreateQuestion/CreateQuestion.jsx";
import { MyQuizzesContext } from "../../Store/my-quizzes-context.jsx";
import { useContext } from "react";

export default function CreateQuiz() {
  const { createQuiz, isCreatingQuestion } = useContext(MyQuizzesContext);

  const titleRef = useRef();
  const descriptionRef = useRef();
  return (
    <>
      {isCreatingQuestion ? (
        <CreateQuestion />
      ) : (
        <div className="create-quiz-container">
          <h2>Let's Create A Fun New Quiz!</h2>
          <p>
            Add a title and a small description that match your theme to get
            started. Then whenever you are ready, start adding your questions.
          </p>
          <input
            name="title"
            ref={titleRef}
            type="text"
            placeholder="Title"
            className="input-big"
          />
          <textarea
            name="description"
            ref={descriptionRef}
            placeholder="Description"
          ></textarea>
          <div className="create-quiz-cta">
            <Button
              onClick={() =>
                createQuiz(titleRef.current.value, descriptionRef.current.value)
              }
            >
              Add question
            </Button>
            <p className="floating">
              &lt;-- Click here to start creating your quiz
            </p>
          </div>
        </div>
      )}
    </>
  );
}
