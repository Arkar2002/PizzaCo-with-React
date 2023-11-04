import { useSelector } from "react-redux";
import { getUser } from "./userSlice";

function Username() {
  const username = useSelector(getUser);

  return username && <div className="hidden text-sm md:block">{username}</div>;
}

export default Username;
