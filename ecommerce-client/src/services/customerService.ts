import axios from "axios";
import { Customer, CustomerCheckoutCreate, CustomerCheckoutResponse, CustomerCreate, CustomerUpdate } from "../models/Customer";
import { BASE_URL, handleEmailRequest, handleRequest } from "./serviceBase";

export const getCustomers = async (): Promise<Customer[]> => {
  return await handleRequest<Customer[]>(axios.get(`${BASE_URL}/customers`))
}

export const getCustomer = async (id: string): Promise<Customer> => {
  return await handleRequest<Customer>(axios.get(`${BASE_URL}/customers/${id}`))
}

export const updateCustomer = async (id: string, payload: CustomerUpdate) => {
  return await handleRequest<CustomerUpdate>(axios.patch(`${BASE_URL}/customers/${id}`, payload))
}

export const createCustomer = async (payload: CustomerCreate) => {
  return await handleRequest<CustomerCreate>(axios.post(`${BASE_URL}/customers`, payload))
}

export const deleteCustomer = async (id: number) => {
  return await handleRequest(axios.delete(`${BASE_URL}/customers/${id}`))
}

export const getCustomerByEmail = async (email: string): Promise<Customer | null> => {
  return await handleEmailRequest<Customer | null>(axios.get(`${BASE_URL}/customers/email/${email}`))
}

export const createCustomerCheckout = async (payload: CustomerCheckoutCreate): Promise<CustomerCheckoutResponse> => {
  return await handleRequest<CustomerCheckoutResponse>(axios.post(`${BASE_URL}/customers`, payload))
}