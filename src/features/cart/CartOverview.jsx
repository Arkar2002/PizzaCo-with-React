import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const TotalCartQuantity = useSelector(getTotalCartQuantity);
  const getTotalPrice = useSelector(getTotalCartPrice);

  if (!TotalCartQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-5 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{TotalCartQuantity} pizza</span>
        <span>{formatCurrency(getTotalPrice)}</span>
      </p>
      <Link to="/cart" className="relative inline-flex w-fit">
        <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-x-1 -translate-y-4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-indigo-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
          {TotalCartQuantity}
        </div>
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
