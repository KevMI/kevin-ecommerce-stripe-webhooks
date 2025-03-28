export type Customer = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  street_address: string;
  postal_code: string;
  city: string;
  country: string;
}

export type CustomerUpdate = Pick<Customer, 'firstname' | 'lastname' | 'phone' | 'email' |
'street_address' | 'postal_code' | 'city' | 'country'>;

export class CustomerCreate {
  constructor(
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string,
    public phone: string,
    public street_address: string,
    public postal_code: string,
    public city: string,
    public country: string,
  ) {}
}

export class CustomerCheckoutCreate {
  constructor(
    public firstname: string,
    public lastname: string,
    public email: string,
    public phone: string,
    public street_address: string,
    public postal_code: string,
    public city: string,
    public country: string,
  ) {}
}

export type CustomerCheckoutResponse = {
  id: number,
  message: string,
};