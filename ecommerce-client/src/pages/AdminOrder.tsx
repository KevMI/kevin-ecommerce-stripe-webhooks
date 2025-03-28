import { useEffect, useState } from "react"
import { OrderInfo } from "../models/Order"
import { useNavigate, useParams } from "react-router";
import { getOrder } from "../services/orderService";

export const AdminOrder = () => {

  const [order, setOrder] = useState<OrderInfo | null>(null);

  const params = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchOrder = async () => {
      if (!params.id) return;
      const orderData = await getOrder(params.id);
      setOrder(orderData);
    }
    fetchOrder();
  }, []);

  const handleClick = (id: number) => {
    navigate(`/admin/order-item/${id}`, {state: {order}})
  }

  return <div className="order-details-wrapper">
    <h1> #{params.id} Order Details</h1>

    <div className="order-details-top-row">
      <div className="order-details-info">
        <h3>Order Info</h3>
        <ul>
          <li><b>Payment status: </b> {order?.payment_status}</li>
          <li><b>Order status: </b>{order?.order_status}</li>
          <li><b>Total amount: </b>{order?.total_price} SEK</li>
          <li><b>Order Date: </b>{order ? new Date(order.created_at).toLocaleDateString() : 'Loading...'}</li>
        </ul>
      </div>

      <div className="order-details-customer-info">
        <h3>Customer info</h3>
        <ul>
          <li><b>Name: </b>{order?.customer_firstname} {order?.customer_lastname}</li>
          <li><b>Email: </b>{order?.customer_email}</li>
          <li><b>Phone: </b>{order?.customer_phone}</li>
          <li><b>Street: </b>{order?.customer_street_address}</li>
          <li><b>Postal Code: </b>{order?.customer_postal_code}</li>
          <li><b>City: </b>{order?.customer_city}</li>
          <li><b>Country: </b>{order?.customer_country}</li>
        </ul>
      </div>
    </div>

    <div className="order-details-items-info">
      <h2>Order Items</h2>
      {order?.order_items.map((o) => {
        return <div key={o.id} className="order-items">
          <h3>Product ID: {o.product_id}</h3>
          <p>Product name: {o.product_name}</p>
          <p>Quantity: {o.quantity}</p>
          <p>Unit Price: {o.unit_price} SEK</p>
          <div>
            <button onClick={() => handleClick(o.id)}>Edit quantity</button>
            <button>Delete</button>
          </div>
        </div>
      })}
    </div>
  </div>
}