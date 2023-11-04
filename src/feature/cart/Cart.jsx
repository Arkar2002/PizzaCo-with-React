import { useDispatch, useSelector } from "react-redux";
import { clearItem, getCart, getCartTotalPrice } from "./cartSlice";
import Button from "../../ui/Button";
import EmptyCart from "./EmptyCart";
import { getUser } from "../user/userSlice";
import { formatCurrency } from "../../utils/helper";
import CartItem from "./CartItem";

function Cart() {
  const username = useSelector(getUser);
  const totalPrice = useSelector(getCartTotalPrice);
  const carts = useSelector(getCart);
  const dispatch = useDispatch();

  if (!carts.length) return <EmptyCart />;

  return (
    <div className="mt-8">
      <Button to="/menu" type="small">
        &larr; Back to menu
      </Button>
      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {carts.map((cart) => (
          <CartItem key={cart.pizzaId} cart={cart} />
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between space-x-2">
        <Button to="/order/new" type="primary">
          Starting Order Pizzas {formatCurrency(totalPrice)}
        </Button>
        <Button onClick={() => dispatch(clearItem())} type="secondary">
          Clear Cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
