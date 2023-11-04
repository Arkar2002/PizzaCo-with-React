import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {
  decreaseQuantity,
  getOneCartQuantity,
  increaseQuantity,
} from "./cartSlice";

function UpdateItemQuantity({ id }) {
  const quantity = useSelector(getOneCartQuantity(id));
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-4">
      <Button type="round" onClick={() => dispatch(decreaseQuantity(id))}>
        -
      </Button>
      <span className="text-sm font-medium">{quantity}</span>
      <Button type="round" onClick={() => dispatch(increaseQuantity(id))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
