import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUrlStatus } from "../feature/user/userSlice";

function useCheckUrl() {
  const username = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!username) dispatch(updateUrlStatus(true));
  }, [username, dispatch]);
}

export default useCheckUrl;
