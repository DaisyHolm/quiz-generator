import Button from "../Button/Button.jsx";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="flex-container">
      <h1 className="headline floating">Quiz Time!</h1>
      <div className="start-btns">
        <Button path={"/my-quizzes"}>My Quizzes</Button>
        <Button path={"/create-quiz"}>Create your OWN quiz now!</Button>
        <Button path={"/random-quiz"}>Take a random quiz here!</Button>
      </div>
    </div>
  );
}
