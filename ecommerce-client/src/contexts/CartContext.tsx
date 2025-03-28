import { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from "react";
import { CartItem } from "../models/Cart";
import { CartReducer, ICartAction } from "../reducers/CartReducer";

export interface ICartContext {
  cart: CartItem[];
  dispatch: Dispatch<ICartAction>
}

const CartContext = createContext<ICartContext>({cart: [], dispatch: () => null});

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, dispatch] = useReducer(CartReducer, [], () => {
    const cachedCart = localStorage.getItem('cart');
    return cachedCart ? JSON.parse(cachedCart) : [];
  });

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext