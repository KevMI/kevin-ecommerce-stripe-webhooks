import axios from "axios"
import { Product, ProductCreate, ProductUpdate } from "../models/Product"
import { BASE_URL, handleRequest } from "./serviceBase"

export const createProduct = async (payload: ProductCreate) => {
  return await handleRequest<ProductCreate>(axios.post(`${BASE_URL}/products`, payload))
}

export const getProducts = async (): Promise<Product[]> => {
  return await handleRequest<Product[]>(axios.get(`${BASE_URL}/products`))
}

export const getProduct = async (id: string): Promise<Product> => {
  return await handleRequest<Product>(axios.get(`${BASE_URL}/products/${id}`))
}

export const deleteProduct = async (id: number) => {
  return await handleRequest(axios.delete(`${BASE_URL}/products/${id}`))
}

export const updateProduct = async (id: string, payload: ProductUpdate) => {
  return await handleRequest<ProductUpdate>(axios.patch(`${BASE_URL}/products/${id}`, payload))
}