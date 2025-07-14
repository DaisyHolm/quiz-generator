import { useParams } from "react-router-dom";
import { useContext, useState, useRef } from "react";
import { MyQuizzesContext } from "../../Store/my-quizzes-context";
import Button from "../Button/Button";
import EditQuestion from "../EditQuestion/EditQuestion.jsx";

export default function EditQuiz() {
  const { quizzesList, saveChangesTitleAndDescription, deleteQuiz } =
    useContext(MyQuizzesContext);
  const [isEditing, setIsEditing] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState();
  const titleRef = useRef();
  const descriptionRef = useRef();

  const params = useParams();
  const currentId = params.quizId;
  const currentQuiz = quizzesList[currentId];

  if (!currentQuiz) {
    return <p>Quiz couldnt be found</p>;
  }

  const { title, description, questions } = currentQuiz;
  const questionsList = questions.map((question, index) => {
    return (
      <div key={index}>
        <span>{question.question}</span>
        <Button onClick={() => handleEdit(index)} className="small">
          Edit
        </Button>
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
          <div className="edit-title-and-description">
            <input
              type="text"
              className="edit-title"
              defaultValue={title}
              ref={titleRef}
            />
            <input
              type="text"
              className="edit-description"
              defaultValue={description}
              ref={descriptionRef}
            />
          </div>
          <div className="edit-questions">{questionsList}</div>
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
            Delete quiz
          </Button>
        </>
      )}
    </div>
  );
}
