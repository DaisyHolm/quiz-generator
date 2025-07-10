import { useContext } from "react";
import { MyQuizzesContext } from "../../Store/my-quizzes-context.jsx";
import Button from "../Button/Button.jsx";
import "./MyStoredQuizzes.css";

export default function MyStoredQuizzes() {
  const { quizzesList } = useContext(MyQuizzesContext);
  return (
    <>
      <div className="my-quizzes-container">
        <div className="my-quizzes">
          <div className="my-quizzes-header">
            <h2>My Quizzes</h2>
            <Button path="/create-quiz">Create new Quiz</Button>
          </div>
          <div className="quiz-list">
            {Object.entries(quizzesList).map(([id, value]) => {
              return (
                <div className="quiz-list-item" key={id}>
                  <div className="quiz-title">
                    <h3>{value.title}</h3>
                  </div>
                  <div className="quiz-description">
                    <p>{value.description}</p>
                  </div>
                  <div className="quiz-btns">
                    <Button className="btn-small">Play</Button>
                    <Button className="btn-small" path={"/edit-quiz"}>
                      Edit
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="quiz-list-main-menu">
            <Button path="/">Back to main menu</Button>
          </div>
        </div>
      </div>
    </>
  );
}
