const BASE_URL = "http://localhost:8000/api";

/* =========================
   Types (match backend)
========================= */

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

export type Office = {
  id: number;
  franchise_id: number;
  name: string;
  phone: string;
  email: string;
  consultants_count: number;
  is_active: boolean;
};

export type CreateOfficePayload = {
  franchise_id: number;
  name: string;
  phone: string;
  email: string;
  consultants_count: number;
  is_active: boolean;
};

/* =========================
   Helpers
========================= */

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API error");
  }
  return res.json();
}

/* =========================
   Franchise APIs
========================= */

export async function getFranchises(): Promise<Franchise[]> {
  const res = await fetch(`${BASE_URL}/franchises`, {
    cache: "no-store",
  });
  return handleResponse(res);
}

export async function createFranchise(
  payload: CreateFranchisePayload
): Promise<Franchise> {
  const res = await fetch(`${BASE_URL}/franchises`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}


export async function updateFranchise(
  id: number,
  payload: CreateFranchisePayload
): Promise<Franchise> {
  const res = await fetch(`${BASE_URL}/franchises/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}

export async function deleteFranchise(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/franchises/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to delete franchise");
  }
}

/* =========================
   Office APIs
========================= */


export async function getAllOffices(): Promise<Office[]> {
  const res = await fetch(`${BASE_URL}/branches`, {
    cache: "no-store",
  });
  return handleResponse(res);}

export async function getOfficesByFranchise(
  franchiseId: number
): Promise<Office[]> {
  const res = await fetch(
    `${BASE_URL}/franchises/${franchiseId}/branches`,
    {
      cache: "no-store",
    }
  );
  return handleResponse(res);
}

export async function createOffice(
  payload: CreateOfficePayload
): Promise<Office> {
  const res = await fetch(`${BASE_URL}/branches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function updateOffice(
  id: number,
  payload: CreateOfficePayload
): Promise<Office> {
  const res = await fetch(`${BASE_URL}/branches/${id}`, {
    method: "PUT", // or PATCH if your backend uses PATCH
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}

export async function deleteOffice(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/branches/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to delete office");
  }
}
