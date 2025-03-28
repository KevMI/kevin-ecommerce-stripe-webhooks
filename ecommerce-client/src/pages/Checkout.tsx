import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import { Product } from "../models/Product";
import { ICartActionType } from "../reducers/CartReducer";
import './../styles/checkout.css'
import { Customer, CustomerCheckoutCreate } from "../models/Customer";
import { createCustomerCheckout, getCustomerByEmail } from "../services/customerService";
import { BASE_URL } from "../services/serviceBase";
import axios from "axios";
import { OrderCheckoutResponse, OrderUpdate } from "../models/Order";
import { updateOrder } from "../services/orderService";

export const Checkout = () => {
  const { cart, dispatch } = useCart();
  const localStorageCustomer = localStorage.getItem('customer');
  const [customer, setCustomer] = useState<CustomerCheckoutCreate>(
    localStorageCustomer ? JSON.parse(localStorageCustomer) :
    new CustomerCheckoutCreate("", "", "",
    "", "", "", "", "Sweden",
    ))

  useEffect(() => {
    localStorage.setItem('customer', JSON.stringify(customer))
  }, [customer]);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCustomer({...customer, [e.target.name]: e.target.value});
  };

  const handleCustomer = async () => {
    const customerExists: Customer | null = await getCustomerByEmail(customer.email);
    let customerId;

    if (customerExists === null) {
      const response = await createCustomerCheckout(customer);
      customerId = response.id;
      return customerId;
    };
    
    if (customerExists) {
      customerId = customerExists.id;
      return customerId;
    };
  };

  const handleOrder = async (customerId?: number) => {
    
    const response = await axios.post(`${BASE_URL}/orders`, {
      customer_id: customerId,
      payment_status: "unpaid",
      payment_id: null,
      order_status: "pending",
      order_items: cart.map(ci => ({
        product_id: ci.product.id,
        product_name: ci.product.name,
        quantity: ci.amount,
        unit_price: ci.product.price
      }))
    });

    const data: OrderCheckoutResponse = await response.data;
    const orderId: number = data.id;
    return orderId;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const lineItems = cart.map(ci => ({
      price_data: {
        currency: 'sek',
        product_data: {
          name: ci.product.name,
          images: [ci.product.image]
        },
        unit_amount: ci.product.price * 100,
      },
      quantity: ci.amount
    }));

    try {
      const customerId = await handleCustomer();
      const orderId = await handleOrder(customerId);

      const response = await axios.post(`${BASE_URL}/create-checkout-session`, {
        lineItems: lineItems,
        clientReferenceId: orderId,
      });

      const session_id: string = response.data.id;
      console.log(response.data);

      const payload: OrderUpdate = {
        payment_status: "unpaid",
        payment_id: session_id,
        order_status: "pending",
      };

      await updateOrder(orderId, payload);
      window.location.href = response.data.url;
    } catch (error) {
      console.log(error);
    };
  };


  return <>
  <h1>Checkout</h1>
  <div className="checkout-container">
    <div className="checkout-form-container">
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="">Email</label>
          <input value={customer.email} type="text" name="email" onChange={(e) => handleChange(e)} />
        </div>

        <div>
          <label htmlFor="">Phone</label>
          <input value={customer.phone} type="text" name="phone" onChange={(e) => handleChange(e)} />
        </div>

        <div>
          <label htmlFor="">Name</label>
          <input value={customer.firstname} type="text" name="firstname" onChange={(e) => handleChange(e)} />
        </div>

        <div>
          <label htmlFor="">Surname</label>
          <input value={customer.lastname} type="text" name="lastname" onChange={(e) => handleChange(e)} />
        </div>

        <div>
          <label htmlFor="">Address</label>
          <input value={customer.street_address} type="text" name="street_address" onChange={(e) => handleChange(e)} />
        </div>

        <div>
          <label htmlFor="">Postal Code</label>
          <input value={customer.postal_code} type="text" name="postal_code" onChange={(e) => handleChange(e)} />
        </div>

        <div>
          <label htmlFor="">City</label>
          <input value={customer.city} type="text" name="city" onChange={(e) => handleChange(e)} />
        </div>

        <div>
          <label htmlFor="">Country</label>
          <select name="country" onChange={(e) => handleChange(e)} >
            <option value="Sweden">Sweden</option>
            <option value="Norway">Norway</option>
            <option value="Denmark">Denmark</option>
            <option value="Finland">Finland</option>
          </select>
        </div>

        <div className="button-container">
          <button>Till betalning</button>
        </div>

      </form>
    </div>

    <div className="checkout-products-container">
      <h3>Overview ({cart.reduce((total, p) => total + p.amount, 0)} items)</h3>
      <div className="checkout-products">
        {cart.map((ci) => {
          return <div key={ci.product.name} className="checkout-products-rows">
            <img src={ci.product.image} alt={ci.product.name} />
            <div>
              <h4>{ci.product.name}</h4>
              <div className="checkout-products-amount">
                <button onClick={() => decreaseCartItem(ci.product)}>-</button>
                <h5>{ci.amount}</h5>
                <button onClick={() => increaseCartItem(ci.product)}>+</button>
                <h3 className="checkout-products-rows-price">{ci.product.price * ci.amount} kr</h3>
              </div>
            </div>
          </div>
        })}
        <h2 className="checkout-total-price">Total SEK: {cart.reduce((total, c) => total + c.product.price * c.amount, 0)} :-</h2>
      </div>
    </div>
  </div>
  </>
}