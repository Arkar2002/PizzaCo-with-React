import { useMutation } from "@tanstack/react-query";
import { createOrder as apiCreateOrder } from "../../services/apiResturant";
import toast from "react-hot-toast";

function useCreateOrder() {
  const {
    mutate: createOrder,
    isLoading,
    error,
  } = useMutation({
    mutationFn: apiCreateOrder,
    mutationKey: ["createOrder"],
    onSuccess: () => toast.success("Order Successfully"),
    onError: (err) => toast.error(err.message),
  });

  return { createOrder, isLoading, error };
}

export default useCreateOrder;
