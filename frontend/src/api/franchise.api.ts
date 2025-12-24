import type { Franchise, CreateFranchisePayload } from "@/types";
import { BASE_URL, handleResponse } from "./http";

{
  /* GET */
}
export async function getFranchises(): Promise<Franchise[]> {
  const res = await fetch(`${BASE_URL}/franchises`, {
    cache: "no-store",
  });
  return handleResponse(res);
}

{
  /* POST */
}
export async function createFranchise(
  payload: CreateFranchisePayload
): Promise<Franchise> {
  const res = await fetch(`${BASE_URL}/franchises`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

{
  /* Put */
}
export async function updateFranchise(
  id: number,
  payload: CreateFranchisePayload
): Promise<Franchise> {
  const res = await fetch(`${BASE_URL}/franchises/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

{
  /* Delete */
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
