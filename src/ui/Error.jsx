import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const error = useRouteError();

  return (
    <div>
      <div>
        <h1>Something went wrong 😢</h1>
        <p>{error.data || error.message}</p>
        <LinkButton to="-1">&larr; Go Back</LinkButton>
      </div>
    </div>
  );
}

export default Error;
