import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContextProvider } from "../context/ContextProvider";
import { updateName } from "../feature/user/userSlice";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { username: usernameFromStore, urlStatus } = useSelector(
    (state) => state.user,
  );
  const { username: usernameFromLocalStorage } = useContextProvider();
  const navigate = useNavigate();

  useEffect(() => {
    if (usernameFromLocalStorage) {
      dispatch(updateName(usernameFromLocalStorage));
    } else if (!usernameFromStore) {
      if (urlStatus) toast.error("Please Login first");
      navigate("/home");
    }
  }, [
    usernameFromStore,
    navigate,
    urlStatus,
    usernameFromLocalStorage,
    dispatch,
  ]);

  return children;
}

export default ProtectedRoute;
