export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

export type ProductUpdate = Pick<Product, 'name' | 'price' | 'description' | 'stock' | 'category' | 'image' >

export class ProductCreate {
  constructor(
    public name: string,
    public price: number,
    public description: string,
    public stock: number,
    public category: string,
    public image: string,
  ) {}
}