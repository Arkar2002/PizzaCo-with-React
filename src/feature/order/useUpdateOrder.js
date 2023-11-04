import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder as apiUpdateOrder } from "../../services/apiResturant";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function useUpdateOrder() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const {
    mutate: updateOrder,
    isLoading: isUpdating,
    error,
  } = useMutation({
    mutationFn: (updateObj) => apiUpdateOrder(id, updateObj),
    mutationKey: ["updateOrder", id],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order", id],
      });
      toast.success("Updated Order Successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateOrder, isUpdating, error };
}

export default useUpdateOrder;
