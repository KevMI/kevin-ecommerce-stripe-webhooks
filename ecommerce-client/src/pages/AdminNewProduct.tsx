import { ChangeEvent, FormEvent, useState } from "react"
import { ProductCreate } from "../models/Product"
import { createProduct } from "../services/productService";
import { ProductForm } from "../components/ProductForm";
import { useNavigate } from "react-router";

export const AdminNewProduct = () => {

  const [product, setProduct] = useState<ProductCreate>(new ProductCreate("", 0, "", 0, "", ""));
  const navigate = useNavigate();
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({...product, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createProduct(product);
    navigate("/admin/products")
  }

  return <>
  <ProductForm handleChange={handleChange} handleSubmit={handleSubmit}></ProductForm>
  </>
}