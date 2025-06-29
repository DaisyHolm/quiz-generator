import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import RandomQuiz from "./components/RandomQuiz.jsx";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/random-quiz", element: <RandomQuiz /> },
  // { path: '/create-quiz', element: <CreateQuiz />},
  // {path: '/my-quizes', element: <MyQuizes />},
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
