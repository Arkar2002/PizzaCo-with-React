import { useQuery } from "@tanstack/react-query";
import { getMenus } from "../../services/apiResturant";

function useMenus() {
  const {
    data,
    isLoading: menuLoading,
    error,
  } = useQuery({
    queryKey: ["menus"],
    queryFn: getMenus,
  });

  return { data, menuLoading, error };
}

export default useMenus;
