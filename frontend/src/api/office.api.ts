import type { Office, CreateOfficePayload } from "@/types";
import { BASE_URL, handleResponse } from "./http";

{
  /* GET ALL */
}
export async function getAllOffices(): Promise<Office[]> {
  const res = await fetch(`${BASE_URL}/branches`, {
    cache: "no-store",
  });
  return handleResponse(res);
}

{
  /* GET BY ID */
}
export async function getOfficesByFranchise(
  franchiseId: number
): Promise<Office[]> {
  const res = await fetch(`${BASE_URL}/franchises/${franchiseId}/branches`, {
    cache: "no-store",
  });
  return handleResponse(res);
}

{
  /* POST */
}
export async function createOffice(
  payload: CreateOfficePayload
): Promise<Office> {
  const res = await fetch(`${BASE_URL}/branches`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

{
  /* PUT*/
}
export async function updateOffice(
  id: number,
  payload: CreateOfficePayload
): Promise<Office> {
  const res = await fetch(`${BASE_URL}/branches/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

{
  /* Delete */
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
