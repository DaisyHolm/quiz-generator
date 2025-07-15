import { createContext, useState, useEffect } from "react";

export const MyQuizzesContext = createContext({
  quizzesList: {},
  quizzes: () => {},
  createQuiz: () => {},
  addQuestion: () => {},
  isCreatingQuestion: false,
  setIsCreatingQuestion: () => {},
  endQuestions: () => {},
  saveChangesTitleAndDescription: () => {},
  updateAndSave: () => {},
  deleteQuiz: () => {},
  preExistingQuiz: false,
  addingQuestionToPreExistingQuiz: () => {},
  currentQuizId: "",
  addAdditionalQuestion: () => {},
  createAdditionalQuestion: () => {},
  deleteQuestion: () => {},
});

export function MyQuizzesContextProvider({ children }) {
  const [myQuizzes, setMyQuizzes] = useState(() => {
    const storedQuizzes = localStorage.getItem("myStoredQuizzes");
    if (!storedQuizzes) return {};

    const parsed = JSON.parse(storedQuizzes);
    // If parsed is null, fallback to {}
    return parsed === null ? {} : parsed;
  });
  const [addedQuestions, setAddedQuestions] = useState([]);
  const [currentQuizId, setCurrentQuizId] = useState("");
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);
  const [addingQuestionToPreExistingQuiz, setAddingQuestionToPreExistingQuiz] =
    useState(false);

  const ctxValue = {
    quizzesList: myQuizzes,
    currentQuizId: currentQuizId,
    createQuiz: handleCreateQuiz,
    addQuestion: handleAddQuestion,
    isCreatingQuestion: isCreatingQuestion,
    setIsCreatingQuestion,
    endQuestions: () => {
      setIsCreatingQuestion(false);
    },
    saveChangesTitleAndDescription: handleSaveChangesTitleAndDescription,
    updateAndSaveQuestion: handleUpdateAndSaveQuestion,
    deleteQuiz: handleDeteteQuiz,
    preExistingQuiz: addingQuestionToPreExistingQuiz,
    addingQuestionToPreExistingQuiz: setAddingQuestionToPreExistingQuiz,
    addAdditionalQuestion: handleAddAdditionalQuestion,
    createAdditionalQuestion: handleCreateAdditionalQuestion,
    deleteQuestion: handleDeleteQuestion,
  };

  useEffect(() => {
    localStorage.setItem("myStoredQuizzes", JSON.stringify(myQuizzes));
  }, [myQuizzes]);

  function handleCreateQuiz(title, description) {
    const id = crypto.randomUUID();

    if (title.trim() === "" || description.trim() === "") {
      alert("You must provide a title and a description before proceeding.");
      return;
    }

    setMyQuizzes((prev) => {
      const updatedQuizzes = { ...prev };

      updatedQuizzes[id] = {
        title: title,
        description: description,
        id,
        questions: [],
      };
      return updatedQuizzes;
    });
    console.log("SET NEW QUIZ ID", id);
    setIsCreatingQuestion(true);
    setCurrentQuizId(id);
    setAddedQuestions([]);
  }

  function handleAddQuestion(questionAndAnswers) {
    setAddedQuestions((prev) => {
      const updatedQuestions = [...prev, questionAndAnswers];

      setMyQuizzes((prev) => {
        const currentQuiz = prev[currentQuizId];
        const updatedQuiz = {
          ...currentQuiz,
          questions: updatedQuestions,
        };
        const updatedMyQuizzes = { ...prev };

        updatedMyQuizzes[currentQuizId] = updatedQuiz;
        return updatedMyQuizzes;
      });

      return updatedQuestions;
    });
  }
  function handleSaveChangesTitleAndDescription(id, title, description) {
    setMyQuizzes((prev) => {
      const changedQuiz = {
        ...prev[id],
        title: title,
        description: description,
      };

      return {
        ...prev,
        [id]: changedQuiz,
      };
    });
  }
  function handleUpdateAndSaveQuestion(quizId, updatedQuestion, questionIndex) {
    setMyQuizzes((prev) => {
      const currentQuiz = prev[quizId];
      const updatedQuestions = [...currentQuiz.questions];
      updatedQuestions[questionIndex] = updatedQuestion;

      const updatedQuiz = {
        ...currentQuiz,
        questions: updatedQuestions,
      };
      return {
        ...prev,
        [quizId]: updatedQuiz,
      };
    });
  }
  function handleDeteteQuiz(id) {
    setMyQuizzes((previous) => {
      const { [id]: _, ...updated } = previous;
      return updated;
    });
  }
  function handleDeleteQuestion(id, indexToDelete) {
    setMyQuizzes((prev) => {
      const quiz = prev[id];

      if (!quiz) {
        return prev;
      }
      const updatedQuestions = quiz.questions.filter(
        (question, index) => index !== indexToDelete
      );
      const updatedQuiz = {
        ...quiz,
        questions: updatedQuestions,
      };
      const updatedQuizzes = {
        ...prev,
        [id]: updatedQuiz,
      };
      return updatedQuizzes;
    });
  }
  function handleCreateAdditionalQuestion(quizId) {
    setAddingQuestionToPreExistingQuiz(true);
    setCurrentQuizId(quizId);
  }
  function handleAddAdditionalQuestion(questionAndAnswers) {
    console.log(questionAndAnswers, "QUESTIONANDANSWERS");

    setMyQuizzes((prev) => {
      const currentQuiz = prev[currentQuizId]; // Access the current quiz using currentQuizId
      const updatedQuestions = [...currentQuiz.questions, questionAndAnswers]; // Append the new question

      const updatedQuiz = {
        ...currentQuiz,
        questions: updatedQuestions, // Update the questions array
      };

      return {
        ...prev,
        [currentQuizId]: updatedQuiz, // Update the specific quiz in myQuizzes
      };
    });
  }
  console.log(myQuizzes, "FULL QUIZZES");
  return (
    <MyQuizzesContext.Provider value={ctxValue}>
      {children}
    </MyQuizzesContext.Provider>
  );
}
