import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { updateOrderItem } from "../services/orderService";
import { OrderItemUpdate } from "../models/Order";

export const AdminOrderItem = () => {

  const [orderItem, setOrderItem] = useState<OrderItemUpdate | null>(null);
  

  const params = useParams();
  const navigate = useNavigate();
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderItem({...orderItem, quantity: +e.target.value})
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!params.id || !orderItem) return;
    await updateOrderItem(params.id, orderItem);
    navigate("/admin/orders")
  }

  return <div className="form-container">
  <form onSubmit={handleSubmit}>
    <div className="form-row-two">

      <div>
        <label htmlFor="">Quantity</label>
        <input type="number" name="quantity" value={orderItem?.quantity} onChange={handleChange} />
      </div>
    </div>

    <button>Save changes</button>
    <button type="button" onClick={() => navigate(`/admin/orders`)}>Go back</button>
  </form>
</div>
}