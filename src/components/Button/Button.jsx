import "./Button.css";
import { Link } from "react-router-dom";

export default function Button({ children, className, path, onClick }) {
  return path ? (
    <Link to={path} onClick={onClick} className={`btn ${className}`}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={`btn ${className}`}>
      {children}
    </button>
  );
}
