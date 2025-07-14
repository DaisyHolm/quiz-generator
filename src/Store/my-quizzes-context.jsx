import { createContext, useState, useEffect } from "react";

export const MyQuizzesContext = createContext({
  quizzesList: {},
  quizzes: () => {},
  createQuiz: () => {},
  addQuestion: () => {},
  isCreatingQuestion: false,
  endQuestions: () => {},
  saveChangesTitleAndDescription: () => {},
  updateAndSave: () => {},
  deleteQuiz: () => {},
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
  console.log(myQuizzes, "myQUIZZES");

  const ctxValue = {
    quizzesList: myQuizzes,
    createQuiz: handleCreateQuiz,
    addQuestion: handleAddQuestion,
    isCreatingQuestion: isCreatingQuestion,
    endQuestions: () => {
      setIsCreatingQuestion(false);
    },
    saveChangesTitleAndDescription: handleSaveChangesTitleAndDescription,
    updateAndSaveQuestion: handleUpdateAndSaveQuestion,
    deleteQuiz: handleDeteteQuiz,
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

    setIsCreatingQuestion(true);
    setCurrentQuizId(id);
  }

  function handleAddQuestion(questionAndAnswers) {
    setAddedQuestions((prev) => {
      const updatedQuestions = [...prev, questionAndAnswers];

      // updating quiz with new questions
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

      // returning updates questions
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
  return (
    <MyQuizzesContext.Provider value={ctxValue}>
      {children}
    </MyQuizzesContext.Provider>
  );
}
