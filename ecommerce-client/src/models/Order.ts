export type Order = {
  id: number;
  customer_firstname: string;
  customer_lastname: string;
  customer_email: string;
  customer_phone: string;
  total_price: number;
  payment_status: string;
  created_at: string;
  order_status: string;
}

export type OrderItem = {
  id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
}

export type OrderItemUpdate = Pick <OrderItem, 'quantity'>

export type OrderInfo = {
  payment_status: string;
  order_status: string;
  total_price: number;
  created_at: string;
  id: number;

  customer_firstname: string;
  customer_lastname: string;
  customer_phone: string;
  customer_email: string;
  customer_street_address: string;
  customer_postal_code: string;
  customer_city: string;
  customer_country: string;

  order_items: OrderItem[];
}

export type OrderCheckoutResponse = {
  message: string,
  id: number
}

export class OrderCreate {
  constructor(
    public customer_id: number,
    public payment_status: string,
    public payment_id: string,
    public order_status: string,
    public order_items: []
  ) {}
}

export class OrderUpdate {
  constructor(
    public payment_status: string,
    public payment_id: string,
    public order_status: string
  ) {}
}