import "./ResultModal.css";
import Button from "./Button.jsx";
import confetti from "canvas-confetti";
import { useState, useEffect } from "react";

export default function ResultModal({ results }) {
  const [isOpen, setIsOpen] = useState(false);
  const [titleMessage, setTitleMessage] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState("");

  const correctAmountOfAnswers = results.filter((result) => result === true);
  const result = correctAmountOfAnswers.length;

  useEffect(() => {
    // Show modal based on score
    if (result === 10) {
      setTitleMessage("WOW Congratulations!");
      setMessage("You completely smashed this quiz!");
      setScore("10/10");
      setIsOpen(true);
    } else if (result >= 7) {
      setTitleMessage("Good Job!");
      setMessage("You did pretty good!");
      setScore(`${result}/10`);
      setIsOpen(true);
    } else if (result > 3) {
      setTitleMessage("Um...");
      setMessage("Did you even try?");
      setScore(`${result}/10`);
    } else {
      setTitleMessage("Awkward...");
      setMessage("Maybe you should get out more?");
      setScore(`${result}/10`);
    }
  }, [result]);

  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });

      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }
  }, [isOpen]);

  return (
    <dialog className="modal-overlay">
      <div className="modal-container">
        <div className="message-container">
          <h2>{titleMessage}</h2>
          <p>{message}</p>
          <p className="result-score">{score}</p>
        </div>
        <div className="close-modal">
          <Button path={"/"}>Close</Button>
        </div>
      </div>
    </dialog>
  );
}
