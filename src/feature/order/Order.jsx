import { format } from "date-fns";
import ErrorMessage from "../../ui/ErrorMessage";
import Spinner from "../../ui/Spinner";
import {
  calcMinleft,
  formatCurrency,
  formateDistanceFromNow,
} from "../../utils/helper";
import useOrder from "./useOrder";
import OrderItem from "./OrderItem";
import useMenus from "../menu/useMenus";
import Button from "../../ui/Button";
import useUpdateOrder from "./useUpdateOrder";

function Order() {
  const {
    data: { data: menus, status: menuStatus, message: menuErrorMessage } = {},
    error,
    menuLoading,
  } = useMenus();
  const { updateOrder, isUpdating } = useUpdateOrder();
  const {
    data: {
      status,
      message,
      data: {
        priority,
        id,
        estimatedDelivery,
        orderPrice,
        priorityPrice,
        cart,
      } = {},
    } = {},
    isLoading,
  } = useOrder();
  const deliveryIn = calcMinleft(estimatedDelivery);

  const orderEstimatedTime =
    estimatedDelivery && formateDistanceFromNow(estimatedDelivery);

  if (isLoading || menuLoading) return <Spinner />;

  if (status === "fail" || menuStatus === "fail")
    return <ErrorMessage message={message || menuErrorMessage} />;

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order # {id} Status</h2>

        <div className="">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {" "}
          {deliveryIn >= 0
            ? `Only ${new Date(
                calcMinleft(estimatedDelivery),
              ).getMinutes()} minutes left 😃 (${orderEstimatedTime})`
            : `Order should have arrived ${orderEstimatedTime}`}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery:){" "}
          {format(new Date(estimatedDelivery), "MMMM dd, yyyy - hh:mm aaa")}
        </p>
      </div>

      <ul>
        {cart.map((cart) => (
          <OrderItem
            key={cart.pizzaId}
            cart={cart}
            isLoadingIngredient={menuLoading}
            ingredients={
              menus.find((menu) => menu.id === cart.pizzaId)?.ingredients
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="font-bold">
            Price priority: {formatCurrency(priorityPrice)}{" "}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
        <div className="flex justify-end">
          {!priority && (
            <Button
              type="small"
              disabled={isUpdating}
              onClick={() => {
                updateOrder({ priority: true });
              }}
            >
              {isUpdating ? "Making Priority" : "Make Priority"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;
