import { createContext, useState } from "react";

export const MyQuizzesContext = createContext({
  quizzesList: {},
  quizzes: () => {},
  getQuiz: () => {},
  createQuiz: () => {},
  addQuestion: () => {},
  isCreatingQuestion: false,
  endQuestions: () => {},
});

export function MyQuizzesContextProvider({ children }) {
  const [myQuizzes, setMyQuizzes] = useState({});
  const [addedQuestions, setAddedQuestions] = useState([]);
  const [currentQuizId, setCurrentQuizId] = useState("");
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);

  const ctxValue = {
    quizzesList: myQuizzes,
    getQuiz: handleGetQuiz,
    createQuiz: handleCreateQuiz,
    addQuestion: handleAddQuestion,
    isCreatingQuestion: isCreatingQuestion,
    endQuestions: () => {
      setIsCreatingQuestion(false);
    },
  };

  function handleGetQuiz() {
    console.log("hi");
  }

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

  return (
    <MyQuizzesContext.Provider value={ctxValue}>
      {children}
    </MyQuizzesContext.Provider>
  );
}
