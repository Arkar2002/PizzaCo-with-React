import Menu from "../feature/menu/Menu";
import useCheckUrl from "../hooks/useCheckUrl";

function MenuPage() {
  useCheckUrl();

  return <Menu />;
}

export default MenuPage;
