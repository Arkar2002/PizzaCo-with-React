import { formatCurrency } from "../../utils/helper";

function OrderItem({ cart, ingredients }) {
  const { quantity, name, totalPrice } = cart;

  return (
    <li className="space-y-1 py-3">
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-stone-500">
        {ingredients ? ingredients.join(",") : "Loading...."}
      </p>
    </li>
  );
}

export default OrderItem;
