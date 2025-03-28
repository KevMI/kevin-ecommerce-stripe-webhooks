import { NavLink } from 'react-router'
import './../styles/admin.css'

export const AdminNav = () => {
  return <div className='admin-nav-container'>
    <nav>
      <ul>
        <NavLink to={"/admin/products"}>Products</NavLink>
        <NavLink to={"/admin/orders"}>Orders</NavLink>
        <NavLink to={"/admin/customers"}>Customers</NavLink>
      </ul>
    </nav>
  </div>
}