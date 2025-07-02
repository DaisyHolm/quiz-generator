import { createContext, useState } from "react";

export const MyQuizzesContext = createContext({
  quizzes: [],
  getQuiz: () => {},
  createQuiz: () => {},
  addQuestion: () => {},
  newQuizAdded: false,
});

export function MyQuizzesContextProvider({ children }) {
  const [myQuizzes, setMyQuizzes] = useState([]);
  const [newQuizAdded, setNewQuizAdded] = useState(false);

  const ctxValue = {
    quizzes: myQuizzes,
    getQuiz: handleGetQuiz,
    createQuiz: handleCreateQuiz,
    addQuestion: handleAddQuestion,
    newQuizAdded: newQuizAdded,
  };

  function handleGetQuiz() {
    console.log("hi");
  }

  function handleCreateQuiz(title, description) {
    const id = crypto.randomUUID();
    console.log("handleCreateQuiz", title, description);
    setMyQuizzes((prev) => [
      ...prev,
      {
        title: title,
        description: description,
        id,
      },
    ]);
    setNewQuizAdded(true);
  }

  function handleAddQuestion() {
    console.log("hi");
  }
  return (
    <MyQuizzesContext.Provider value={ctxValue}>
      {children}
    </MyQuizzesContext.Provider>
  );
}
