import Cart from "../feature/cart/Cart";
import useCheckUrl from "../hooks/useCheckUrl";

function CartPage() {
  useCheckUrl();

  return <Cart />;
}

export default CartPage;
