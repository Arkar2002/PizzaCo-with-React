import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateName, updateUrlStatus } from "./userSlice";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../../context/ContextProvider";

function CreateUser() {
  const { setUsername } = useContextProvider();
  const usernameFromStore = useSelector(getUser);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  function onSubmit({ username }) {
    if (!username) return toast.error("Please enter username");
    dispatch(updateName(username));
    dispatch(updateUrlStatus(false));
    setUsername(username);
    reset();
    navigate("/menu");
  }

  if (usernameFromStore)
    return (
      <div>
        <Button to="/menu" type="primary">
          Continue ordering {usernameFromStore}
        </Button>
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        className="input mb-8 w-72"
        {...register("username")}
      />
    </form>
  );
}

export default CreateUser;
