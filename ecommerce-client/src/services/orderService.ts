import axios from "axios";
import { Order, OrderCheckoutResponse, OrderCreate, OrderInfo, OrderItemUpdate, OrderUpdate } from "../models/Order";
import { BASE_URL, handleRequest } from "./serviceBase";

export const getOrders = async (): Promise<Order[]> => {
  return await handleRequest<Order[]>(axios.get(`${BASE_URL}/orders`))
}

export const getOrder = async (id: string): Promise<OrderInfo> => {
  return await handleRequest<OrderInfo>(axios.get(`${BASE_URL}/orders/${id}`))
}

export const updateOrderItem = async (id: string, payload: OrderItemUpdate) => {
  return await handleRequest(axios.patch(`${BASE_URL}/order-items/${id}`, payload))
}

export const createOrder = async (payload: OrderCreate): Promise<OrderCheckoutResponse> => {
  return await handleRequest<OrderCheckoutResponse>(axios.post(`${BASE_URL}/orders`, payload))
}

export const updateOrder = async (id: number, payload: OrderUpdate) => {
  return await handleRequest(axios.patch(`${BASE_URL}/orders/${id}`, payload))
}

export const getOrderBySessionId = async (id: string): Promise<OrderInfo> => {
  return await handleRequest(axios.get(`${BASE_URL}/orders/payment/${id}`))
}