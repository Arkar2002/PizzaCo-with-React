import ErrorMessage from "../../ui/ErrorMessage";
import Spinner from "../../ui/Spinner";
import MenuItem from "./MenuItem";
import useMenus from "./useMenus";

function Menu() {
  const { data: { status, data: menus, message } = {}, menuLoading } =
    useMenus();

  if (menuLoading) return <Spinner />;

  if (status === "fail") return <ErrorMessage message={message} />;

  return (
    <ul className="divide-y divide-stone-200">
      {menus.map((menu) => (
        <MenuItem key={menu.id} menu={menu} />
      ))}
    </ul>
  );
}

export default Menu;
