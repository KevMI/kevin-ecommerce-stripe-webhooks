import { useEffect, useState } from "react"
import { AdminNav } from "../components/AdminNav"
import { Order } from "../models/Order"
import { getOrders } from "../services/orderService";
import { Link } from "react-router";

export const AdminOrders = () => {

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orderData = await getOrders();
      setOrders(orderData);
    }
    fetchOrders();
  }, [])

  return <>
  <AdminNav></AdminNav>
  <div className="order-grid top-row">
    <div>Order ID</div>
    <div>Customer</div>
    <div>Email</div>
    <div>Phone</div>
    <div>Price (SEK)</div>
    <div>Payment Status</div>
    <div>Date</div>
    <div>Order Status</div>
    <div>Handle</div>
  </div>

  <div className="grid-rows">
    {orders.map((o) => {
      return <div key={o.id} className="order-grid other-rows">
        <div className="order-id"><Link to={`/admin/order/${o.id}`}># {o.id}</Link></div>
        <div>{o.customer_firstname} {o.customer_lastname}</div>
        <div>{o.customer_email}</div>
        <div>{o.customer_phone}</div>
        <div>{o.total_price} kr</div>
        <div>{o.payment_status}</div>
        <div>{new Date(o.created_at).toLocaleDateString()}</div>
        <div>{o.order_status}</div>
        <div>
          <button>Delete</button>
        </div>
      </div>
    })}
  </div>
  </>
}