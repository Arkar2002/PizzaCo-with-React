import { useSelector } from "react-redux";
import { getUsername } from "./useSlice";

function Username() {
  const username = useSelector(getUsername);

  return <div className="hidden text-sm md:block">{username}</div>;
}

export default Username;
