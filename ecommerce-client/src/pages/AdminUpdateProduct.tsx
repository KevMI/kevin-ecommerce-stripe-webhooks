import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { ProductUpdate } from "../models/Product"
import { getProduct, updateProduct } from "../services/productService"

export const AdminUpdateProduct = () => {

  const [product, setProduct] = useState<ProductUpdate | null>(null)
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) return;
      const productData: ProductUpdate = await getProduct(params.id);
      setProduct(productData);
    }

    fetchProduct();
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!params.id || !product) return;
    setProduct({...product, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!params.id || !product) return;
    await updateProduct(params.id, product);
    navigate("/admin/products")
  }

  return <div className="form-container">
  <form onSubmit={handleSubmit}>
    <div className="form-row-two">
      <div>
        <label htmlFor="">Name</label>
        <input type="text" name="name" onChange={handleChange} value={product?.name}/>
      </div>
      <div>
        <label htmlFor="">Price (SEK) </label>
        <input type="text" name="price" className="price" onChange={handleChange} value={product?.price} />
      </div>
    </div>

    <div className="form-row-two">
      <div>
        <label htmlFor="">Description</label>
        <textarea name="description" onChange={handleChange} value={product?.description}></textarea>
      </div>
    </div>

    <div className="form-row-two">
      <div>
        <label htmlFor="">Stock</label>
        <input type="text" name="stock" onChange={handleChange} value={product?.stock} />
      </div>
      <div>
        <label htmlFor="">Category</label>
        <input type="text" name="category" onChange={handleChange} value={product?.category} />
      </div>
    </div>

    <div className="form-row-two">
      <div>
        <label htmlFor="">Image URL</label>
        <input type="text" name="image" className="image-url" onChange={handleChange} value={product?.image} />
      </div>
    </div>

    <button>Submit</button>
    <button type="button" onClick={() => navigate("/admin/products")}>Go back</button>
  </form>
</div>
}