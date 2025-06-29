import "./Button.css";
import { Link } from "react-router-dom";

export default function Button({ children, className, path }) {
  return (
    <Link to={path} className={`btn ${className}`}>
      {children}
    </Link>
  );
}
