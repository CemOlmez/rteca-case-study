export type Office = {
  id: number;
  franchise_id: number;
  name: string;
  city: string;
  phone: string;
  email: string;
  consultants_count: number;
  is_active: boolean;
};

export type CreateOfficePayload = {
  franchise_id: number;
  name: string;
  city: string;
  phone: string;
  email: string;
  consultants_count: number;
  is_active: boolean;
};
