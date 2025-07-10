import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import RandomQuiz from "./components/RandomQuiz.jsx";
import CreateQuiz from "./components/CreateQuiz/CreateQuiz.jsx";
import MyStoredQuizzes from "./components/MyStoredQuizzes/MyStoredQuizzes.jsx";
import { MyQuizzesContextProvider } from "./Store/my-quizzes-context.jsx";
import EditQuiz from "./components/EditQuiz/EditQuiz.jsx";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/random-quiz", element: <RandomQuiz /> },
  { path: "/create-quiz", element: <CreateQuiz /> },
  { path: "/my-stored-quizzes", element: <MyStoredQuizzes /> },
  { path: "/edit-quiz", element: <EditQuiz /> },
]);
function App() {
  return (
    <MyQuizzesContextProvider>
      <RouterProvider router={router} />
    </MyQuizzesContextProvider>
  );
}

export default App;
