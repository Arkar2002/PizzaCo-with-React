import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useSelector } from "react-redux";
import { getCart } from "../feature/cart/cartSlice";

const Context = createContext();

function ContextProvider({ children }) {
  const cartsFromStore = useSelector(getCart);
  const [username, setUsername] = useLocalStorage("username", "");
  const [carts, setCarts] = useLocalStorage("carts", []);

  useEffect(() => {
    setCarts(cartsFromStore);
  }, [cartsFromStore, setCarts]);

  return (
    <Context.Provider value={{ username, setUsername, carts, setCarts }}>
      {children}
    </Context.Provider>
  );
}

export function useContextProvider() {
  const context = useContext(Context);
  if (!context) throw new Error("Context was called in the wrong order");
  return context;
}

export default ContextProvider;
