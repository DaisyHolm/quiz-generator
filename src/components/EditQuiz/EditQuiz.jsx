import "./EditQuiz.css";

import { useParams } from "react-router-dom";
import { useContext, useState, useRef } from "react";
import { MyQuizzesContext } from "../../Store/my-quizzes-context";
import Button from "../Button/Button";
import EditQuestion from "../EditQuestion/EditQuestion.jsx";

export default function EditQuiz() {
  const {
    quizzesList,
    saveChangesTitleAndDescription,
    deleteQuiz,
    createAdditionalQuestion,
    deleteQuestion,
  } = useContext(MyQuizzesContext);
  const [isEditing, setIsEditing] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();
  const titleRef = useRef();
  const descriptionRef = useRef();

  const params = useParams();
  const currentId = params.quizId;
  const currentQuiz = quizzesList[currentId];

  if (!currentQuiz) {
    return (
      <div className="quiz-error">
        <p>Quiz couldn't be found!</p>
      </div>
    );
  }

  const { title, description, questions } = currentQuiz;
  const questionsList = questions.map((question, index) => {
    return (
      <div className="edit-questions-list" key={index}>
        <p>{question.question}</p>
        <div className="edit-question-btns">
          <Button className="btn-small" onClick={() => handleEdit(index)}>
            Edit
          </Button>
          <Button
            className="btn-small"
            onClick={() => deleteQuestion(currentId, index)}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  });

  function handleEdit(index) {
    setIsEditing(true);
    setIndexToEdit(index);
  }

  return (
    <div className="edit-quiz-container">
      {isEditing ? (
        <EditQuestion
          question={questions[indexToEdit]}
          id={currentId}
          setIsEditing={setIsEditing}
          index={indexToEdit}
        />
      ) : (
        <>
          <div className="edit-quiz-add-btn">
            <Button
              onClick={() => createAdditionalQuestion(currentId)}
              path="/create-quiz"
            >
              Add Question +
            </Button>
          </div>
          <div className="edit-title-and-description">
            <input type="text" defaultValue={title} ref={titleRef} />
            <textarea
              type="text"
              defaultValue={description}
              ref={descriptionRef}
            />
          </div>
          <div className="edit-questions">{questionsList}</div>
          <div className="edit-quiz-buttons">
            <Button
              onClick={() =>
                saveChangesTitleAndDescription(
                  currentId,
                  titleRef.current.value,
                  descriptionRef.current.value
                )
              }
              path="/my-quizzes"
            >
              Save Changes
            </Button>
            <Button onClick={() => deleteQuiz(currentId)} path="/my-quizzes">
              Delete Quiz
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
