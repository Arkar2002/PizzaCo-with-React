import useMoveBack from "../utils/useMoveBack";

function ErrorMessage({ message }) {
  const moveBack = useMoveBack();

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm">
      <span>{message}</span>
      <div>
        <button onClick={moveBack}>Go back</button>
      </div>
    </div>
  );
}

export default ErrorMessage;
