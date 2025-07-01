import "./PosibleAnswer.css";

export default function PosibleAnswer({
  children,
  onClick,
  className,
  disabled,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className}`}
    >
      {children}
    </button>
  );
}
