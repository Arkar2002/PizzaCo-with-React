import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helper";
import { addItem, deleteItem, getOneCartQuantity } from "../cart/cartSlice";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import { useContextProvider } from "../../context/ContextProvider";

function MenuItem({ menu }) {
  const { setCarts } = useContextProvider();
  const dispatch = useDispatch();
  const { id, name, unitPrice, imageUrl, ingredients, soldOut } = menu;
  const getCurrentQuantity = useSelector(getOneCartQuantity(id));
  const inCart = getCurrentQuantity > 0;

  function handleAdd() {
    const cartNewItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(cartNewItem));
    setCarts((carts) => [...carts, cartNewItem]);
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients?.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold Out
            </p>
          )}
          {inCart && !soldOut && (
            <div className="flex items-center gap-2">
              <UpdateItemQuantity id={id} />
              <Button type="small" onClick={() => dispatch(deleteItem(id))}>
                Delete
              </Button>
            </div>
          )}

          {!inCart && !soldOut && (
            <Button type="small" onClick={handleAdd}>
              Add To Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
