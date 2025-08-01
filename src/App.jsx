import "./App.css";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import RandomQuiz from "./components/RandomQuiz.jsx";
import CreateQuiz from "./components/CreateQuiz/CreateQuiz.jsx";
import MyStoredQuizzes from "./components/MyStoredQuizzes/MyStoredQuizzes.jsx";
import EditQuiz from "./components/EditQuiz/EditQuiz.jsx";
import PlayQuiz from "./components/PlayQuiz/PlayQuiz.jsx";
import { MyQuizzesContextProvider } from "./Store/my-quizzes-context.jsx";

const routes = [
  { path: "/", element: <LandingPage /> },
  { path: "/random-quiz", element: <RandomQuiz /> },
  { path: "/create-quiz", element: <CreateQuiz /> },
  { path: "/my-quizzes", element: <MyStoredQuizzes /> },
  { path: "/play/:quizId", element: <PlayQuiz /> },
  { path: "/edit-quiz/:quizId", element: <EditQuiz /> },
];

const router = import.meta.env.PROD
  ? createHashRouter(routes)
  : createBrowserRouter(routes);

function App() {
  return (
    <MyQuizzesContextProvider>
      <RouterProvider router={router} />
    </MyQuizzesContextProvider>
  );
}

export default App;
