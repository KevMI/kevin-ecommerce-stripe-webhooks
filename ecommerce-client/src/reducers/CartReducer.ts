import { CartItem } from "../models/Cart";
import { Product } from "../models/Product";

export interface ICartAction {
  type: ICartActionType;
  payload?: string;
}

export enum ICartActionType {
  ADDED,
  REMOVED,
  INCREASED,
  DECREASED,
  EMPTIED,
}

export const CartReducer = (cart: CartItem[], action: ICartAction): CartItem[] => {
  let p: Product;

  if (action.payload) {
    p = JSON.parse(action.payload)
  }

  switch (action.type) {
    case ICartActionType.ADDED:

      const foundInCart = cart.find((ci) => ci.product.name === p.name);

      if (!foundInCart && action.payload) {
        p = JSON.parse(action.payload)
        return [...cart, new CartItem(p, 1)];
      };
    
      return cart.map((ci) => {
        if(ci.product.name === p.name) {
          return {...ci, amount: ci.amount + 1}
        };
        return ci;
      });
    break;

    case ICartActionType.REMOVED:
      return cart.filter((ci) => ci.product.name !== p.name);
    break;

    case ICartActionType.INCREASED:
      return cart.map((ci) => {
        if (ci.product.name === p.name) {
          return {...ci, amount: ci.amount + 1}
        }
        return ci;
      })
    break;

    case ICartActionType.DECREASED:
      return cart.map((ci) => {
        if (ci.product.name === p.name && ci.amount > 1) {
          return {...ci, amount: ci.amount - 1}
        }
        return ci;
      })
      break;
      
    case ICartActionType.EMPTIED:
      return [];
      
    default:
    return cart;
      }
      }