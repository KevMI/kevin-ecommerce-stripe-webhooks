import { useEffect, useState } from "react"
import { AdminNav } from "../components/AdminNav"
import { deleteCustomer, getCustomers } from "../services/customerService"
import { Customer } from "../models/Customer"
import '.././styles/admin.css'
import { useNavigate } from "react-router"

export const AdminCustomers = () => {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await getCustomers();
      setCustomers(data);
    }
    fetchCustomers();
    console.log(customers);
    
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/admin/update-customer/${id}`)
  };

  const handleClick = () => {
    navigate(`/admin/new-customer`)
  }

  const handleDelete = async (id: number) => {
    await deleteCustomer(id);
    setCustomers(customers.filter((c) => c.id !== id));
  }

  return <>
  <AdminNav></AdminNav>
  <button onClick={handleClick}>Add new customer</button>
  <div className="customer-grid top-row">
    <div>ID</div>
    <div>Name</div>
    <div>Lastname</div>
    <div>Email</div>
    <div>Phone</div>
    <div>Address</div>
    <div>Postal Code</div>
    <div>City</div>
    <div>Country</div>
    <div>Handle</div>
  </div>

  <div className="grid-rows">
    {customers.map((c) => {
      return <div key={c.id} className="customer-grid other-rows">
        <div>{c.id}</div>
        <div>{c.firstname}</div>
        <div>{c.lastname}</div>
        <div>{c.email}</div>
        <div>{c.phone}</div>
        <div>{c.street_address}</div>
        <div>{c.street_address}</div>
        <div>{c.city}</div>
        <div>{c.country}</div>
        <div>
          <button onClick={() => handleEdit(c.id)}>Edit</button>
          <button onClick={() => handleDelete(c.id)}>Delete</button>
        </div>
      </div>
    })}
  </div>
  </>
}