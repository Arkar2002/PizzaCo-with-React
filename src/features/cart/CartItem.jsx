import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import UpdateItemQuantity from "../../ui/UpdateItemQuantity";
import { formatCurrency } from "../../utils/helpers";
import { deleteItem } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <div className="flex items-center gap-4">
          <UpdateItemQuantity id={pizzaId} />
          <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
            Delete
          </Button>
        </div>
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default CartItem;
