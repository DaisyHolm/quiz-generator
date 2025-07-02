import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import RandomQuiz from "./components/RandomQuiz.jsx";
import CreateQuiz from "./components/CreateQuiz/CreateQuiz.jsx";
import { MyQuizzesContextProvider } from "./Store/my-quizzes-context.jsx";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/random-quiz", element: <RandomQuiz /> },
  { path: "/create-quiz", element: <CreateQuiz /> },
  // {path: '/my-quizes', element: <MyQuizes />},
]);
function App() {
  return (
    <MyQuizzesContextProvider>
      <RouterProvider router={router} />;
    </MyQuizzesContextProvider>
  );
}

export default App;
