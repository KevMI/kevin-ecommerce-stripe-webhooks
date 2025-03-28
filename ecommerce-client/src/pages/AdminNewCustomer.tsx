import { ChangeEvent, FormEvent, useState } from "react"
import { CustomerCreate } from "../models/Customer";
import { createCustomer } from "../services/customerService";
import { useNavigate } from "react-router";

export const AdminNewCustomer = () => {

  const [customer, setCustomer] = useState<CustomerCreate>(new CustomerCreate("", "", "", "",
  "", "", "", "", ""));
  const navigate = useNavigate();
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createCustomer(customer);
    navigate("/admin/customers")
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomer({...customer, [e.target.name]: e.target.value})
  }

  return <div className="form-container">
  <form onSubmit={handleSubmit}>
    <div className="form-row-two">
      <div>
        <label htmlFor="">Name</label>
        <input type="text" name="firstname" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="">Surname</label>
        <input type="text" name="lastname" onChange={handleChange} />
      </div>
    </div>

    <div className="form-row-two">
      <div>
        <label htmlFor="">Password</label>
        <input type="text" name="password" onChange={handleChange} />
      </div>
    </div>

    <div className="form-row-two">
      <div>
        <label htmlFor="">Email</label>
        <input type="text" name="email" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="">Phone</label>
        <input type="text" name="phone" onChange={handleChange} />
      </div>
    </div>

    <div className="form-row-two">
      <div>
        <label htmlFor="">Address</label>
        <input type="text" name="street_address" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="">Postal</label>
        <input type="text" name="postal_code" onChange={handleChange} />
      </div>
    </div>

    <div className="form-row-two">
      <div>
        <label htmlFor="">City</label>
        <input type="text" name="city" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="">Country</label>
        <input type="text" name="country" onChange={handleChange} />
      </div>
    </div>

    <button>Create customer</button>
  </form>
</div>
}