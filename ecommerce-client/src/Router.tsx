import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { Admin } from "./pages/Admin";
import { Shop } from "./pages/Shop";
import { AdminCustomers } from "./pages/AdminCustomers";
import { AdminOrders } from "./pages/AdminOrders";
import { AdminProducts } from "./pages/AdminProducts";
import { AdminUpdateCustomer } from "./pages/AdminUpdateCustomer";
import { AdminNewCustomer } from "./pages/AdminNewCustomer";
import { AdminNewProduct } from "./pages/AdminNewProduct";
import { AdminUpdateProduct } from "./pages/AdminUpdateProduct";
import { AdminOrder } from "./pages/AdminOrder";
import { AdminOrderItem } from "./pages/AdminOrderItem";
import { Checkout } from "./pages/Checkout";
import { OrderSuccess } from "./pages/OrderSuccess";

export const router = createBrowserRouter([
  {
    path: "/order-success",
    element: <OrderSuccess/>
  },
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/admin",
        element: <Admin></Admin>
      },
      {
        path: "/admin/customers",
        element: <AdminCustomers/>
      },
      {
        path: "/admin/orders",
        element: <AdminOrders/>
      },
      {
        path: "/admin/products",
        element: <AdminProducts/>
      },
      {
        path: "/shop",
        element: <Shop></Shop>
      },
      {
        path: "/admin/update-customer/:id",
        element: <AdminUpdateCustomer />
      },
      {
        path: "/admin/new-customer",
        element: <AdminNewCustomer/>
      },
      {
        path: "/admin/new-product",
        element: <AdminNewProduct/>
      },
      {
        path: "/admin/update-product/:id",
        element: <AdminUpdateProduct/>
      },
      {
        path: "/admin/order/:id",
        element: <AdminOrder/>
      },
      {
        path: "/admin/order-item/:id",
        element: <AdminOrderItem/>
      },
      {
        path: "/checkout",
        element: <Checkout/>
      },
    ]
  }
])