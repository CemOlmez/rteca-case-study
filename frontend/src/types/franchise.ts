export type Franchise = {
  id: number;
  name: string;
  tax_number: string;
  phone: string;
  email: string;
  address: string;
  about?: string;
  is_active: boolean;
  created_at: string;
};

export type CreateFranchisePayload = {
  name: string;
  tax_number: string;
  phone: string;
  email: string;
  address: string;
  about?: string;
};
