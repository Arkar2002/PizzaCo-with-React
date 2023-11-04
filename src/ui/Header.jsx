import { Link } from "react-router-dom";
import SearchOrder from "./SearchOrder";
import Username from "../feature/user/Username";

function Header() {
  return (
    <header className="flex justify-between border-b border-stone-500 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Fast Pizza Co.ltd
      </Link>

      <SearchOrder />

      <Username />
    </header>
  );
}

export default Header;
