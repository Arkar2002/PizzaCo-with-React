import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOrder } from "../../services/apiResturant";

function useOrder() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
  });

  return { data, isLoading, error };
}

export default useOrder;
