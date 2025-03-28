import { useEffect, useState } from 'react'
import './../styles/shop.css'
import { Product } from '../models/Product'
import { getProducts } from '../services/productService';
import { ICartActionType } from '../reducers/CartReducer';
import { useNavigate } from 'react-router';
import { useCart } from '../hooks/useCart';

export const Shop = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const { cart, dispatch } = useCart();
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await getProducts();
      setProducts(productData);
    }
    fetchProducts();
  }, []);


  const addToCart = (p: Product) => {
    dispatch({
      type: ICartActionType.ADDED,
      payload: JSON.stringify(p),
    })
  };

  const emptyCart = () => {
    dispatch({
      type: ICartActionType.EMPTIED,
      payload: '',
    })
  };

  const increaseCartItem = (p: Product) => {
    dispatch({
      type: ICartActionType.INCREASED,
      payload: JSON.stringify(p),
    })
  };

  const decreaseCartItem = (p: Product) => {
    dispatch({
      type: ICartActionType.DECREASED,
      payload: JSON.stringify(p),
    })
  };

  const removeCartItem = (p: Product) => {
    dispatch({
      type: ICartActionType.REMOVED,
      payload: JSON.stringify(p),
    })
  }

  return <div>
  <button className='cart-button' onClick={() => setCartOpen(!cartOpen)}>Kundvagn</button>
  {cartOpen && <div className='cart'>
    {cart.length === 0 && <h3>The cart is empty.</h3>}
    {cart.map((ci) => {
      return <div className='cart-item' key={ci.product.name}>
        <img src={ci.product.image} alt={ci.product.name} />
        <h4>{ci.product.name}</h4>
        <p>( {ci.amount} ) x</p>
        <p>{ci.product.price} kr</p>
        <button className='cart-item-increase' onClick={() => increaseCartItem(ci.product)}>+</button>
        <button className='cart-item-decrease' onClick={() => decreaseCartItem(ci.product)}>-</button>
        <button className='cart-item-delete'   onClick={() => removeCartItem(ci.product)}>x</button>
      </div>
    })}
    {cart.length > 0 && 
    <div className='cart-actions'>
      <h3>Total: {cart.reduce((total, c) => total + c.product.price * c.amount, 0)} kr</h3>
      <button className='button-checkout' onClick={() => navigate("/checkout")}>Proceed to checkout</button>
      <button className='button-reset' onClick={emptyCart}>Reset cart</button>
    </div>
    }
    </div>}
  <div className="shop-grid">
      {products.map((p) => {
        return <div key={p.id} className='card'>
          <img src={p.image} alt="" />
          <h3>{p.name}</h3>
          <p>{p.price} kr</p>
          <p>{p.description}</p>
          <button onClick={() => addToCart(p)}>Lägg i kundvagn</button>
        </div>
      })}
    </div>
 </div>

}