import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { clearCart, getCart, getTotalCartPrice } from "./cartSlice";
import { getUsername } from "../user/useSlice";
import { formatCurrency } from "../../utils/helpers";

function Cart() {
  const username = useSelector(getUsername);
  const carts = useSelector(getCart);
  const getTotalPrice = useSelector(getTotalCartPrice);
  const dispatch = useDispatch();

  if (!carts.length) return <EmptyCart />;

  return (
    <div>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {carts.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order Pizzas {formatCurrency(getTotalPrice)}
        </Button>
        <Button onClick={() => dispatch(clearCart())} type="secondary">
          Clear Order
        </Button>
      </div>
    </div>
  );
}

export default Cart;
