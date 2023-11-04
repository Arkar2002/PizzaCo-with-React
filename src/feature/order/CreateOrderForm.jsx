import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress, updatePhoneNumber } from "../user/userSlice";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import { clearItem, getCart, getCartTotalPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helper";
import { useEffect, useState } from "react";
import useCreateOrder from "./useCreateOrder";
import { useNavigate } from "react-router-dom";

const PHONENUMBER_PATTERN =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

function CreateOrderForm() {
  const [withPriority, setWithPriority] = useState(false);
  const navigate = useNavigate();
  const { createOrder, isLoading } = useCreateOrder();
  const { username, address, status, position, phone } = useSelector(
    (state) => state.user,
  );
  const totalPrice = useSelector(getCartTotalPrice);
  const carts = useSelector(getCart);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState, setValue } = useForm({
    defaultValues: {
      customer: username,
      phone,
    },
  });
  const { errors } = formState;
  const totalPriceWithPriority = withPriority
    ? totalPrice * 0.2 + totalPrice
    : totalPrice;

  function onSubmit(data) {
    const newOrder = {
      ...data,
      priority: withPriority,
      cart: carts,
    };
    dispatch(updatePhoneNumber(data.phone));
    createOrder(newOrder, {
      onSuccess: (data) => {
        dispatch(clearItem());
        navigate(`/order/${data.id}`);
      },
    });
    reset();
  }

  useEffect(() => {
    if (address) setValue("address", address);
  }, [address, setValue]);

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            {...register("customer", {
              required: "This name field is required",
            })}
          />
          {errors?.username && (
            <p className="mt-2 text-sm text-rose-500">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              className="input w-full"
              type="tel"
              name="phone"
              {...register("phone", {
                required: "This phone number field is required",
                pattern: {
                  value: PHONENUMBER_PATTERN,
                  message: "Please provide a valid phone number",
                },
              })}
            />
            {errors?.phone && (
              <p className="mt-2 text-sm text-rose-500">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              {...register("address", {
                required: "This address field is required",
              })}
            />
            {!position.lat && !position.lng && (
              <span className="absolute right-[3px] top-[3px] z-50 sm:right-[5px] sm:top-[5px]">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                    toast.success("Get Location success");
                  }}
                  type="small"
                >
                  {status === "loading" ? "Getting Location" : "Get Location"}
                </Button>
              </span>
            )}
            {errors?.address && (
              <p className="mt-2 text-sm text-rose-500">
                {errors.address.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            id="priority"
            name="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to give your order priority?
          </label>
        </div>

        <div>
          <Button type="primary" disabled={isLoading}>
            {isLoading
              ? "Ordering"
              : `Order Pizzas ${formatCurrency(totalPriceWithPriority)}`}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateOrderForm;
