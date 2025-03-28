import { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";

interface IProductFormProps {
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const ProductForm = (props: IProductFormProps) => {

  const navigate = useNavigate();

  return <div className="form-container">
  <form onSubmit={props.handleSubmit}>
    <div className="form-row-two">
      <div>
        <label htmlFor="">Name</label>
        <input type="text" name="name" onChange={props.handleChange} />
      </div>
      <div>
        <label htmlFor="">Price (SEK) </label>
        <input type="text" name="price" className="price" onChange={props.handleChange} />
      </div>
    </div>

    <div className="form-row-two">
      <div>
        <label htmlFor="">Description</label>
        <textarea name="description" onChange={props.handleChange}></textarea>
      </div>
    </div>

    <div className="form-row-two">
      <div>
        <label htmlFor="">Stock</label>
        <input type="text" name="stock" onChange={props.handleChange} />
      </div>
      <div>
        <label htmlFor="">Category</label>
        <input type="text" name="category" onChange={props.handleChange} />
      </div>
    </div>

    <div className="form-row-two">
      <div>
        <label htmlFor="">Image URL</label>
        <input type="text" name="image" className="image-url" onChange={props.handleChange} />
      </div>
    </div>

    <button>Submit</button>
    <button type="button" onClick={() => navigate("/admin/products")}>Go back</button>
  </form>
</div>
}