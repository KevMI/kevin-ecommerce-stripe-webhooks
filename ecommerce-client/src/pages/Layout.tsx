import { NavLink, Outlet } from "react-router"
import './../styles/layout.css'

export const Layout = () => {
  return <>
  <header>
    <nav>
      <ul>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/shop"}>Shop</NavLink></li>
        <li><NavLink to={"/admin"}>Admin</NavLink></li>
      </ul>
    </nav>
  </header>

  <main>
    <Outlet/>
  </main>

  <footer></footer>
  </>
}