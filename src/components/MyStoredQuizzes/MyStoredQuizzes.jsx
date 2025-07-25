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
            <Button path="/create-quiz">Create New Quiz</Button>
          </div>
          <div className="quiz-list">
            {Object.keys(quizzesList).length === 0 ? (
              <div className="no-quizzes-saved">
                <p className="crying-emoji">(╥‸╥)</p>
                <p>
                  You have no saved quizzes at the moment. Create one to get
                  started!
                </p>
              </div>
            ) : (
              Object.entries(quizzesList).map(([id, value]) => {
                console.log(value, "What's the value?");
                return (
                  <div className="quiz-list-item" key={id}>
                    <div className="quiz-title">
                      <h3>{value.title}</h3>
                    </div>
                    <div className="quiz-description">
                      <p>{value.description}</p>
                    </div>
                    <div className="quiz-btns">
                      <Button
                        className="btn-small"
                        path={`/edit-quiz/${id}`}
                        quiz={value}
                      >
                        Edit
                      </Button>
                      {value.questions.length === 0 ? null : (
                        <Button className="btn-small" path={`/play/${id}`}>
                          Play
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="quiz-list-main-menu">
            <Button path="/">Back To Main Menu</Button>
          </div>
        </div>
      </div>
    </>
  );
}
