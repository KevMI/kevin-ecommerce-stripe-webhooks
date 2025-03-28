import { useNavigate, useParams } from "react-router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CustomerUpdate } from "../models/Customer";
import { getCustomer, updateCustomer } from "../services/customerService";

export const AdminUpdateCustomer = () => {

  const [customer, setCustomer] = useState<CustomerUpdate | null>(null);
  const navigate = useNavigate();
  
  const params = useParams();

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!params.id) return;
      try {
        const customerData = await getCustomer(params.id);
        setCustomer(customerData);
      } catch (error) {
        throw error;
      }
    };

    fetchCustomer();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (customer) {
      setCustomer({ ...customer, [e.target.name]: e.target.value})
    };
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!params.id || !customer) return;
    await updateCustomer(params.id, customer);
    navigate("/admin/customers")
  };
  
  return <div className="form-container">
    <form onSubmit={handleSubmit}>
      <div className="form-row-two">
        <div>
          <label htmlFor="">Name</label>
          <input type="text" name="firstname" value={customer?.firstname} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="">Surname</label>
          <input type="text" name="lastname" value={customer?.lastname} onChange={handleChange} />
        </div>
      </div>

      <div className="form-row-two">
        <div>
          <label htmlFor="">Email</label>
          <input type="text" name="email" value={customer?.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="">Phone</label>
          <input type="text" name="phone" value={customer?.phone} onChange={handleChange} />
        </div>
      </div>

      <div className="form-row-two">
        <div>
          <label htmlFor="">Address</label>
          <input type="text" name="street_address" value={customer?.street_address} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="">Postal</label>
          <input type="text" name="postal_code" value={customer?.postal_code} onChange={handleChange} />
        </div>
      </div>

      <div className="form-row-two">
        <div>
          <label htmlFor="">City</label>
          <input type="text" name="city" value={customer?.city} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="">Country</label>
          <input type="text" name="country" value={customer?.country} onChange={handleChange} />
        </div>
      </div>

      <button>Save changes</button>
      <button type="button" onClick={() => navigate("/admin/customers")}>Go back</button>
    </form>
  </div>
}