import { useEffect, useState } from "react";
import { getOrderBySessionId } from "../services/orderService";
import { OrderInfo } from "../models/Order";
import './../styles/ordersuccess.css'
import { NavLink } from "react-router";
import { useCart } from "../hooks/useCart";
import { ICartActionType } from "../reducers/CartReducer";

export const OrderSuccess = () => {

  const [order, setOrder] = useState<OrderInfo | null>(null);
  const { dispatch } = useCart();
  
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('session_id');

  useEffect(() => {
    const handleOrderInfo = async () => {
      if (!sessionId) return;
      const response = await getOrderBySessionId(sessionId);
      setOrder(response);
    };
    handleOrderInfo();
    localStorage.removeItem('cart');
    localStorage.removeItem('customer');
    dispatch({
      type: ICartActionType.EMPTIED,
      payload: "",
    });
  }, []);

  return <div className="order-success-wrapper">
    <div className="order-success-container">
    <div className="left-side">
      <h2>Thank you for your order, {order?.customer_firstname}!</h2>
      <p>A confirmation email will be sent to you at {order?.customer_email} with your complete order details. 
      (Hehe not really)
      </p>
      <div className="billing-information">
        <h2>Billing address</h2>
        <div>
          <h3>Name</h3>
          <p>{order?.customer_firstname} {order?.customer_lastname}</p>
        </div>
        <div>
          <h3>Address</h3>
          <p>{order?.customer_street_address}</p>
        </div>
        <div>
          <h3>Phone</h3>
          <p>{order?.customer_phone}</p>
        </div>
        <div>
          <h3>Email</h3>
          <p>{order?.customer_email}</p>
        </div>
        <h3 className="back-link"><NavLink to={"/shop"}>Back to shopping</NavLink></h3>
      </div>
    </div>

    <div className="right-side">
      <h2>Order Summary</h2>
      <div className="order-data">
        <div>
          <p>Date</p>
          <h4>{order ? new Date(order.created_at).toLocaleDateString() : "No date available."}</h4>
        </div>
        <div>
          <p>Order #</p>
          <h4>{order?.id}</h4>
        </div>
        <div>
          <p>Method</p>
          <h4>N/A</h4>
        </div>
      </div>
      <hr />
      <div>
        {order?.order_items.map((i) => {
          return <div key={i.id} className="order-items-container">
            <div>
              <h4>{i.product_name}</h4>
              <p>Quantity: {i.quantity}</p>
            </div>
            <div>
              <h4>{i.unit_price * i.quantity} kr</h4>
            </div>
          </div>
        })}
      </div>
      <h2 className="order-total">Order total: {order ? order.order_items.reduce((total, i) => total + i.unit_price * i.quantity, 0): "N/A"} SEK</h2>
    </div>
  </div>
  </div>
}