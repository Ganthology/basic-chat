import type { Address } from "./Address";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
  phone: string;
  website: string;
  address: Address;
};
