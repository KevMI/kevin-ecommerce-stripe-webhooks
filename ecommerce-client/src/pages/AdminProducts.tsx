import { useNavigate } from "react-router"
import { AdminNav } from "../components/AdminNav"
import { useEffect, useState } from "react";
import { Product } from "../models/Product";
import { deleteProduct, getProducts } from "../services/productService";

export const AdminProducts = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    }
    fetchProducts();
  }, [])

  const handleClick = () => {
    navigate("/admin/new-product")
  };

  const handleEdit = (id: number) => {
    navigate(`/admin/update-product/${id}`)
  }

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    setProducts(products.filter((p) => p.id !== id));
  }

  return <>
  <AdminNav></AdminNav>
  <button onClick={handleClick}>Add new product</button>
  <div className="product-grid top-row">
    <div>ID</div>
    <div>Name</div>
    <div>Description</div>
    <div>Price (SEK)</div>
    <div>Stock</div>
    <div>Category</div>
    <div>Image URL</div>
    <div>Handle</div>
  </div>

  <div className="grid-rows">
    {products.map((p) => {
      return <div className="product-grid other-rows" key={p.id}>
        <div>{p.id}</div>
        <div>{p.name}</div>
        <div>{p.description}</div>
        <div>{p.price}</div>
        <div>{p.stock}</div>
        <div>{p.category}</div>
        <div><a>{p.image}</a></div>
        <div>
          <button onClick={() => handleEdit(p.id)}>Edit</button>
          <button onClick={() => handleDelete(p.id)}>Delete</button>
        </div>
      </div>
    })}
  </div>
  </>
}