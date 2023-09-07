import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import {
  decreaseItem,
  getCurrentQuantityById,
  increaseItem,
} from "../features/cart/cartSlice";

function UpdateItemQuantity({ id }) {
  const getCurrentQuantity = useSelector(getCurrentQuantityById(id));
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-4">
      <Button onClick={() => dispatch(decreaseItem(id))} type="round">
        -
      </Button>
      <span className="text-sm font-medium">{getCurrentQuantity}</span>
      <Button onClick={() => dispatch(increaseItem(id))} type="round">
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
