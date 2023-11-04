import { useNavigate } from "react-router-dom";

function useNavigatePath(path) {
  const navigate = useNavigate();

  return () => navigate(path);
}

export default useNavigatePath;
