import "./Button.css";
import { Link } from "react-router-dom";

export default function Button({ children, className, path, onClick }) {
  return (
    <Link to={path} onClick={onClick} className={`btn ${className}`}>
      {children}
    </Link>
  );
}
